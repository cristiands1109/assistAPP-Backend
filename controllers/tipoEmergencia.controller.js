// Importaciones
const { request, response } = require('express');


// Modelo
const { TipoEmergencia } = require('../models/index.model');


/** OBTENER TIPO DE EMERGENCIA */
const obtenerTipoEmergencia = async (req = request, resp = response) => {

    const [tipoEmergenciaDB, total] = await Promise.all([
        TipoEmergencia.find({estado: true}),
        TipoEmergencia.countDocuments({estado: true})
    ]);

    if( total === 0) {
        return resp.status(400).json({
            msg: 'No hay registros'
        })
    }

    resp.status(200).json({
        ok: true,
        total,
        tipoEmergenciaDB,
    })
}


/** OBTENER TIPO DE EMERGENCIA BY ID */
const obtenerTipoEmergenciabyID = async (req =request, resp = response) => {

    // obtenemos el ID que viene en los params
    const { tipoEmergenciaID } = req.params;

    // obtenemos el registro de la base de datos
    const tipoEmergenciaDB = await TipoEmergencia.findById(tipoEmergenciaID);

    // verificamos si el estado
    if(tipoEmergenciaDB.estado === false) {
        return resp.status(400).json({
            msg: 'El registro no existe en la base de datos'
        })
    }

    // en caso que este todo bien procedemos a mostrar
    resp.status(200).json({
        ok: true,
        tipoEmergenciaDB
    })


}
/** OBTENER TIPO DE EMERGENCIA BY ID */
const obtenerTipoEmergenciabyDescripcion = async (req =request, resp = response) => {

    // obtenemos el ID que viene en los params
    const { descripcion } = req.params;

    const data = descripcion.toLocaleUpperCase();

    // obtenemos el registro de la base de datos
    const tipoEmergenciaDB = await TipoEmergencia.findOne({descripcion: data});

    // verificamos si el estado
    if(tipoEmergenciaDB.estado === false) {
        return resp.status(400).json({
            msg: 'El registro no existe en la base de datos'
        })
    }

    // en caso que este todo bien procedemos a mostrar
    resp.status(200).json({
        ok: true,
        tipoEmergenciaDB
    })


}

/** CREAR TIPO DE EMERGENCIA */

const crearTipoEmergencia = async (req = request, resp = response) => {

    // desestructuramos lo que viene en la req
    const {descripcion} = req.body;

    // convertimos el rol que viene en la req en mayusculas
    const data = descripcion.toUpperCase();
    
    // buscamos en la bd que no exista el rol ingresado
    const tipoEmergenciaDB = await TipoEmergencia.findOne({descripcion: data})

    // consultamos si en la bd ya existe un rol
    // en caso que exista entonces se muestra un mensaje de error y retorna
    if(tipoEmergenciaDB) {
        return resp.status(400).json({
            msg: `El Tipo de Emergencia ${data}, ya existe en la base de datos`
        })
    }

    // En caso que no exitsa se procede a la insersion
    const tipoEmergencia = new TipoEmergencia({descripcion: data});
    await tipoEmergencia.save();

    // En caso que to se haya realizado bien entonces se procede a mostrar
    resp.status(200).json({
        ok: true,
        msg: 'Registro insertado correctamente',
        tipoEmergencia
    })

}

/** EDITAR TIPO EMERGENCIA */
const editarTipoEmergencia = async (req = request, resp = response) => {

    // desestructuramos lo que viene en los params y body
    const {tipoEmergenciaID} = req.params;
    const {_id, estado, ...resto} = req.body

    // convertimos lo que viene en el body en mayusculas
    const info = await TipoEmergencia.findById(tipoEmergenciaID);

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
    const tipoEmergenciaDB = await TipoEmergencia.findByIdAndUpdate(tipoEmergenciaID, resto, {new: true});


    // en caso que todo se haya realizado con exito entonces se procede a mostrar
    resp.status(200).json({
        ok: true,
        msg: 'Registro Actualizado con exito',
        tipoEmergenciaDB
    })

}


/** DAR DE BAJA TIPO DE EMERGENCIA */
const eliminarTipoEmergencia = async (req = request, resp = response) => {
    // desestructuramos lo que viene en el param
    const { tipoEmergenciaID } = req.params;

    // verificamos si el registro esta dado de baja
    const info = await TipoEmergencia.findById(tipoEmergenciaID)

    if(info.estado === false) {
        return resp.status(400).json({
            msg: 'No se requiere esta accion'
        })
    }

    // realiza la actualizacion
    const tipoEmergenciaDB = await TipoEmergencia.findByIdAndDelete(tipoEmergenciaID);

    // en caso que todo se haya realizado con exito entonces se procede a mostrar el mensaje
    resp.status(200).json({
        ok: true,
        msg: 'Registro Eliminado con exito',
        TipoEmergencias: tipoEmergenciaDB
    })

}




module.exports = {
    obtenerTipoEmergencia,
    crearTipoEmergencia,
    obtenerTipoEmergenciabyID,
    editarTipoEmergencia,
    eliminarTipoEmergencia,
    obtenerTipoEmergenciabyDescripcion
}