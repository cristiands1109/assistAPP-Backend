// Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { 
    obtenerDepartamento, 
    crearDepartamento, 
    obtenerDepartamentobyID, 
    editarDepartamento, 
    eliminarDepartemento 
} = require('../controllers/departamento.controller');

// Middlewares
const { 
    validarCampos ,
    validarJWT,
    validarROL
} = require('../middlewares/index.middlewares');

// Helpers
const { existeDepartamentoID } = require('../helpers/db-validators.helper');


const router = Router();

/** OBTENER DEPARTAMENTO */
router.get('/', obtenerDepartamento);

/** OBTENER DEPARTAMENTO POR ID */
router.get('/:departamentoID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('departamentoID', 'El Departamento ID no es un ID valido').isMongoId(),
    check('departamentoID', 'El Departamento ID no es un ID valido de Base de Datos').custom(existeDepartamentoID),
    validarCampos
], obtenerDepartamentobyID);

/** CREAR DEPARTAMENTO */
router.post('/', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('descripcion', 'La descipcion es obligatoria').not().isEmpty(),
    validarCampos
], crearDepartamento);

/** EDITAR DEPARTAMENTO */
router.put('/:departamentoID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('departamentoID', 'El Departamento ID no es un ID valido').isMongoId(),
    check('departamentoID', 'El Departamento ID no es un ID valido de Base de Datos').custom(existeDepartamentoID),
    validarCampos
], editarDepartamento)

/** ELIMINAR DEPARTAMENTO */
router.delete('/:departamentoID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('departamentoID', 'El Departamento ID no es un ID valido').isMongoId(),
    check('departamentoID', 'El Departamento ID no es un ID valido de Base de Datos').custom(existeDepartamentoID),
    validarCampos
], eliminarDepartemento)


module.exports = router;