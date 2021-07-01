import { Connection } from "../db";

export class Organization {
  public static async get(orgId: number) {
    const db = Connection.getInstance()
    const connection = await db.connect()
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
