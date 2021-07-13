// Importaciones
const express = require('express');
const cors = require('cors');
const fileUpload = require ('express-fileupload');

// Importaciones de metodos o clases
const dbConnection = require('../database/config');


class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;

        /** Creamos un arreglo de las rutas */
        this.paths = {
            auth: '/assistapp/auth',
            rol: '/assistapp/rol',
            departamento: '/assistapp/departamento',
            ciudad: '/assistapp/ciudad',
            usuario: '/assistapp/usuario',
            nivel: '/assistapp/nivel',
            estado: '/assistapp/estado',
            emergencia: '/assistapp/emergencia',
            alerta: '/assistapp/alerta',
            upload: '/assistapp/upload',
            prueba: '/assistapp/geo'
        }


        /** Ejecutamos metodo de coneccion de base de datos */
        this.ConnectionDB();

        /** Ejecutamos metodo de middlewares */
        this.middleware();

        /** Ejecutamos el llamado a las rutas de la app */
        this.routes();


    }



    
    
    
    
    // Metodo Middleware
    middleware(){
        
        /** CONFIG CORS */
        this.app.use(cors());
        
        /** CONFIG PARA SERVIR LA CARPETA PUBLICA */
        this.app.use(express.static('public'));

        /** CONFIG PARA LECTURA Y PARSEO DEL BODY */
        this.app.use(express.json());

        //FileUploads
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        /** ruta auth */
        this.app.use(this.paths.auth, require('../routes/auth.routes'));

        /** ruta rol */
        this.app.use(this.paths.rol, require('../routes/rol.routes'));

        /** ruta departamento */
        this.app.use(this.paths.departamento, require('../routes/departamento.routes'));

        /** ruta ciudad */
        this.app.use(this.paths.ciudad, require('../routes/ciudad.routes'));

        /** ruta usuario */
        this.app.use(this.paths.usuario, require('../routes/usuario.routes'));

        /** ruta nivel */
        this.app.use(this.paths.nivel, require('../routes/nivel.routes'));

        /** ruta estado */
        this.app.use(this.paths.estado, require('../routes/estado.routes'));

        /** ruta emergencia */
        this.app.use(this.paths.emergencia, require('../routes/emergencia.routes'));

        /** ruta alerta */
        this.app.use(this.paths.alerta, require('../routes/alerta.routes'));

        /** ruta upload */
        this.app.use(this.paths.upload, require('../routes/upload.routes'));

        /** ruta geo PRUEBA */
        this.app.use(this.paths.prueba, require('../routes/geo.routes'));

    }
    
    
    // Metodo de coneccion de base de datos
    async ConnectionDB() {
        await dbConnection();
    }

    // Metodo de Listen para saber si esta online la bd
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo correctamente en el puerto: ${this.port}`);
        })
    }


}

module.exports = Server;