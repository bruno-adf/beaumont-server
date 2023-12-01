import mongoose, { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid'

export const ProjetoSchema = new mongoose.Schema({
    dadosCliente: {
        nome: {
            type: String,
            default: "Novo projeto"
        },
        celular: {
            type: Number,
            default: null
        },
        cpf: {
            type: Number,
            default: null
        },
        email: {
            type: String,
            default: ""
        },
        endereco: {
            type: String,
            default: ""
        }
    },
    dadosProjeto: {
        status: {
            type: Number,
            default: 1
        },
        inicio: {
            type: Date,
            default: null
        },
        entrega: {
            type: Date,
            default: null
        },
        ambientes: {
            type: [String],
            default: []
        },
        lote: {
            type: Number,
            default: null
        },
        projetistas: {
            type: [String],
            default: []
        },
        valor_total: {
            type:  Number,
            default: null
        }
    },
    custos: {
        projetistas: {
            type:  Number,
            default: null
        },
        montador: {
            type:  Number,
            default: null
        },
        frete: {
            type:  Number,
            default: null
        },
        fabrica: {
            type:  Number,
            default: null
        },
        impostos: {
            type:  Number,
            default: null
        },
        insumos: {
            type:  Number,
            default: null
        },
        total: {
            type:  Number,
            default: null
        }
    },
    timeline: [{
        _id: {
            type: String,
            required: true
        },
        prev_status: {
            type:String,
            default: ""
        },
        new_status: {
            type: String,
            default: ""
        },
        data: {
            type: Date,
            default: null
        },
        responsavel: {
            type: Schema.Types.ObjectId,
            ref: 'UsuarioSchema',
            required: true
        }
    }],
    insumos: [{
        _id: {
            type: String,
            required: true
        },
        check: {
            type: Boolean,
            default: false
        },
        nome: {
            type: String,
            default: ""
        },
        fornecedor: {
            type: String,
            default: ""
        },
        quantidade: {
            type: String,
            default: ""
        },
        tamanho: {
            type: String,
            default: ""
        },
        valor: {
            type: Number,
            default: null
        },
        cor: {
            type: String,
            default: ""
        },
        info: {
            type: String,
            default: ""
        }
    }]
})

const Projeto = mongoose.model('projeto', ProjetoSchema)
export default Projeto