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
    existeEmergenciaID, 
    existeTipoEmergenciaID
} = require('../helpers/db-validators.helper');


const router = Router();

/** OBTENER EMERGENCIA */
router.get('/', obtenerEmergencia)

/** OBTENER EMERGENCIA BY ID */
router.get('/:emergenciaID', [
    validarJWT,
    validarROL('ADMIN_ROL', 'DEP_ROL', 'USER_ROL'),
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
    check('longitud', 'Ingrese la longitud'),
    check('latitud', 'Ingrese la latitud'),
    check('direccion', 'Ingrese la direccion'),
    check('img', 'Ingrese la direccion'),
    check('nivel', 'El Nivel ID no es un ID valido'),
    check('nivel', 'El Nivel ID no es un ID valido de Base de Datos'),
    check('estados', 'El Estado ID no es un ID valido'),
    check('estados', 'El Estado ID no es un ID valido de Base de Datos'),
    // check('nivel', 'El Nivel ID no es un ID valido').isMongoId(),
    // check('nivel', 'El Nivel ID no es un ID valido de Base de Datos').custom(existeNivelID),
    check('denunciante', 'El celular es obligatorio').not().isEmpty(),
    check('denunciante', 'El celular debe ser unico').custom(existeDenuncianteID),
    check('tipo_emergencia', 'El Tipo Emergencia ID no es un ID valido').isMongoId(),
    check('tipo_emergencia', 'El Tipo Emergencia ID no es un ID valido de Base de Datos').custom(existeTipoEmergenciaID),
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