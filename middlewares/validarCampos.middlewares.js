// Importaciones
const { request, response } = require("express"); // para obtener el tipado
const { validationResult } = require("express-validator");


const validarCampos = (req = request, resp = response, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return resp.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}