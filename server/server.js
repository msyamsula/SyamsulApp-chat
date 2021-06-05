import express from "express";
import hserver from "http";
import { Server } from "socket.io";
import { getChatHistory, saveChatItem } from "./services/chat.js";
import {createGroup, getAllMyGroup} from "./controllers/group.js"
import { authenticateJWT } from "./utility/jwt.js";
import bodyParser from "body-parser"
const app = express();

// http api
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.post("/group", authenticateJWT, createGroup)
app.get("/group", authenticateJWT, getAllMyGroup)

// socket io
const httpServer = hserver.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CHAT_CLIENT,
    methods: ["GET", "POST", "POST", "DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.once("init", async (room) => {
    const chatHistory = await getChatHistory(room);
    socket.emit("initReply", chatHistory);
  });

  // msg = {
  //   owner,
  //   text,
  //   room
  // }
  socket.on("messaging", async (msg) => {
    try {
      await saveChatItem(msg);
      socket.broadcast.emit(msg.room, msg);
    } catch (error) {
      console.log(error);
    }
  });
});

httpServer.listen(process.env.CHAT_BACKEND_PORT, () => {
  console.log("server start");
});
