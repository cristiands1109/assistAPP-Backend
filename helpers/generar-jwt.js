// Importaciones
const jwt = require('jsonwebtoken');

// Funcion para generar la autenticacion del usuario
const generarJWT = (userID = '' ) => {
    
     return new Promise ((resolve, reject) => {
        
        // El payload es lo que se almacenara en el JWT o sea en este caso el user ID
        const payload = {userID};
        // Creamos el JWT junto con el payload y nuestro private key
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if( err ) {
                // console.log(err);
                reject('Error al generar el JWT');
            } else {
                resolve(token);
            }
        })
    })
   
};

module.exports = {
    generarJWT
}


