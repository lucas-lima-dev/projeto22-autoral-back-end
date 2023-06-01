import { Router } from "express";

const router = Router();

// router.use()
router.get('/health', (_req, res) => res.send('OK!'))

export default router;