import { Router } from "express";
import userRouter from "./user-router";

const router = Router();

// router.use()
router.get("/health", (_req, res) => res.send('OK!'))
router.use("/users",userRouter)


export default router;