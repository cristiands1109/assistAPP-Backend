const { request, response } = require('express');
const { getResultGeo } = require('../helpers/getGeo.helper');
const { Emergencia } = require('../models/index.model');

/** OBTENER EMERGENCIAS */
const obtenerEmergencia = async (req = request, resp = response) => {

    // Realizamos la consulta en la bd 
    const [emergenciaDB, total] = await Promise.all([
        // Emergencia.find({estado: true}).populate('nivel', {descripcion: 1, _id: 0}).select({createdAt: 0, updatedAt: 0}),
        Emergencia.find({estado: true}).populate('nivel', {descripcion: 1, _id: 0}).select({createdAt: 0, updatedAt: 0})
                                        .populate('denunciante', {_id: 0, nombre: 1, apellido: 1}),
        Emergencia.countDocuments({estado: true})
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
        Emergencia: emergenciaDB
    })
}

/** OBTENER EMERGENCIA BY ID */

const obtenerEmergenciabyID = async (req = request, resp = response) => {

    // obtenermos lo que viene en los params
    const { emergenciaID } = req.params;

    // obtenemos el registro
    const emergencia = await Emergencia.findById(emergenciaID)
                                        .populate('nivel', {descripcion: 1, _id: 0}).select({createdAt: 0, updatedAt: 0})
                                        .populate('denunciante', {_id: 0, nombre: 1, apellido: 1});

    // consultamos si el registro se encuentra activo
    if (emergencia.estado === false){
        return resp.status(404).json({
            msg: 'El registro no existe en la base de datos'
        })
    }

    // en caso que todo salga bien, mostramos la resp con el mensaje
    resp.status(200).json(emergencia);
}

/** CREAR EMERGENCIA */
const crearEmergencia = async (req = request, resp = response) => {

    const accesskey = '4c2594c643861f24b775bb0d5ca4086e';
    const ip = req.headers['x-forwarded-for'];
    // const ip = '170.51.53.148';

    // desestructuramos lo que viene en la req
    const {longitud, latitud, ... resto} = req.body;

    // esto es antes 
    // const {relatoria, direccion, longitud, latitud, img, nivel, denunciante } = req.body;

    // obtenemos la geolocalizacion
    const geo = await getResultGeo(ip, accesskey);
    resto.longitud = geo.longitude;
    resto.latitud = geo.latitude;

    // creamos una nueva instancia de emergencia
    const emergencia = new Emergencia(resto);

    // esto es de antes
    // const emergencia = new Emergencia({relatoria, direccion, longitud, latitud, img, nivel, denunciante });

    // realizamos la insersion
    await emergencia.save();

    // en casao que no haya errores entonces mostramos el mensaje
    resp.status(200).json({
        msg: 'Registro insertado correctamente',
        emergencia
    })

}

/** EDITAR EMERGENCIA */

const editarEmergencia = async ( req = request, resp = response) => {

    // Obtenemos lo que viene en los parametros y la req
    const { emergenciaID } = req.params;
    const {_id, estado, denunciante, img, ...resto} = req.body;

    // buscamos el registro para poder consultar por el estado
    const info = await Emergencia.findById(emergenciaID);

    // realizamos la consulta por el estado de la emergencia
    if (info.estado === false) {
        return resp.status(404).json({
            msg: 'El registro no existe en la base de datos'
        })
    }

    // realizamos la actualizacion
    const emergencia = await Emergencia.findOneAndUpdate(emergenciaID, resto, {new: true})
                                        .populate('nivel', {descripcion: 1, _id: 0}).select({createdAt: 0, updatedAt: 0})
                                        .populate('denunciante', {_id: 0, nombre: 1, apellido: 1});

    // si todo sale bien
    resp.status(200).json({
        msg: 'Registro Actualizado con exito',
        emergencia
    })
}

const eliminarEmergencia = async (req = request, resp = response) => {

    // obtenermos lo que viene en los params
    const { emergenciaID } = req.params;

    // consultamos si el registro ya no se encuentra dado de baja
    const info = await Emergencia.findById(emergenciaID);
    if (info.estado === false) {
        return resp.status(400).json({
            msg: 'No se requiere esta accion'
        })
    }

    // realizamos la actualizacion
    const emergencia = await Emergencia.findByIdAndUpdate(emergenciaID, {estado: false}, {new: true})
                                        .populate('nivel', {descripcion: 1, _id: 0}).select({createdAt: 0, updatedAt: 0})
                                        .populate('denunciante', {_id: 0, nombre: 1, apellido: 1});

    // en caso que todo se haya realizado correctamente, mostramos el mensaje
    resp.status(200).json({
        msg: 'Registro Elimado con exito',
        emergencia
    })
}

module.exports = {
    obtenerEmergencia,
    obtenerEmergenciabyID,
    crearEmergencia,
    editarEmergencia,
    eliminarEmergencia
}