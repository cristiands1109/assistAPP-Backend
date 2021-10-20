// Importaciones
const { Schema, model } = require('mongoose');

const TipoEmergenciaSchema = Schema({
    descripcion: {
        type: String,
        require: [true, 'la descripcion es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

TipoEmergenciaSchema.methods.toJSON = function() {
    const {__v, estado, _id,...tipoEmergencia} = this.toObject();
    tipoEmergencia.tipoEmergenciaID = _id;
    return tipoEmergencia;
}

module.exports = model('TipoEmergencia', TipoEmergenciaSchema)