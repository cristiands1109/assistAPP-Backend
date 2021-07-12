const { request, response } = require("express");
const { Rol } = require("../models/index.model");


const validarROL = (...roles) => {

    return async (req = request, resp = response, next) => {

        // verificamos que venga el usuario
        if(!req.usuario) {
            return resp.status(500).json({
                msg: 'Se quiere verificar estado sin estar autenticado'
            })
        }

        const rolID = req.usuario.rol;
        const {descripcion} = await Rol.findById(rolID);
        
        if(!roles.includes(descripcion)) {
            return resp.status(400).json({
                msg:`${descripcion}, no posee una de estas credenciales ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    validarROL
}