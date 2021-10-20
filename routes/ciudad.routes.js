// Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { 
    obtenerCiudades, 
    crearCiudad, 
    editarCiudad, 
    eliminarCiudad, 
    obtenerCiudadbyID, 
    obtenerCiudadesbyDepartamento
} = require('../controllers/ciudad.controller');

// Middlewares
const { 
    validarCampos,
    validarROL,
    validarJWT 
} = require('../middlewares/index.middlewares');

// Helpers
const { 
    existeDepartamentoID, 
    existeCiudadID, 
    validarEstadoDepartamento 
} = require('../helpers/db-validators.helper')


const router = Router();


/** OBTENER CIUDADES */
router.get('/', obtenerCiudades);

/** OBTENER CIUDAD POR ID */
router.get('/:ciudadID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('ciudadID', 'El Ciudad ID no es un ID valido').isMongoId(),
    check('ciudadID', 'El Ciudad ID no es un ID valido de Base de Datos').custom(existeCiudadID),
    validarCampos
], obtenerCiudadbyID);

router.get('/consulta/:departamentoID', [
    check('departamentoID', 'El Ciudad ID no es un ID valido').isMongoId(),
    check('departamentoID', 'El Ciudad ID no es un ID valido de Base de Datos').custom(existeDepartamentoID),
    validarCampos
], obtenerCiudadesbyDepartamento)

/** CREAR CIUDAD */
router.post('/', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('descripcion', 'La descipcion es obligatoria').not().isEmpty(),
    check('departamento', 'El departamento es obligatorio').not().isEmpty(),
    check('departamento', 'El Departamento ID no es un ID valido').isMongoId(),
    check('departamento', 'El Departamento ID no es un ID valido de Base de Datos').custom(existeDepartamentoID),
    check('departamento', 'El Departamento no existe en la Base de Datos').custom(validarEstadoDepartamento),
    validarCampos
], crearCiudad);

/** EDITAR CIUDAD */
router.put('/:ciudadID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('ciudadID', 'El Ciudad ID no es un ID valido').isMongoId(),
    check('ciudadID', 'El Ciudad ID no es un ID valido de Base de Datos').custom(existeCiudadID),
    validarCampos
], editarCiudad);

/** ELIMINAR CIUDAD */
router.delete('/:ciudadID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('ciudadID', 'El Ciudad ID no es un ID valido').isMongoId(),
    check('ciudadID', 'El Ciudad ID no es un ID valido de Base de Datos').custom(existeCiudadID),
    validarCampos
], eliminarCiudad);



module.exports = router;