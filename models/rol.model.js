// Importaciones
const {Schema, model} = require('mongoose')

const RolSchema = Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    }  
},{
    timestamps: true
});

RolSchema.methods.toJSON = function() {
    const {__v, estado, _id, ... rol} = this.toObject();
    rol.rolID = _id;
    return rol;
}

module.exports = model('Role', RolSchema)
