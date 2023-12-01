import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { updateCustos } from "../controllers/custos.js";

const router = Router()

router.post('/update', verifyToken, updateCustos)

export default router