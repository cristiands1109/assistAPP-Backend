//Importaciones 
const { Schema, model } = require('mongoose');

const CiudadSchema = Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        required: [true, 'El ID departamento es obligatorio']
    }
},{
    timestamps: true
});

CiudadSchema.methods.toJSON = function() {
    const { __v, estado, _id, ...ciudad} = this.toObject();
    ciudad.ciudadID = _id;
    return ciudad;
}


module.exports = model('Ciudade', CiudadSchema);