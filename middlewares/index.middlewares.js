const validarCampos = require('../middlewares/validarCampos.middlewares');
const validarJWT    = require('./validar-jwt');
const validarRol    = require('./validar-rol');
const validarSubir  = require('./validar-archivo');



module.exports = {
 ...validarCampos,
 ...validarJWT,
 ...validarRol,
 ...validarSubir
}