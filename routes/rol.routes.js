// Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validarCampos, validarROL } = require('../middlewares/index.middlewares')

// Helpers
const { existeRolID } = require('../helpers/db-validators.helper');

// Controllers
const { 
    obtenerRol, 
    crearRol, 
    editarROL, 
    eliminarRol, 
    obtenerRolbyID 
} = require('../controllers/rol.controller');

const { validarJWT } = require('../middlewares/index.middlewares');


const router = Router();

/** OBTENER ROLES */
router.get('/', obtenerRol);

/** OBTENER ROL BY ID */
router.get('/:rolID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('rolID', 'El Rol ID no es un ID valido').isMongoId(),
    check('rolID', 'El Rol ID no es un ID valido de Base de Datos').custom(existeRolID),
    // check('descripcion', 'La descipcion es obligatoria').not().isEmpty(),
    validarCampos
], obtenerRolbyID)

/** CREAR ROLES */
router.post('/', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('descripcion', 'La descipcion es obligatoria').not().isEmpty(),
    validarCampos
], crearRol);

/** EDITAR ROLES */
router.put('/:rolID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('rolID', 'El Rol ID no es un ID valido').isMongoId(),
    check('rolID', 'El Rol ID no es un ID valido de Base de Datos').custom(existeRolID),
    // check('descripcion', 'La descipcion es obligatoria').not().isEmpty(),
    validarCampos
], editarROL)

/** DAR DE BAJA ROL */
router.delete('/:rolID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('rolID', 'El Rol ID no es un ID valido').isMongoId(),
    check('rolID', 'El Rol ID no es un ID valido de Base de Datos').custom(existeRolID),
    validarCampos
], eliminarRol)



module.exports = router;


