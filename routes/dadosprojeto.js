import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { updateDadosProjeto, updateStatus } from "../controllers/dadosprojeto.js";

const router = Router()

router.patch('/update', verifyToken, updateDadosProjeto)
router.patch('/updatestatus', verifyToken, updateStatus)

export default router