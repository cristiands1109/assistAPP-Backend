const { Schema, model } = require('mongoose');

const NivelSchema = Schema({
    prioridad: {
        type: Number,
        required: [true, 'La prioridad es obligatoria']
    },
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
});

NivelSchema.methods.toJSON = function () {
    const { __v, estado, _id, ...nivel} = this.toObject();
    nivel.nivelID = _id;
    return nivel;
}

module.exports = model('Nivele', NivelSchema);