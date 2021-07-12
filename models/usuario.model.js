// Importaciones
const {model, Schema} = require('mongoose');

const UsuarioSchema = Schema({
    celular: {
        type: Number,
        required: [true, 'El celular es obligatorio'],
        unique: [true, 'El registro es unico']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'El rol ID es obligatorio']
    },
    ciudad: {
        type: Schema.Types.ObjectId,
        ref: 'Ciudade',
        required: [true, 'La ciudad ID es obligatoria']
    },
    departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        required: [true, 'El departamento ID es obligatorio']
    }
}, {
    timestamps: true
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, _id, password, estado, ...usuario} = this.toObject();
    usuario.usuarioID = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema)