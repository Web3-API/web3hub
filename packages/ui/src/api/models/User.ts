import { createConnection } from "../db";
import { UserData } from "./types";

type GhRequest = {
  redirectUrl: string;
  accessToken: string;
  checkGhAuth: () => boolean;
};

declare global {
  namespace Express {
    export interface Request extends GhRequest {}
    export interface User extends UserData {}
  }
}

export enum AddressesTypes {
  ETHEREUM = 1,
}

export class User {
  public static async findOrCreateByGithub({
    username,
    githubId,
  }: Pick<UserData, "username" | "githubId">): Promise<Partial<UserData>> {
    const connection = await createConnection();
    try {
      const user = await connection.oneOrNone(
        "INSERT INTO users (username, github_id) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING RETURNING *",
        [username, githubId]
      );
      if (user) return user;
      const data = await connection.one(
        "SELECT users.id, addresses.address, users.username FROM addresses RIGHT JOIN users ON addresses.fk_user_id = users.id WHERE users.github_id = $1",
        [githubId]
      );
      return data;
    } catch (error) {
      console.log(
        "Error on method: User.findOrCreateByGithub() -> ",
        error.message
      );
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async findOrCreateByAddress({
    address,
    authType = AddressesTypes.ETHEREUM,
  }: Pick<UserData, "address" | "authType">): Promise<Partial<UserData>> {
    const connection = await createConnection();
    // @TODO: Make address type dynamic
    try {
      const user = await connection.oneOrNone(
        "SELECT users.id, addresses.address, users.username, users.github_token FROM addresses INNER JOIN users ON addresses.fk_user_id = users.id WHERE address = $1",
        [address]
      );
      if (user) return user;
      const createUserAndInsertAddress = async (tx) => {
        const user = await tx.one(
          "INSERT INTO users DEFAULT VALUES RETURNING id"
        );
        await tx.none(
          "INSERT INTO addresses (address, fk_user_id, fk_address_type_id) VALUES ($1, $2, $3)",
          [address, user.id, authType]
        );
      };

      await connection.tx(createUserAndInsertAddress);
      return {
        address,
        id: user.id,
      };
    } catch (error) {
      console.log(
        "Error on method: User.findOrCreateByAddress() -> ",
        error.message
      );
      throw new Error(error);
    } finally {
      connection.done();
    }
  }
}
