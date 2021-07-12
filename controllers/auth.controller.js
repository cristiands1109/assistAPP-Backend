const { request, response } = require('express')
const bcrypt = require('bcrypt');
const { Usuario } = require('../models/index.model');
const { generarJWT } = require('../helpers/generar-jwt');
// const  { generarJWT }  = require('../helpers/generar-jwt');




const login = async ( req = request, resp = response) => {

    const { celular, password } = req.body;

    try {

        // verificamos celular
        const usuario = await Usuario.findOne({celular});
        if(!usuario) {
            return resp.status(400).json({
                msg: 'Autenticacion incorrecta - celular'
            })
        }

        // verificamos si el usuario se encuentra activo
        const activo = usuario.estado;
        if(!activo) {
            return resp.status(400).json({
                msg: 'Autenticacion incorrecta - estado'
            })
        }

        // verificamos que la contrasena sea la correcta
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if(!validarPassword) {
            return resp.status(400).json({
                msg: 'Autenticacion incorrecta - password'
            })
        }

        // GENERAMOS EL TOKEN
        const token = await generarJWT(usuario.id);

        // Una vez generado entonces procedemos a mostrar la respuesta junto con JWT
        resp.status(200).json({
            msg: 'Login Exitoso',
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            msg: 'Favor comunicarse con el administrador'
        })
    }
}


module.exports = {
    login
}