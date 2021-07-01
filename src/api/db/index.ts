import pgp from "pg-promise";
import pg from "pg-promise/typescript/pg-subset"

const DATABASE_URL = "postgres://qlvnktjkyihemu:5fc213811f2851cbe463540aac25d039e0121dfca47cfc72a97a3059f244332c@ec2-54-90-211-192.compute-1.amazonaws.com:5432/d7htnshjgn90i3";

export class Connection {
  private static _instance: pgp.IDatabase<{}, pg.IClient>

  private constructor () { }

  static getInstance = () => {
    if(!Connection._instance) {
      Connection._instance = pgp()({
        connectionString: DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      })
    }

    return Connection._instance
  }
}
