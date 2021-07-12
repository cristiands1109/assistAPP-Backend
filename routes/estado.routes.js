// Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { 
    obtenerEstado, 
    crearEstado, 
    obtenerEstadobyID, 
    editarEstado, 
    eliminarEstado 
} = require('../controllers/estado.controller');

// Helpers
const { existeEstadoID } = require('../helpers/db-validators.helper');

// Middlewares
const { 
    validarCampos,
    validarJWT,
    validarROL
} = require('../middlewares/index.middlewares');


const router = Router();

/** OBTENER ESTADO */
router.get('/', obtenerEstado);

/** OBTENER ESTADO BY ID */
router.get('/:estadoID', [
    validarJWT,
    validarROL('ADMIN_ROL', 'DEP_ROL'),
    check('estadoID', 'El Estado ID no es un ID valido').isMongoId(),
    check('estadoID', 'El Estado ID no es un ID valido de Base de Datos').custom(existeEstadoID),
], obtenerEstadobyID)

/** CREAR ESTADO */
router.post('/', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], crearEstado);

/** EDITAR ESTADO */
router.put('/:estadoID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('estadoID', 'El Estado ID no es un ID valido').isMongoId(),
    check('estadoID', 'El Estado ID no es un ID valido de Base de Datos').custom(existeEstadoID),
], editarEstado)

/** ELIMINAR ESTADO */
router.delete('/:estadoID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('estadoID', 'El Estado ID no es un ID valido').isMongoId(),
    check('estadoID', 'El Estado ID no es un ID valido de Base de Datos').custom(existeEstadoID),
    validarCampos
], eliminarEstado);


module.exports = router;