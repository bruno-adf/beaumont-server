import Projeto from '../models/Projeto.js'

export const updateDadosCliente = async (req, res) => {
    const { data, id, userId } = req.body
    
    console.log({data: data, userId: userId, id: id})

    const timestamp = {
        prev_status: 'Alterou',
        new_status: 'Dados do cliente',
        data: Date.now(),
        responsavel: userId
    }
    try {
        const projeto = await Projeto.findByIdAndUpdate(id,
            { $set: { dadosCliente: data }, $push: { timeline: timestamp }},
            { new: true }
        )
        res.status(200).send(projeto)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}