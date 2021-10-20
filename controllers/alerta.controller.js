const { request, response } = require("express");

const { Alerta } = require('../models/index.model')

/** OBTENER ALERTA */

const obtenerAlerta = async (req = request, resp = response) => {

    // Hacemos las consultas a la bd
    const [alerta, total] = await Promise.all([
        Alerta.find({estado: true}).populate('operador', {_id: 0, nombre: 1, apellido: 1}).select({createdAt: 0, updatedAt: 0})
                                    .populate('emergencia', {_id: 0, relatoria: 1, direccion: 1}),
                                    // .populate('estados', {_id: 0, descripcion: 1}),
        Alerta.countDocuments({estado: true})
    ])

    // Validamos de que existan registros para mostrar
    if ( total === 0) {
        return resp.status(404).json({
            msg: 'No hay registros'
        })
    }

    // si todo sale bien mostramos la respuesta y el mensaje
    resp.status(200).json({
        total,
        alerta
    })

}

/** OBTENER ALERTA BY ID */

const obtenerAlertabyID = async (req = request, resp = response) => {
    const { alertaID } = req.params;

    const alertaDB = await Alerta.findById(alertaID).populate('operador', {_id: 0, nombre: 1, apellido: 1}).select({createdAt: 0, updatedAt: 0, estado: 0})
                                                    .populate('emergencia', {_id: 0, relatoria: 1, direccion: 1})
                                                    // .populate('estados', {_id: 0, descripcion: 1})

    if (alertaDB.estado === false) {
        return resp.status(400).json({
            msg: 'El registro no existe en la base de datos'
        })
    }
    
    resp.status(200).json(alertaDB)
}

/** CREAR ALERTA */

const crearAlerta = async (req = request, resp = response) => {

    // desestructuramos lo que viene en la req
    // const {operador, emergencia, estados } =req.body
    const {operador, emergencia} =req.body

    // buscamos en la bd que no exista una emergencia similar ingresada
    const alertaDB = await Alerta.findOne({emergencia});
    if(alertaDB) {
        return resp.status(400).json({
            msg: `La alerta con el ID Emergencia: ${emergencia}, ya ha sido emitida`
        })
    }

    // en caso que no exista se procede a la insersion
    // const alerta = new Alerta({operador, emergencia, estados});
    const alerta = new Alerta({operador, emergencia});
    alerta.save();

    resp.status(200).json({
        msg: 'Alerta emitida correctamente',
        alerta
    })

}

/** EDITAR ALERTA */

const editarAlerta = async (req = request, resp = response) => {

    // desestructuramos lo que viene en los params y req 
    const {alertaID} = req.params;
    const { _id, emergencia, ... resto } = req.body

    // realizamos una busqueda para evaluar despues el estado
    const info = await Alerta.findById(alertaID);
    if(info.estado === false) {
        return resp.status(404).json({
            msg: 'La alerta no existe en la base de datos'
        })
    }

    // si viene el operador se modifica
    if( resto.operador) {
        resto.operador = req.body.operador;
    }

    // si viene el cambio de estado se procede a modificar
    // if(resto.estados) {
    //     resto.estados = req.body.estados;
    // }

    // realizar la actualizacion
    const alerta = await Alerta.findByIdAndUpdate(alertaID, resto, {new: true});

    // en caso que se realice todo bien mostramos el mensaje
    resp.status(200).json({
        msg: 'Registro Actualizado con exito',
        alerta
    })

}

const eliminarAlerta = async (req = request, resp = response) => {

    // desestructuramos lo que viene en el params
    const {alertaID} = req.params;

    const alertaDB = await Alerta.findById(alertaID);

    if(alertaDB.estado === false) {
        return resp.status(400).json({
            msg: 'Esta accion no es requerida'
        })
    }

    const alerta = await Alerta.findByIdAndUpdate(alertaID, {estado: false}, {new: true});

    resp.status(200).json({
        msg: 'Registro Eliminado exitosamente',
        alerta
    })

}

    

module.exports = {
    obtenerAlerta,
    obtenerAlertabyID,
    crearAlerta,
    editarAlerta,
    eliminarAlerta
}