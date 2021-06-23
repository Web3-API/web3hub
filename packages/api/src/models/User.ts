import db from "../services/db";
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
  public static async findOrCreate(did: string) {
    const connection = await db.connect();
    try {
      await connection.oneOrNone(
        "INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING RETURNING *",
        [did]
      );
    } catch (error) {
      console.log("Error on method: User.findOrCreate -> ", error.message);
      throw new Error(error);
    }
  }
}
