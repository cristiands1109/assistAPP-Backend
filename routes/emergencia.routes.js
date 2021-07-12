// Importaciones
const { Router } =require('express');
const { check } = require('express-validator');

// Middlewares
const { 
    validarCampos,
    validarJWT,
    validarROL 
} = require('../middlewares/index.middlewares');

// Controllers
const { 
    obtenerEmergencia, 
    crearEmergencia, 
    editarEmergencia, 
    eliminarEmergencia, 
    obtenerEmergenciabyID 
} = require('../controllers/emergencia.controller');

// Helpers
const { 
    existeNivelID, 
    existeDenuncianteID, 
    existeEmergenciaID 
} = require('../helpers/db-validators.helper');


const router = Router();

/** OBTENER EMERGENCIA */
router.get('/', obtenerEmergencia)

/** OBTENER EMERGENCIA BY ID */
router.get('/:emergenciaID', [
    validarJWT,
    validarROL('ADMIN_ROL', 'DEP_ROL'),
    check('emergenciaID', 'La Emergencia ID es obligatorio').not().isEmpty(),
    check('emergenciaID', 'La Emergencia ID no existe en la base de datos').custom(existeEmergenciaID),
    validarCampos
], obtenerEmergenciabyID);


/** CREAR EMERGENCIA */
router.post('/', [
    validarJWT,
    validarROL('ADMIN_ROL', 'DEP_ROL', 'USER_ROL'),
    check('relatoria', 'Ingrese la relatoria'),
    check('direccion', 'Ingrese la direccion'),
    check('longitud', 'Ingrese la longitud').not().isEmpty(),
    check('latitud', 'Ingrese la latitud').not().isEmpty(),
    check('direccion', 'Ingrese la direccion'),
    check('img'),
    check('nivel', 'El Nivel ID no es un ID valido').isMongoId(),
    check('nivel', 'El Nivel ID no es un ID valido de Base de Datos').custom(existeNivelID),
    check('denunciante', 'El celular es obligatorio').not().isEmpty(),
    check('denunciante', 'El celular debe ser unico').custom(existeDenuncianteID),
    validarCampos
], crearEmergencia)

/** EDITAR EMERGENCIA */
router.put('/:emergenciaID', [
    validarJWT,
    validarROL('ADMIN_ROL', 'DEP_ROL'),
    check('emergenciaID', 'La Emergencia ID es obligatorio').not().isEmpty(),
    check('emergenciaID', 'La Emergencia ID no existe en la base de datos').custom(existeEmergenciaID),
    validarCampos
], editarEmergencia);

/** ELIMINAR USUARIO */
router.delete('/:emergenciaID', [
    validarJWT,
    validarROL('ADMIN_ROL', 'DEP_ROL'),
    check('emergenciaID', 'La Emergencia ID es obligatorio').not().isEmpty(),
    check('emergenciaID', 'La Emergencia ID no existe en la base de datos').custom(existeEmergenciaID),
    validarCampos
], eliminarEmergencia);


module.exports = router;