const { request, response } = require('express')
const bcrypt = require('bcrypt');
const { Usuario } = require('../models/index.model');
const { generarJWT } = require('../helpers/generar-jwt');
const { getMenuFrontEnd } = require('../helpers/menu-frontend')
// const  { generarJWT }  = require('../helpers/generar-jwt');




const login = async ( req = request, resp = response) => {

    const { celular, password } = req.body;

    try {

        // verificamos celular
        const usuario = await Usuario.findOne({celular});
        if(!usuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'Autenticacion incorrecta - celular'
            })
        }

        // verificamos si el usuario se encuentra activo
        const activo = usuario.estado;
        if(!activo) {
            return resp.status(400).json({
                ok: false,
                msg: 'Autenticacion incorrecta - estado'
            })
        }

        // verificamos que la contrasena sea la correcta
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if(!validarPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'Autenticacion incorrecta - password'
            })
        }

        // GENERAMOS EL TOKEN
        const token = await generarJWT(usuario.id);

        // Una vez generado entonces procedemos a mostrar la respuesta junto con JWT
        resp.status(200).json({
            ok: true,
            msg: 'Login Exitoso',
            usuario,
            token,
            menu: getMenuFrontEnd(usuario.rol)
        })

    } catch (error) {
        // console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Favor comunicarse con el administrador'
        })
    }
}

const revalidarToken = async (req = request, resp = response) => {


    const userID = req.usuario.id;
    // console.log(userID);

    // GENERAMOS EL TOKEN
    const token = await generarJWT(userID);

    const usuario = await Usuario.findById(userID)

    if(!usuario) {
        return resp.status(404).json({
            ok: false,
            msg: 'El usuario no existe en la base de datos'
        })
    }
    

    resp.status(200).json({
        ok: true,
        usuario,
        token,
        menu: getMenuFrontEnd(usuario.rol)
    })
}

const usuariobyToken = async (req = request, resp = response) => {
    const userID = req.usuario.id;

    const usuario = await Usuario.findById(userID)

    if(!usuario) {
        return resp.status(404).json({
            ok: false,
            msg: 'El usuario no existe en la base de datos'
        })
    }

    resp.status(200).json({
        ok: true,
        usuario,
        menu: getMenuFrontEnd(usuario.rol)
    })
}


module.exports = {
    login,
    revalidarToken,
    usuariobyToken
}