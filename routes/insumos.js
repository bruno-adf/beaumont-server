import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { criarInsumo, deletarInsumo, updateInsumo, checkInsumo } from "../controllers/insumos.js";

const router = Router()

router.patch('/update', verifyToken, updateInsumo)
router.post('/new', verifyToken, criarInsumo)
router.delete('/delete', verifyToken, deletarInsumo)
router.post('/check', verifyToken, checkInsumo)

export default router