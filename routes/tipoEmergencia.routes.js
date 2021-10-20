// Importaciones 
const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerTipoEmergencia, crearTipoEmergencia, obtenerTipoEmergenciabyID, editarTipoEmergencia, eliminarTipoEmergencia, obtenerTipoEmergenciabyDescripcion } = require('../controllers/tipoEmergencia.controller');
const { existeTipoEmergenciaID } = require('../helpers/db-validators.helper');

// Middlewares 
const { validarCampos, validarROL, validarJWT } = require('../middlewares/index.middlewares');



const router = Router();

/** OBTENER EMERGENCIAS */
router.get('/', obtenerTipoEmergencia);

/** OBTENER TIPO EMERGENCIA BY ID */
router.get('/:tipoEmergenciaID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('tipoEmergenciaID', 'El Tipo Emergencia ID no es un ID valido').isMongoId(),
    check('tipoEmergenciaID', 'El Tipo Emergencia ID no es un ID valido de Base de Datos').custom(existeTipoEmergenciaID),
    // check('descripcion', 'La descipcion es obligatoria').not().isEmpty(),
    validarCampos
], obtenerTipoEmergenciabyID)

/** OBTENER TIPO EMERGENCIA BY DESCRIPCION */
router.get('/descripcion/:descripcion', [
    validarJWT,
    validarROL('ADMIN_ROL', 'USER_ROL'),
    check('descripcion', 'La decripcion no debe ser vacio').not().isEmpty(),
    validarCampos
], obtenerTipoEmergenciabyDescripcion)

/** CREAR TIPO DE EMERGENCIA */
router.post('/', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('descripcion', 'La descipcion es obligatoria').not().isEmpty(),
    validarCampos
], crearTipoEmergencia);

/** EDITAR TIPO DE EMERGENCIA */
router.put('/:tipoEmergenciaID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('tipoEmergenciaID', 'El  Tipo Emergencia ID no es un ID valido').isMongoId(),
    check('tipoEmergenciaID', 'El  Tipo Emergencia ID no es un ID valido de Base de Datos').custom(existeTipoEmergenciaID),
    // check('descripcion', 'La descipcion es obligatoria').not().isEmpty(),
    validarCampos
],editarTipoEmergencia);


/** DAR DE BAJA TIPO EMERGENCIA */
router.delete('/:tipoEmergenciaID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('tipoEmergenciaID', 'El Tipo Emergencia ID no es un ID valido').isMongoId(),
    check('tipoEmergenciaID', 'El Tipo Emergencia ID no es un ID valido de Base de Datos').custom(existeTipoEmergenciaID),
    validarCampos
], eliminarTipoEmergencia)






module.exports = router;
