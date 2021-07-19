const express = require("express");
const hserver = require("http");
const { Server } = require("socket.io");
const app = express();

// socket io
const httpServer = hserver.createServer(app);
const socketOptions = {
  allowEIO3: true,
  // path: "/my-path/",
  cors: {
    origin: process.env.CLIENT,
    methods: ["GET", "POST", "POST", "DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
};
const io = new Server(httpServer, socketOptions);

io.on("connection", (socket) => {
  socket.on("messaging", async (msg) => {
    /**
     * this function is for accepting "messaging" event from client
     * msg is in format
     * {
     *    senderId: id,
     *    receiverId: id,
     *    text: str
     * }
     *
     * then broadcast it with event name = "messageFor{id}" which will be caught
     * by other person
     */
    let eventName = `messageFor${msg.receiverId}`;
    socket.broadcast.emit(eventName, msg);
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
  console.log("server start");
});
