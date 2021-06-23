import { Connection } from "../db";

export class Organization {
  public static async get(orgId: number) {
    const connection = await Connection.getInstance();
    try {
      const organization = await connection.oneOrNone("");
      return organization;
    } catch (e) {
      console.log("Error on method: Organization.get() -> ", e.message);
      throw new Error(e);
    } finally {
      connection.done();
    }
  }
}
