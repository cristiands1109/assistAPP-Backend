// Importaciones
const { request, response } = require("express");
const { Estados } = require("../models/index.model");

// Model



const obtenerEstado = async (req =request, resp = response) => {

    // hacemos la consulta en la base de datos
    const [estadoDB, total] = await Promise.all([
        Estados.find({estado: true}).select({createdAt: 0, updatedAt: 0}),
        Estados.countDocuments({estado: true})
    ]);

    // validamos si existen registros para mostrar
    if (total === 0) {
        return resp.status(404).json({
            msg: 'No hay registros'
        })
    }

    // si todo sale bien entonces procedemos a mostrar el resultado
    resp.status(200).json({
        total,
        estados: estadoDB
    })
}


/** OBTENER NIVEL BY ID */

const obtenerEstadobyID = async (req = request, resp = response) => {

    // obtenemos el ID que viene en los params
    const {estadoID} = req.params;

    // Obtenemos el registro de la base de datos
    const estadoDB = await Estados.findById(estadoID).select({createdAt: 0, updatedAt:0});

    // verificamos el estado
    if(estadoDB.estado === false) {
        return resp.status(400).json({
            msg: 'El registro no existe en la base de datos'
        })
    }

    // en caso que todo se realice bien entonces procedemos a mostrar el mensaje
    resp.status(200).json(estadoDB);
}

/** CREAR ESTADO */

const crearEstado = async (req = request, resp = response) => {

     // desestructuramos lo que viene en el body
     const { descripcion } = req.body;

     // convertimos la descripcion en mayusculas
     const data = descripcion.toUpperCase();
 
     // buscamos que no exista en la base de datos un nivel similar
     const info = await Estados.findOne({descripcion: data});
     // hacemos la validacion para que no inserte un regitro que ya existe
     if(info) {
         return resp.status(400).json({
             msg: `El estado: ${data}, ya existe en la base de datos`
         })
     }
 
     // en caso que no exista entonces procedemos a insertar y guarda
     const estadoDB = new Estados({descripcion: data});
     await estadoDB.save();
 
     // en caso que se haya realizado todo de manera correcta se procede a mostrar el
     // mensaje
 
     resp.status(200).json({
         msg: 'Registro insertado correctamente',
         estados: estadoDB
     })

}

/** EDITAR ESTADO */
const editarEstado = async (req = request, resp = response) => {
    
    // Obtenemos lo que viene en la req y los params
    const { estadoID } = req.params;
    const {_id, estado, ...resto} = req.body;

    // obtenermos el registro
    const info = await Estados.findById(estadoID);

    // req.body.estado, hace referencia si viene en req el estado en true
    // info.estado negado, hace referencia a lo que se encuentra en la base de datos actualmente
    // si en la req viene el estado entonces consultamos si en la base de datos esta de baja para volve a dar de alta
    if(info.estado === false && req.body.estado === true) {
        resto.estado = true;
    }

    // si viene la descripcion en la req se procede a poner en mayusculas y actualizar
    if (resto.descripcion) {
        resto.descripcion = resto.descripcion.toUpperCase();
    }


    // se realiza la actualizacion
    const estadoDB = await Estados.findByIdAndUpdate(estadoID, resto, {new: true});

    // en caso que todo se realice correctamente entonces se procede a mostrar el mensaje
    resp.status(200).json({
        msg: 'Registro Actualizado con existo',
        estado: estadoDB
    })
}

/** ELIMINAR ESTADO */

const eliminarEstado = async (req = request, resp = response) => {
    // desestructuramos lo que viene en el param
    const { estadoID } = req.params;

    // verificamos si el registro esta dado de baja
    const info = await Estados.findById(estadoID);

    if(info.estado === false) {
        return resp.status(400).json({
            msg: 'No se requiere esta accion'
        })
    }

    // realiza la actualizacion
    const estadoDB = await Estados.findByIdAndUpdate(estadoID, {estado: false});

    // en caso que todo se haya realizado con exito entonces se procede a mostrar el mensaje
    resp.status(200).json({
        msg: 'Registro Eliminado con exito',
        estado: estadoDB
    })

}




module.exports = {
    obtenerEstado,
    crearEstado,
    obtenerEstadobyID,
    editarEstado,
    eliminarEstado
}