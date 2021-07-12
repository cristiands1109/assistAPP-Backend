// Importaciones
const { request, response } = require("express");

// Model
const { Ciudad } = require('../models/index.model');


/** OBTENER CIUDADES */

const obtenerCiudades = async (req = request, resp = response) => {

    // Hacemos la consulta en la base de datos
    const [ciudadDB, total] = await Promise.all([
        Ciudad.find({estado: true}) .populate('departamento', {descripcion: 1, _id: 0})
                                    .select({createdAt: 0, updatedAt: 0}),
        Ciudad.countDocuments({estado: true})
    ])

    // Consultamos si existen registros para mostrar
    if(total === 0) {
        return resp.status(404).json({
            msg: 'No hay registros'
        })
    }

    // En caso que exitan, mostramos los registros
    resp.status(200).json({
        total,
        Ciudad: ciudadDB
    })

};

/** OBTENER CIUDAD BY ID  */

const obtenerCiudadbyID = async (req = request, resp = response) => {
    
    // Desestructuramos lo que viene en la req
    const {ciudadID} = req.params;

    // obtenemos el registro de la base de datos
    const ciudadDB = await Ciudad.findById(ciudadID).populate('departamento', {descripcion: 1, _id: 0})
                                                    .select({createdAt: 0, updatedAt: 0})

    // Verificamos si el registro no esta dado de baja
    if(ciudadDB.estado === false) {
        return resp.status(200).json({
            msg: 'El registro no existe en la base de datos'
        })
    }

    // en caso que todo este bien procedemos a mostrar el resultado
    resp.status(200).json(ciudadDB);
}

/** CREAR CIUDAD */

const crearCiudad = async (req = request, resp = response) => {

    // Desestructuramos lo que viene en el body
    const { descripcion, departamento } = req.body;

    // Convertimos lo que viene en la req en mayusculas
    const data = descripcion.toUpperCase();

    // Buscamos en la base de datos que no exita uno similar
    const ciudadDB = await Ciudad.findOne({descripcion: data});

    // En caso que exista entonces procedemos a mostrar el mensaje de error
    if(ciudadDB) {
        return resp.status(400).json({
            msg: `La ciudad ${data}, ya existe en la base de datos`
        })
    }

    // En caso que no exista entonces procedemos a insertar
    const ciudad = new Ciudad({descripcion: data , departamento});
    await ciudad.save();

    // En caso que todo se haya realizado correctamente mostramos la resp
    resp.status(200).json({
        msg: 'Registro insertado correctamente',
        ciudad
    })

}

/** EDITAR CIUDAD */

const editarCiudad = async (req = request, resp = response) => {
    // Desestructuramos lo que viene en el body y params
    const { ciudadID } = req.params;
    const { _id, estado, ...resto } = req.body;

    // Realizamos la busqueda en la base de datos
    const info = await Ciudad.findById(ciudadID);

    // si viene el estado en la req significa que quiere dar de alta el registro
    // consultamos si viene el estado en la req
    // en caso que si venga consultamos si el estado del registro es falso
    if(info.estado === false && req.body.estado === true) {
        resto.estado = true
    }

    // si viene la descripcion en la req. se procede a colocar en mayusculas
    if(resto.descripcion) {
        resto.descripcion = resto.descripcion.toUpperCase();
    }

    // se procede a actualizar la base de datos
    const ciudadDB = await Ciudad.findByIdAndUpdate(ciudadID, resto, {new: true});

    // en caso que todo se haya realizado correctamento mostramos la resp
    resp.status(200).json({
        msg: 'Registro Actualizado con exito',
        ciudadDB
    })

}

/** DAR DE BAJA UNA CIUDAD */

const eliminarCiudad = async (req = request, resp = response) => {

    // desestructuramos lo que viene en el params
    const { ciudadID } = req.params;

    // verificamos si el registro esta dado de baja
    const info = await Ciudad.findById(ciudadID);

    if(info.estado === false) {
        return resp.status(400).json({
            msg: 'No se requiere esta accion'
        })
    }

    // realiza la actualizacion
    const ciudadDB = await Ciudad.findByIdAndUpdate(ciudadID, {estado: false}, {new: true});

    // En caso que todo se haya realizado bien
    resp.status(200).json({
        msg: 'Registro Eliminado con exito',
        Ciudad: ciudadDB
    })


}


module.exports = {
    obtenerCiudades,
    obtenerCiudadbyID,
    crearCiudad,
    editarCiudad,
    eliminarCiudad
}