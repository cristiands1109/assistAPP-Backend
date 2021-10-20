// Importaciones
const { request, response } = require("express");
const bcrypt = require('bcrypt');
const {generarJWT} = require('../helpers/generar-jwt')

// Modelo
const { Usuario } = require("../models/index.model");


/** OBTENER USUARIO */

const obtenerUsuarios = async (req = request, resp = response) => {
    
    // Realizamos la consulta a al BD
    const [usuarioDB, total] = await Promise.all ([
        Usuario.find({estado: true}).populate('rol', {descripcion: 1, _id: 0}).select({createdAt: 0, updatedAt: 0})
                                    .populate('ciudad', {descripcion: 1, _id: 0}).select({createdAt: 0, updatedAt: 0})
                                    .populate('departamento', {descripcion: 1, _id: 0}).select({createdAt: 0, updatedAt: 0}),
        Usuario.countDocuments({estado: true})
    ]);

    // Validamos si existen registros para mostrar
    if( total ===  0 ) {
        return resp.status(404).json({
            msg: 'No hay registros'
        })
    }
    
    // En caso que existan registros, mostramos 
    resp.status(200).json({
        total,
        Usuario: usuarioDB
    })

}

/** OBTENER USUARIO POR ID */

const obtenerUsuariobyID = async (req = request, resp = response) => {

    // Desestructuramos lo que viene en los parametros
    const { celularID } = req.params

    
    // obtenemos los registros de la base de datos
    const usuario = await Usuario.findOne({celular: celularID});

    // consultamos is el registro existe
    if(usuario.estado === false) {
        return resp.status(404).json({
            msg: 'El registro no existe en la base de datos'
        })
    }

    // en caso que todo este bien mostramos el mensaje
    resp.status(200).json(usuario)
}



/** CREAR USUARIO */

const crearUsuario = async (req = request, resp = response) => {

    // obtenemos lo que viene en la req
    const {celular, nombre, apellido, rol, /*ciudad, departamento,*/ password} = req.body;
    const usuario = new Usuario({celular, nombre, apellido, rol:'60df6d1b1065760e1e9e7f5c', /*ciudad, departamento,*/ password});

    // validadciones de si existe o no un celular duplicado lo hacemos en la routes
    
    // Encriptacion de contrasena
    const salt = bcrypt.genSaltSync(10); // numeros de vueltas para generar el password
    usuario.password = bcrypt.hashSync(password, salt); // modificamos el password por la encriptada

    // Guardamos en la BD
    await usuario.save();
    
    const token = await generarJWT(usuario._id)
    // En caso que todo se haya hecho bien entonces procedemos a mostrar la respuesta
    resp.status(200).json({
        msg: 'Registro insertado correctamente',
        token,
        usuario
    })

}

/** EDITAR USUARIO */

const editarUsuario = async (req = request, resp = response) => {
    // obtenemos los datos del params y de la req
    const {celularID} = req.params;
    const {_id, password, celular, /*rol,*/ ...resto} = req.body;


    // consulta para validacion de estado
    const info = await Usuario.findOne({celular: celularID})

    // En caso que quiera dar de alta el usuario
    if(info.estado === false && req.body.estado === true) {
        resto.estado = true
    }

    // en caso que quiera modificar el password y viene en la req entonces se procede
    // a hacer de vuelta la encriptacion del mismo
    if(password) {
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
        // console.log('nuevo' ,resto.password);
    }
    
    // realizamos la actualizacion
    const usuario = await Usuario.findOneAndUpdate({celular: celularID}, resto, {new: true})
                                    .populate('rol', {descripcion: 1, _id: 1}).select({createdAt: 0, updatedAt: 0})
                                    .populate('ciudad', {descripcion: 1, _id: 1}).select({createdAt: 0, updatedAt: 0})
                                    .populate('departamento', {descripcion: 1, _id: 1}).select({createdAt: 0, updatedAt: 0});

    // si todo sale bien mostramos la respuesta
    resp.status(200).json({
        msg: 'Registro Actualizado con exito',
        usuario
    })
}

/** ELIMINAR USUARIO */
const eliminarUsuario = async (req = request, resp = response) => {
    // Obtenemos el celular que viene en los paramas
    const { celularID } = req.params;

    // consultamos si el registro ya no se encuentra en baja 
    const info = await Usuario.findOne({celular: celularID});
    if (info.estado === false) {
        return resp.status(400).json({
            msg: 'No se requiere esta accion'
        })
    }

    // realizamos la actualizacion
    const usuario = await Usuario.findOneAndUpdate({celular: celularID}, {estado: false}, {new: true});

    // en caso que todo se haya realizado con exito entonces se procede a 
    // mostrar el mensaje
    resp.status(200).json({
        msg: 'Registro Eliminado con exito',
        usuario
    })
}

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    obtenerUsuariobyID
}