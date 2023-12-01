import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    cargo: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    pswd: {
        type: String,
        require: true,
        min: 5,
    }
},{
    timestamps: true
})

const Usuario = mongoose.model("Usuario", UsuarioSchema)

export default Usuario;