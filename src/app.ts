import "express-async-errors";
import express, { Express, json } from "express";
import cors from "cors";
import routes from "./routers";

import { loadEnv, connectDb, disconnectDB } from "@/config";
import { handleApplicationErrors } from "@/middlewares";
import userRouter from "./routers/user-router";

loadEnv();

const app = express();

app.use([json(), cors(),routes,handleApplicationErrors]);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
