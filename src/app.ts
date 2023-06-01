import "express-async-errors";
import express, { Express, json } from "express";
import cors from "cors";
import routes from "./routers";

import { loadEnv, connectDb, disconnectDB } from "@/config";

loadEnv();

const app = express();

app.use([json(), cors(),routes]);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
