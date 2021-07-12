// Importaciones
const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const { 
    obtenerNivel, 
    crearNivel, 
    obtenerNivelbyID, 
    editarNivel, 
    eliminarNivel 
} = require("../controllers/nivel.controller");

// Middlewares
const { 
    validarCampos,
    validarJWT,
    validarROL 
} = require('../middlewares/index.middlewares');

// Helpers
const { existeNivelID } = require('../helpers/db-validators.helper');

const router = Router();

/** OBTENER NIVEL */
router.get('/', obtenerNivel);

/** OBTENER NIVEL BY ID */
router.get('/:nivelID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('nivelID', 'El Nivel ID no es un ID valido').isMongoId(),
    check('nivelID', 'El Nivel ID no es un ID valido de Base de Datos').custom(existeNivelID),
],obtenerNivelbyID)

/** CREAR NIVEL */
router.post('/', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('prioridad', 'El nivel de prioridad es obligatorio').not().isEmpty(),
    validarCampos
],crearNivel);

/** EDITAR NIVEL */
router.put('/:nivelID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('nivelID', 'El Nivel ID no es un ID valido').isMongoId(),
    check('nivelID', 'El Nivel ID no es un ID valido de Base de Datos').custom(existeNivelID),
    validarCampos
], editarNivel);

/** ELIMINAR NIVEL */
router.delete('/:nivelID', [
    validarJWT,
    validarROL('ADMIN_ROL'),
    check('nivelID', 'El Nivel ID no es un ID valido').isMongoId(),
    check('nivelID', 'El Nivel ID no es un ID valido de Base de Datos').custom(existeNivelID),
    validarCampos
], eliminarNivel);

module.exports = router;

