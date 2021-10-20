const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { Emergencia } = require('../models/index.model');


const actualizarImagenCloudinary = async (req = request, resp = response) => {

    // const { emergenciaID } = req.params
    
    // const modelo = await Emergencia.findById(emergenciaID)
    
    // if(!modelo) {
    //     return resp.status(400).json({
    //         msg: `No existe emergencia con el ID: ${emergenciaID}`
    //     })
    // }

    // Limpiar Imagenes previas
    // if(modelo.img){
    //     const nombreArr = modelo.img.split('/');
    //     const nombre = nombreArr [nombreArr.length -1];
    //     const [public_id] = nombre.split('.');
    //     await cloudinary.uploader.destroy(public_id);
    // }

    const {tempFilePath} = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

    // modelo.img = secure_url;
    const modelo = secure_url.toString();
    
    // await modelo.save();

    // resp.send(modelo)
    resp.send(modelo)

}



module.exports = {
    actualizarImagenCloudinary
}