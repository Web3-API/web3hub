import pgp from "pg-promise";

const DATABASE_URL = process.env.DATABASE_URL;

export const createConnection = () => pgp()(DATABASE_URL).connect();
