const { Rol, Departamento, Ciudad, Usuario, Nivel, Estados, Emergencia, Alerta } = require("../models/index.model")


/** VALIDACIONES DE SI EXISTE ID */

/** ROL */
const existeRolID = async (rolID) => {
    const existe = await Rol.findById(rolID);

    // Validamos que exista el registro, sino existe entonces mostramos el mensaje de error
    if(!existe) {
        throw new Error(`El rol ID: ${rolID}, no existe en la base de datos`);
    }

}

const validarEstadoRol = async (rolID) => {
    const existe = await Rol.findById(rolID);
    if (existe.estado === false) {
        throw new Error('El Rol no existe en la base de datos');
    }
}

/** DEPARTAMENTO */
const existeDepartamentoID = async (departamentoID) => {
    const existe = await Departamento.findById(departamentoID);

    // Validamos que exista el registro, sino existe entonces mostramos el mensaje de error
    if(!existe) {
        throw new Error(`El departamento ID: ${departamentoID}, no existe en la base de datos`);
    }

}

const validarEstadoDepartamento = async (departamentoID) => {
    const existe = await Departamento.findById(departamentoID);
    if (existe.estado === false) {
        throw new Error('El Departamento no existe en la base de datos');
    }
}

/** CIUDAD */
const existeCiudadID = async (ciudadID) => {
    const existe = await Ciudad.findById(ciudadID);

    // Validamos que exista el registro, sino existe entonces mostramos el mensaje de error
    if(!existe) {
        throw new Error(`La ciudad ID: ${ciudadID}, no existe en la base de datos`);
    }

}

const validarEstadoCiudad = async (ciudadID) => {
    const existe = await Ciudad.findById(ciudadID);
    if (existe.estado === false) {
        throw new Error('El Ciudad no existe en la base de datos');
    }
}

/** USUARIO */
const duplicadoUSER = async (celular) => {
    const dupli = await Usuario.findOne({celular});
    if(dupli) {
        throw new Error('Ya existe un registro con ese numero')
    }
}

const existeUsuario = async (celular) => {
    const existe = await Usuario.findOne({celular});

    // Validamos que exista el registro, sino existe entonces mostramos el mensaje de error
    if(!existe) {
        throw new Error(`El celular ${celular}, no existe en la base de datos`);
    }
}


/** NIVEL */
const existeNivelID = async (nivelID) => {
    const existe = await Nivel.findById(nivelID);
    
    // validamos que exista el registro, sino existe mostramos el mensaje de error
    if(!existe) {
        throw new Error(`El nivel ${nivelID}, no existe en la base de datos`)
    }
}

/** ESTADOS */
const existeEstadoID = async (estadoID) => {
    const existe = await Estados.findById(estadoID);
    
    // validamos que exista el registro, sino existe mostramos el mensaje de error
    if(!existe) {
        throw new Error(`El estado ${estadoID}, no existe en la base de datos`)
    }
}

/** EMERGENCIA */

// Para validar si existe el usuario
const existeDenuncianteID = async (denuncianteID) => {
    const existe = await Usuario.findById(denuncianteID);

    // Validamos que exista el registro, sino existe entonces mostramos el mensaje de error
    if(!existe) {
        throw new Error(`El usuario, no existe en la base de datos`);
    }
}

const existeEmergenciaID = async (emergenciaID) => {
    const existe = await Emergencia.findById(emergenciaID);
    if(!existe) {
        throw new Error(`La emergencia no existe en la base de datos`)
    }
}

/** OPERADOR */
const existeOperadorID = async (operadorID) => {
    const existe = await Usuario.findById(operadorID);

    // Validamos que exista el registro, sino existe entonces mostramos el mensaje de error
    if(!existe) {
        throw new Error(`El operador, no existe en la base de datos`);
    }
}

/** ALERTA */
const existeAlertaID = async (alertaID) => {
    const existe = await Alerta.findById(alertaID);

    // Validamos que exista el registro, sino existe entonces mostramos el mensaje de error
    if(!existe) {
        throw new Error(`La Alerta, no existe en la base de datos`);
    }
}

module.exports = {
    existeRolID,
    existeDepartamentoID,
    existeCiudadID,
    existeNivelID,
    existeEstadoID,
    existeDenuncianteID,
    existeEmergenciaID,
    existeOperadorID,
    existeAlertaID,
    duplicadoUSER,
    existeUsuario,
    validarEstadoRol,
    validarEstadoDepartamento,
    validarEstadoCiudad
}