const Alerta            = require('./alerta.model');
const Ciudad            = require('./ciudad.model');
const Departamento      = require('./departamento.model');
const Emergencia        = require('./emergencia.model');
const Estados           = require('./estados.model')
const Nivel             = require('./nivel.model')
const Rol               = require('./rol.model');
const TipoEmergencia    = require('./tipo_emergencia.model')
const Usuario           = require('./usuario.model');


module.exports = {
    Alerta,
    Ciudad,
    Departamento,
    Emergencia,
    Estados,
    Nivel,
    Rol,
    TipoEmergencia,
    Usuario
}