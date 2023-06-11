import { Router } from "express";
import userRouter from "./user-router";
import homeRouter from "./home-router";
import { authenticateToken } from "@/middlewares/authentication-middleware";

const router = Router();

// router.use()
router.get("/health", (_req, res) => res.send('OK!'))
router.use("/users",userRouter)
router.all('/*',authenticateToken)
router.use("/home", homeRouter)


export default router;