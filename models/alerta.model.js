const { Schema, model } = require('mongoose');

const AlertaSchema = Schema({
    estado: {
        type: Boolean,
        default: true
    },
    operador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El ID del Operador es obligatorio'],
    },
    emergencia: {
        type: Schema.Types.ObjectId,
        ref: 'Emergencia',
        required: [true, 'El ID Emergencia es obligatorio']
    },
    // estados: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Estado',
    //     required: [true, 'El ID Estado es obligatorio']
    // }
}, {
    timestamps: true
})

AlertaSchema.methods.toJSON = function () {
    const { __v, _id, ...alerta} = this.toObject();
    alerta.alertaID = _id;
    return alerta
}


module.exports = model('Alerta', AlertaSchema);