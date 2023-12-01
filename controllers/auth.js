import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

export const register = async (req, res) => {
    try{
        const {
            nome,
            cargo,
            email,
            pswd
        } = req.body

        const salt = await bcrypt.genSalt()
        const pswdHash = await bcrypt.hash(pswd, salt)

        const newUser = new Usuario({
            nome,
            cargo,
            email,
            pswd: pswdHash,
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

    }catch(e){
        console.log(e.message)
    }
}

export const login = async (req, res) => {
    try {
        const { email, pswd } = req.body
        const user = await Usuario.findOne({email: email})
        if(!user) return res.status(400).json('usuário não encontrado')

        const match = await bcrypt.compare(pswd, user.pswd)
        if(!match) return res.status(400).json('senha incorreta')

        const token = jwt.sign({id: user._id, nome: user.nome}, process.env.JWT_SECRET)
        delete user.pswd
        res.status(200).json({token, user})

    } catch (e) {
        console.log(e.message)
        res.status(500)
    }
}