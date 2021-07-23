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

const Io = io.of("/");

Io.on("connection", (socket) => {
  console.log(socket.id, "connect to main socket");
  socket.on("someoneOffline", (id) => {
    /**
     * this function is for broadcasting when someone is offline
     * id: int
     */
    socket.broadcast.emit("someoneOffline", id);
  });
  socket.on("someoneOnline", (id) => {
    /**
     * this function is for broadcasting when someone is offline
     * id: int
     */
    socket.broadcast.emit("someoneOnline", id);
  });
  socket.on("messaging", (msg) => {
    /**
     * this function is for broadcasting when someone messaging
     * msg: json
     * {
     *  senderId: int,
     *  receiverId: int,
     *  id: int,
     *  text: string
     * }
     */
    socket.broadcast.emit("messaging", msg);
  });

  socket.on("someoneReadMessage", (msg) => {
    /**
     * broadcast "someoneReadMessage"
     * msg: json
     * {
     *  senderId: int,
     *  receiverId: int,
     *  text: int,
     *  id: int
     *  isRead: bool
     * }
     */
    socket.broadcast.emit("someoneReadMessage", msg);
  });

  socket.on("someoneBulkReadMessage", (msg) => {
    socket.broadcast.emit("someoneBulkReadMessage", msg);
  });

  socket.on("disconnect", () => {
    /**
     * notify when disconnet
     */
    console.log(socket.id, "disconnect from main socket");
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
  console.log("server start");
});
