const { Router } = require('express');
const { check } = require('express-validator');
const { actualizarImagenCloudinary } = require('../controllers/upload.controller');

const { existeEmergenciaID } = require('../helpers/db-validators.helper');

const { validarSubirArchivo, validarCampos, validarROL, validarJWT } = require('../middlewares/index.middlewares')

const router = Router();

router.post('/emergencia/:emergenciaID', [
    validarJWT,
    validarROL('ADMIN_ROL', 'DEP_ROL'),
    validarSubirArchivo,
    check('emergenciaID', 'La Emergencia ID es obligatorio').isMongoId(),
    check('emergenciaID', 'La Emergencia ID no existe en la base de datos').custom(existeEmergenciaID),
    validarCampos
], actualizarImagenCloudinary)



module.exports = router;