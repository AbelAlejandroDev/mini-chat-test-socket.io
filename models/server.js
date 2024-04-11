// Server Express
const express     = require("express");
const http        = require("http");
const socketio    = require("socket.io");
const path        = require("path");
const cors        = require("cors")



const Sockets     = require("./sockes");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http
    this.server = http.createServer(this.app);

    // Config socket
    this.io = socketio(this.server, {
      /*config*/
    });
  }

  middlewares() {
    // Directorio public
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // cors - todos los origenes
    this.app.use(cors())
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Init middlewares
    this.middlewares();
    // Init sockets
    this.configSockets();

    // Init server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
