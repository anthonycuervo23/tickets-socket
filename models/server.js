const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/socket.controller');

class Server {

    constructor(){

        this.app = express();

        this.port = process.env.PORT;

        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')( this.server );
        //PATHS
        this.paths = {}
        
        // Middlewares (funciones que se ejecutan cuando levantamos el servidor)
        this.middlewares();

        // Rutas de mi aplicaciones
         this.routes();

        //Sockets config
        this.sockets();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        //directorio publico 
        this.app.use(express.static('public'));

    }

    routes(){
        //JUST FOR REFERENCE
        //this.app.use(this.paths.auth, require('../routes/auth.route'));
    }

    sockets(){

        this.io.on('connection', socketController);

    }

    listen(){
        this.server.listen(this.port, ()=>{
            console.log('Server listening on port: ', this.port);
        });
    }

}

module.exports = Server;