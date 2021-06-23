import express, { Application as ExpressApp } from "express";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import morgan from "morgan";

import "dotenv/config";

import { controllers } from "./controllers";
import { swaggerJSON } from "../documentation/swagger";

const app: ExpressApp = express();

const middlewares = [
  morgan("combined"), // adds logger to the API
  cors({ origin: "http://localhost:3000", credentials: true }), // support cors
  express.json(), // accepts JSON as request.body
];

middlewares.forEach((m) => app.use(m));
app.use("/docs", serve, setup(swaggerJSON)); // host documentation on /docs endpoint
app.use("/", controllers); // add controllers routes

// SanitizeApis.getInstance();
export { app };
