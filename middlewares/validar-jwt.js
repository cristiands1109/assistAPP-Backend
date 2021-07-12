const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const { Usuario } = require("../models/index.model");

const validarJWT = async (req = request, resp = response, next) => {

    const token = req.header('x-token');
    if(!token) {
        return resp.status(401).json({
            msg: 'No existe token en la peticion, debe autenticarse'
        });
    }

    try {

        // desestructuramos para verificar el token
        const {userID} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // buscamos el registro en la base de datos
        const usuario = await Usuario.findById(userID);

        // validamos que el usuario existe en la base de datos
        if(!usuario) {
            return resp.status(401).json({
                msg:  'No hay token en la peticion, debe autenticarse - usuario no existe'
            })
        }

        // validamso que el usuario no este dado de baja
        const activo = usuario.estado
        if(!activo) {
            return resp.status(401).json({
                msg: 'No hay token en la peticion, debe autenticarse - estado false'
            })
        }

        // en caso que todo este bien, establecemos el usuario en la req
        req.usuario = usuario;

        next()
    
        
    } catch (error) {

        console.log(error);
        resp.status(401).json({
            msg: 'Token Invalido'
        })
        
    }


}

module.exports = {
    validarJWT
};