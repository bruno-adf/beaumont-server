import Projeto from '../schemas/Projeto.js'

export const updateCustos = async (req, res) => {
    const { data, id, userId } = req.body

    const timestamp = {
        prev_status: 'Alterou',
        new_status: 'Custos',
        data: Date.now(),
        responsavel: userId
    }
    try {
        const projeto = await Projeto.findByIdAndUpdate(id,
            { $set: { custos: data }, $push: { timeline: timestamp }},
            { new: true }
        )
        res.status(200).send(projeto)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}