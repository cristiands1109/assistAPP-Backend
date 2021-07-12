const { Schema, model } = require('mongoose');

const DepartamentoSchema = Schema({
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

DepartamentoSchema.methods.toJSON = function() {
    const {__v, estado, _id, ...departamento} = this.toObject();
    departamento.departamentoID = _id;
    return departamento;
}


module.exports = model('Departamento', DepartamentoSchema);