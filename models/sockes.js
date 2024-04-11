
class Sockets {

  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // Escuchando event
    this.io.on("connection", (socket) => {
      socket.on("msg-client", (data) => {
        console.log(data);
        // Emitiendo
        this.io.emit("msg-server", data);
      });
    });
  }
}

module.exports = Sockets;
