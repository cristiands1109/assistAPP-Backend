const { Schema, model } = require('mongoose');


const EmergenciaSchema = Schema({
    relatoria: {
        type: String
    },
    direccion: {
        type: String
    },
    longitud: {
        type: String
    },
    latitud: {
        type: String
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    emitido: {
        type: Boolean,
        default: false
    },
    nivel: {
        type: Schema.Types.ObjectId,
        ref: 'Nivele',
        // required: [true, 'El nivel ID es obligatorio']
    },
    estados: {
        type: Schema.Types.ObjectId,
        ref: 'Estado',
        // required: [true, 'El ID Estado es obligatorio']
    },
    denunciante: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El celular es obligatorio']
    },
    tipo_emergencia: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEmergencia',
        required: [true, 'El tipo de emergencia es obligatorio']
    }
}, {
    timestamps: true
});


EmergenciaSchema.methods.toJSON = function () {
    const {__v, _id, estado, ...emergencia} = this.toObject();
    emergencia.emergenciaID = _id;
    return emergencia;
}

module.exports = model('Emergencia', EmergenciaSchema);
