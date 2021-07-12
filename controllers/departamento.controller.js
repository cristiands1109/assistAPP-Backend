// Importaciones
const { request, response } = require('express'); // para tener el tipado

// Modelo
const { Departamento } = require('../models/index.model');

/** OBTENER DEPARTAMENTO */

const obtenerDepartamento = async (req = request, resp = response) => {

    // realizamos las consultas en la BD
    const [departamentoDB, total] = await Promise.all([
        Departamento.find({estado: true}),
        Departamento.countDocuments({estado: true})
    ]);

    // hacemos la validacion para saber si existen registro para mostrar
    if( total === 0) {
        return resp.status(404).json({
            msg: 'No hay registros'
        })
    }

    // en caso que existan, mostramos los registros
    resp.status(200).json({
        total,
        Departamento: departamentoDB
    })

}

/** OBTENER DEPARTAMENTO BY ID */

const obtenerDepartamentobyID = async (req = request, resp = response) => {

    // obtenemos el ID que viene en los params
    const {departamentoID} = req.params

    // obtenemos los registros de la base de datos
    const departamentoDB = await Departamento.findById(departamentoID);

    // verificamos si el estado del registro
    // si es falso mostramos el mensaje 
    if (departamentoDB.estado === false) {
        return resp.status(400).json({
            msg: 'El registro no existe en la base de datos'
        })
    }
    // en caso que este todo bien procedemos a mostrar el mensaje
    resp.status(200).json(departamentoDB);

}

/** CREAR DEPARTAMENTO */

const crearDepartamento = async (req = request, resp = response) => {

    // desestructuramos lo que viene en la req
    const { descripcion } = req.body;

    // convertimos el departamento en mayusculas
    const data = descripcion.toUpperCase();

    // buscamos que no exista ya un departamento similar
    const departamentoDB = await Departamento.findOne({descripcion: data});

    // en caso de que exista ya un departamento igual
    // mostramos el mesaje de peticion
    if(departamentoDB) {
        return resp.status(400).json({
            msg: `El departamento ${data}, ya existe en la base de datos`
        })
    }

    // en caso que no existe entonces procedemos a la insersion
    const departamento = new Departamento({descripcion: data});
    await departamento.save();

    // En caso que el proceso se haya realizado correctamente mostramos resp
    resp.status(200).json({
        msg: 'Registro insertado correctamente',
        departamento
    })

}

/** EDITAR DEPARTAMENTO */

const editarDepartamento = async (req = request, resp = response) => {

    // desestructuramos lo que viene en los params
    const {departamentoID} = req.params;
    const {_id, estado, ...resto} = req.body;

    // realizamos la busqueda en la base de datos
    const info = await Departamento.findById(departamentoID);

    // si viene el estado en la req significa que quiere dar de alta el registro
    // consultamos si viene el estado en la req
    // en caso que si venga consultamos si el estado del registro es falso
    if(info.estado === false && req.body.estado === true) {
        resto.estado = true
    }

    // si viene la descripcion en la req se procede a colocar en mayusculas
    if(resto.descripcion) {
        resto.descripcion = resto.descripcion.toUpperCase();
    }

    // se procede a realizar la actualizacion
    const departamentoDB = await Departamento.findByIdAndUpdate(departamentoID, resto, {new: true});

    // en caso que todo se haya realizado correctamente mostramos el mensaje
    resp.status(200).json({
        msg: 'Registro Actualizado con exito',
        departamentoDB
    })
}

/** DAR DE BAJA DEPARTAMENTO */

const eliminarDepartemento = async (req = request, resp = response) => {
    // desestructuramos lo que viene en el param
    const { departamentoID } = req.params;

    // verificamos si el registro esta dado de baja
    const info = await Departamento.findById(departamentoID)

    if(info.estado === false) {
        return resp.status(400).json({
            msg: 'No se requiere esta accion'
        })
    }

    // realiza la actualizacion
    const departamentoDB = await Departamento.findByIdAndUpdate(departamentoID, {estado: false});

    // en caso que todo se haya realizado con exito entonces se procede a mostrar el mensaje
    resp.status(200).json({
        msg: 'Registro Eliminado con exito',
        Departamento: departamentoDB
    })

}

module.exports = {
    obtenerDepartamento,
    crearDepartamento,
    obtenerDepartamentobyID,
    editarDepartamento,
    eliminarDepartemento
}