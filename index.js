import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import authRoutes from './routes/auth.js'
import projetosRoutes from './routes/projetos.js'
import custosRoutes from './routes/custos.js'
import insumosRoutes from './routes/insumos.js'
import dadosclienteRoutes from './routes/dadoscliente.js'
import dadosprojetoRoutes from './routes/dadosprojeto.js'

dotenv.config();
const app = express();

app.use(cors())
app.use(helmet())
app.use(morgan('common'))
app.use(bodyParser.json())

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => console.log(`Porta: ${PORT}`))
}).catch((error) => {
    console.log(error)
})

app.use('/auth', authRoutes)
app.use('/projetos', projetosRoutes)
app.use('/custos', custosRoutes)
app.use('/insumos', insumosRoutes)
app.use('/dadosprojeto', dadosprojetoRoutes)
app.use('/dadoscliente', dadosclienteRoutes)