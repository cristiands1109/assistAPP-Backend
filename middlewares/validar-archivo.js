const { request, response } = require("express")


const validarSubirArchivo = (req = request, resp = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        resp.status(400).json({ msg: 'No hay archivos en la peticion -- 1'});
        return;
      }
    
      if(!req.files.archivo) {
        resp.status(400).json({ msg: 'No hay archivos en la peticion -- '});
        return;
      }
      next();
}

module.exports = {
    validarSubirArchivo
}