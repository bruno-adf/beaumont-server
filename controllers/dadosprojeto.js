import Projeto from '../schemas/Projeto.js'

export const updateDadosProjeto = async (req, res) => {
    const { data, id, userId } = req.body

    const timestamp = {
        prev_status: 'Alterou',
        new_status: 'Dados do projeto',
        data: Date.now(),
        responsavel: userId
    }
    try {
        const projeto = await Projeto.findByIdAndUpdate(id,
            { $set: { dadosProjeto: data }, $push: { timeline: timestamp } },
            { new: true }
        )
        res.status(200).send(projeto)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export const updateStatus = async (req, res) => {
    const { userId, id, status } = req.body

    try {
        const projetoOld = await Projeto.findById(id)
        const timestamp = {
            prev_status: projetoOld.dadosProjeto.status,
            new_status: status,
            data: Date.now(),
            responsavel: userId
        }
        const projeto = await Projeto.findByIdAndUpdate(id, {
            $set: { 'dadosProjeto.status': status }, $push: { timeline: timestamp }
        }, { new: true })
        res.status(200).send(projeto)
    } catch (error) {
        res.status(500).send(error)
    }
}