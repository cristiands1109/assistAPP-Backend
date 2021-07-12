const { request, response } = require("express");

const { Nivel } = require('../models/index.model');

/** OBTENER NIVEL */
const obtenerNivel = async (req = request, resp = response) => {
    
    // hacemos la consulta en la base de datos
    const [nivel, total] = await Promise.all([
        Nivel.find({estado: true}).select({createdAt: 0, updatedAt: 0}),
        Nivel.countDocuments({estado: true})
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
        nivel
    })
}

/** OBTENER NIVEL BY ID */

const obtenerNivelbyID = async (req = request, resp = response) => {

    // obtenemos el ID que viene en los params
    const {nivelID} = req.params;

    // Obtenemos el registro de la base de datos
    const nivelDB = await Nivel.findById(nivelID).select({createdAt: 0, updatedAt:0});

    // verificamos el estado
    if(nivelDB.estado === false) {
        return resp.status(400).json({
            msg: 'El registro no existe en la base de datos'
        })
    }

    // en caso que todo se realice bien entonces procedemos a mostrar el mensaje
    resp.status(200).json(nivelDB);
}

/** CREAR NIVEL */
const crearNivel = async (req = request, resp = response) => {

    // desestructuramos lo que viene en el body
    const { prioridad, descripcion } = req.body;

    // convertimos la descripcion en mayusculas
    const data = descripcion.toUpperCase();

    // buscamos que no exista en la base de datos un nivel similar
    const nivelDB = await Nivel.findOne({prioridad});
    // hacemos la validacion para que no inserte un regitro que ya existe
    if(nivelDB) {
        return resp.status(400).json({
            msg: `El nivel ${prioridad}, ya existe en la base de datos`
        })
    }

    // en caso que no exista entonces procedemos a insertar y guarda
    const nivel = new Nivel({descripcion: data, prioridad});
    await nivel.save();

    // en caso que se haya realizado todo de manera correcta se procede a mostrar el
    // mensaje

    resp.status(200).json({
        msg: 'Registro insertado correctamente',
        nivel
    })
}

/** EDITAR NIVEL */
const editarNivel = async (req = request, resp = response) => {
    
    // Obtenemos lo que viene en la req y los params
    const { nivelID } = req.params;
    const {_id, estado, prioridad, ...resto} = req.body;

    // obtenermos el registro
    const info = await Nivel.findById(nivelID);

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
    const nivel = await Nivel.findByIdAndUpdate(nivelID, resto, {new: true});

    // en caso que todo se realice correctamente entonces se procede a mostrar el mensaje
    resp.status(200).json({
        msg: 'Registro Actualizado con existo',
        nivel
    })
}

/** ELIMINAR NIVEL */

const eliminarNivel = async (req = request, resp = response) => {
    // desestructuramos lo que viene en el param
    const { nivelID } = req.params;

    // verificamos si el registro esta dado de baja
    const info = await Nivel.findById(nivelID)

    if(info.estado === false) {
        return resp.status(400).json({
            msg: 'No se requiere esta accion'
        })
    }

    // realiza la actualizacion
    const nivel = await Nivel.findByIdAndUpdate(nivelID, {estado: false});

    // en caso que todo se haya realizado con exito entonces se procede a mostrar el mensaje
    resp.status(200).json({
        msg: 'Registro Eliminado con exito',
        nivel
    })

}

module.exports = {
    obtenerNivel,
    crearNivel,
    obtenerNivelbyID,
    editarNivel,
    eliminarNivel
}