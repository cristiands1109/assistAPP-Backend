// Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { 
    obtenerUsuarios, 
    crearUsuario, 
    editarUsuario, 
    eliminarUsuario, 
    obtenerUsuariobyID 
} = require('../controllers/usuario.controller');

// Middlewares
const { 
    validarCampos,
    validarJWT,
    validarROL 
} = require('../middlewares/index.middlewares');

// Helpers 
const { 
    existeCiudadID, 
    existeDepartamentoID, 
    existeRolID, 
    duplicadoUSER, 
    existeUsuario, 
    validarEstadoRol, 
    validarEstadoDepartamento, 
    validarEstadoCiudad 
} = require('../helpers/db-validators.helper')


const router = Router();

/** OBTENER USUARIOS */
router.get('/', obtenerUsuarios);

/** OBTENER USUARIO BY ID */
router.get('/:celularID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('celularID', 'El celular es obligatorio').not().isEmpty(),
    check('celularID', 'El celular debe ser unico').custom(existeUsuario),
    validarCampos
], obtenerUsuariobyID);


/** CREAR USUARIO */
router.post('/', [
    // validarJWT,
    // validarROL('ADMIN_ROL', 'USER_ROL'),
    check('celular', 'El celular es obligatorio').not().isEmpty(),
    check('celular', 'El celular debe ser unico').custom(duplicadoUSER),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    // check('ciudad', 'El Ciudad ID no es un ID valido').isMongoId(),
    // check('ciudad', 'El Ciudad ID no es un ID valido de Base de Datos').custom(existeCiudadID),
    // check('ciudad', 'La Ciudad no existe en la Base de Datos').custom(validarEstadoCiudad),
    // check('departamento', 'El Departamento ID no es un ID valido').isMongoId(),
    // check('departamento', 'El Departamento ID no es un ID valido de Base de Datos').custom(existeDepartamentoID),
    // check('departamento', 'El Departamento no existe en la Base de Datos').custom(validarEstadoDepartamento),
    // check('rol', 'El Rol ID no es un ID valido').isMongoId(),
    // check('rol', 'El Rol ID no es un ID valido de Base de Datos').custom(existeRolID),
    // check('rol', 'El Rol no existe en la base de datos').custom(validarEstadoRol),
    validarCampos
], crearUsuario);

/** EDITAR USUARIO */
router.put('/:celularID', [
    validarJWT,
    validarROL('ADMIN_ROL', 'USER_ROL'),
    check('celularID', 'El celular es obligatorio').not().isEmpty(),
    check('celularID', 'El celular debe ser unico').custom(existeUsuario),
    validarCampos
], editarUsuario);

/** ELIMINAR USUARIO */
router.delete('/:celularID', [
    validarJWT,
    validarROL('ADMIN_ROL', 'USER_ROL'),
    check('celularID', 'El celular es obligatorio').not().isEmpty(),
    check('celularID', 'El celular debe ser unico').custom(existeUsuario),
    validarCampos
], eliminarUsuario);

module.exports = router;