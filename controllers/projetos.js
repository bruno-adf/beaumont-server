import Projeto, { ProjetoSchema } from "../schemas/Projeto.js"
import { v4 as uuidv4 } from 'uuid'

export const getProjetos = async (req, res) => {
    try {
        const lista = await Projeto.find()
        res.status(200).json(lista)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}

export const getProjeto = async (req, res) => {
    const { id } = req.params
    try {
        const projeto = await Projeto.findById(id)
        res.status(200).json(projeto)
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
}

export const criarProjeto = async (req,res) => {

    const { userId } = req.body

    try {
        const projetoVazio = await Projeto.create({ProjetoSchema})
        projetoVazio.timeline = [{
                _id: uuidv4(),
                prev_status: 0,
                new_status: 1,
                data: Date.now(),
                responsavel: userId
        }]
        await projetoVazio.save()
        const projeto = await Projeto.findById(projetoVazio._id)
        res.status(200).json(projeto)
    } catch (error) {
        res.send(error.message)
    }
}

export const excluirProjeto = async (req, res) => {

    const { projectId } = req.body
    console.log('id do projeto: ' + projectId)

    try {
        await Projeto.findByIdAndDelete(projectId)
        res.status(200).json({'msg': 'excluido'})
    } catch (error) {
        res.send(error)
    }
}

export const updateProjeto = async (req, res) => {

    const { userId, data, id } = req.body

    try {
        const projetoOld = await Projeto.findById(id)
        if(projetoOld.dadosProjeto.status !== data.dadosProjeto.status){
            data.timeline = [
                ...data.timeline,
                {
                    responsavel: userId,
                    prev_status: projetoOld.dadosProjeto.status,
                    new_status: data.dadosProjeto.status,
                    data: Date.now()
                }
            ]
        }
        await Projeto.findByIdAndUpdate(id, data)
        const projeto = await Projeto.findById(id)
        res.status(200).json(projeto)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}