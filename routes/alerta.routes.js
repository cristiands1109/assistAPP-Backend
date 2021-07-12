// Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { obtenerAlerta, crearAlerta, editarAlerta, eliminarAlerta, obtenerAlertabyID } = require('../controllers/alerta.controller');

// Helpers
const { existeEmergenciaID, existeEstadoID, existeOperadorID, existeAlertaID } = require('../helpers/db-validators.helper');
const { validarCampos, validarJWT, validarROL } = require('../middlewares/index.middlewares');


const router = Router();

/** OBTENER ALERTA */
router.get('/', obtenerAlerta);

/** OBTENER ALERTA BY ID */
router.get('/:alertaID', [
    validarJWT,
    validarROL('ADMIN_ROL', 'DEP_ROL'),
    check('alertaID', 'La Alerta ID no es un ID valido').isMongoId(),
    check('alertaID', 'La Alerta ID no es un ID valido de Base de Datos').custom(existeAlertaID),
], obtenerAlertabyID);

/** CREAR ALERTA */
router.post('/', [
    validarJWT,
    validarROL('ADMIN_ROL', 'DEP_ROL'),
    check('estados', 'El Estado ID no es un ID valido').isMongoId(),
    check('estados', 'El Estado ID no es un ID valido de Base de Datos').custom(existeEstadoID),
    check('emergencia', 'La Emergencia ID es obligatorio').not().isEmpty(),
    check('emergencia', 'La Emergencia ID no existe en la base de datos').custom(existeEmergenciaID),
    check('operador', 'El celular es obligatorio').not().isEmpty(),
    check('operador', 'El celular debe ser unico').custom(existeOperadorID),
    validarCampos
], crearAlerta);

/** EDITAR ALERTA */
router.put('/:alertaID', [
    validarJWT,
    validarROL('ADMIN_ROL', 'DEP_ROL'),
    check('alertaID', 'La Alerta ID no es un ID valido').isMongoId(),
    check('alertaID', 'La Alerta ID no es un ID valido de Base de Datos').custom(existeAlertaID),
    validarCampos
], editarAlerta);

/** ELIMINAR ALERTA */
router.delete('/:alertaID', [
    validarJWT,
    validarROL('ADMIN_ROL', 'DEP_ROL'),
    check('alertaID', 'La Alerta ID no es un ID valido').isMongoId(),
    check('alertaID', 'La Alerta ID no es un ID valido de Base de Datos').custom(existeAlertaID),
    validarCampos
], eliminarAlerta);



module.exports = router;