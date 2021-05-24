import express, { Application as ExpressApp } from "express";
import session from "express-session";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import morgan from "morgan";
import redis from "redis";
import connectRedis from "connect-redis";

import "dotenv/config";

import { controllers } from "./controllers";
import { swaggerJSON } from "../documentation/swagger";

const app: ExpressApp = express();
const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const middlewares = [
  morgan("combined"), // adds logger to the API
  cors({ origin: "http://localhost:3000", credentials: true }), // support cors
  session({
    name: "web3hub",
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }), // supports session cache on server side
  express.json(), // accepts JSON as request.body
];

middlewares.forEach((m) => app.use(m));
app.use("/docs", serve, setup(swaggerJSON)); // host documentation on /docs endpoint
app.use("/", controllers); // add controllers routes

// SanitizeApis.getInstance();
export { app };
