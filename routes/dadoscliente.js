import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { updateDadosCliente } from "../controllers/dadoscliente.js";

const router = Router()

router.patch('/update', verifyToken, updateDadosCliente)

export default router