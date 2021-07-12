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
    nivel: {
        type: Schema.Types.ObjectId,
        ref: 'Nivele',
        required: [true, 'El nivel ID es obligatorio']
    },
    denunciante: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El celular es obligatorio']
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
