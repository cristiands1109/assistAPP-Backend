// Importaciones
const Router = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { existeUsuario } = require('../helpers/db-validators.helper');
const { validarCampos } = require('../middlewares/validarCampos.middlewares');

// creamos una nueva instacia de routes
const router = Router();

router.post('/', [
    check('celular', 'El celular es obligatorio').not().isEmpty(),
    check('celular', 'El celular no se encuentra en la base de datos').custom(existeUsuario),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);



module.exports = router;