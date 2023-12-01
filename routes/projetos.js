import { verifyToken } from "../middleware/auth.js";
import { getProjetos, criarProjeto, excluirProjeto, updateProjeto, getProjeto } from "../controllers/projetos.js";
import { Router } from "express"

const router = Router()

router.get('/getprojetos', verifyToken, getProjetos)
router.get('/get/:id', verifyToken, getProjeto)
router.post('/new', verifyToken, criarProjeto)
router.patch('/update', verifyToken, updateProjeto)
router.post('/delete', verifyToken, excluirProjeto)

export default router