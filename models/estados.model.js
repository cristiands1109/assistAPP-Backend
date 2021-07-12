const { Schema, model } = require('mongoose');


const EstadoSchema = Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

EstadoSchema.methods.toJSON = function() {
    const {__v, _id, estado, ...estados} = this.toObject();
    estados.estadosID = _id;
    return estados;
}

module.exports = model('Estado', EstadoSchema);