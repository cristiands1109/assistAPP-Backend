// Importaciones
const { request, response } = require("express");

// modelo
const { Rol } = require('../models/index.model')

/** OBTENER ROLES */

const obtenerRol = async (req = request, resp = response) => {

    // obtenemos todos los roles que se encuentra en la base de datos, igual que la cantidad
   const [rolDB, total] = await Promise.all([
       Rol.find({estado: true}),
       Rol.countDocuments({estado: true})
   ]);

   // validacion que verifica que existan registros en la base de datos si no existen mmuesta un mensaje
   if( total == 0) {
       return resp.status(404).json({
           total,
           msg: 'No hay registros'
       })
   }

   // en caso que existan datos en la bd, procedemos a mostrarlos
   resp.status(200).json({
       total,
       Roles: rolDB
   })

}

/** OBTENER ROL BY ID */

const obtenerRolbyID = async (req =request, resp = response) => {

    // obtenemos el ID que viene en los params
    const { rolID } = req.params;

    // obtenemos el registro de la base de datos
    const rolDB = await Rol.findById(rolID);

    // verificamos si el estado
    if(rolDB.estado === false) {
        return resp.status(400).json({
            msg: 'El registro no existe en la base de datos'
        })
    }

    // en caso que este todo bien procedemos a mostrar
    resp.status(200).json(rolDB)


}

/** CREAR ROL */

const crearRol = async (req = request, resp = response) => {

    // desestructuramos lo que viene en la req
    const {descripcion} = req.body;

    // convertimos el rol que viene en la req en mayusculas
    const data = descripcion.toUpperCase();
    
    // buscamos en la bd que no exista el rol ingresado
    const rolDB = await Rol.findOne({descripcion: data})

    // consultamos si en la bd ya existe un rol
    // en caso que exista entonces se muestra un mensaje de error y retorna
    if(rolDB) {
        return resp.status(400).json({
            msg: `El rol ${data}, ya existe en la base de datos`
        })
    }

    // En caso que no exitsa se procede a la insersion
    const rol = new Rol({descripcion: data});
    await rol.save();

    // En caso que to se haya realizado bien entonces se procede a mostrar
    resp.status(200).json({
        msg: 'Registro insertado correctamente',
        rol
    })

}

/** EDITAR ROL */

const editarROL = async (req = request, resp = response) => {

    // desestructuramos lo que viene en los params y body
    const {rolID} = req.params;
    const {_id, estado, ...resto} = req.body

    // convertimos lo que viene en el body en mayusculas
    const info = await Rol.findById(rolID);

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
    const rolDB = await Rol.findByIdAndUpdate(rolID, resto, {new: true});


    // en caso que todo se haya realizado con exito entonces se procede a mostrar
    resp.status(200).json({
        msg: 'Registro Actualizado con exito',
        rolDB
    })

}

/** DAR DE BAJA ROL */
const eliminarRol = async (req = request, resp = response) => {
    // desestructuramos lo que viene en el param
    const { rolID } = req.params;

    // verificamos si el registro esta dado de baja
    const info = await Rol.findById(rolID)

    if(info.estado === false) {
        return resp.status(400).json({
            msg: 'No se requiere esta accion'
        })
    }

    // realiza la actualizacion
    const rolDB = await Rol.findByIdAndUpdate(rolID, {estado: false});

    // en caso que todo se haya realizado con exito entonces se procede a mostrar el mensaje
    resp.status(200).json({
        msg: 'Registro Eliminado con exito',
        Rol: rolDB
    })

}

module.exports = {
    obtenerRol,
    crearRol,
    editarROL,
    eliminarRol,
    obtenerRolbyID
}