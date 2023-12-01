import Projeto from "../models/Projeto.js"
import { v4 as uuidv4 } from 'uuid'

export const updateInsumo = async (req, res) => {
    const { data, insumoId, id, userId } = req.body

    const timestamp = {
        prev_status: 'Alterou insumo',
        new_status: data.nome,
        data: Date.now(),
        responsavel: userId
    }
    try {
        const projeto = await Projeto.findOneAndUpdate(
            { _id: id, 'insumos._id': insumoId },
            { $set: { 'insumos.$': data }, $push: { timeline: timestamp }},
            { new: true }
        )
        res.status(200).send(projeto)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export const criarInsumo = async (req, res) => {
    const { data, id, userId } = req.body
    console.log(data)

    const timestamp = {
        _id: uuidv4(),
        prev_status: 'Adicionou insumo',
        new_status: data.nome,
        data: Date.now(),
        responsavel: userId
    }
    try {
        const projeto = await Projeto.findByIdAndUpdate(id,
            { $push: { insumos: {...data, _id: uuidv4() }, timeline: timestamp } },
            { new: true }
        )
        res.status(200).send(projeto)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export const deletarInsumo = async (req, res) => {
    const { userId, id, insumo } = req.body
    console.log({ userId: userId, id: id, insumo: insumo })

    const timestamp = {
        prev_status: 'Excluiu insumo',
        new_status: insumo.nome,
        data: Date.now(),
        responsavel: userId
    }

    try {
        const projeto = await Projeto.findByIdAndUpdate(id,
            { $pull: { insumos: { _id: insumo.id } }, $push: { timeline: timestamp } },
            { new: true }
        )
        res.status(200).send(projeto)
    } catch (error) {
        res.send(error)
    }
}

export const checkInsumo = async (req, res) => {
    const { check, id , insumoId } = req.body
    await Projeto.findByIdAndUpdate(id, {})
}