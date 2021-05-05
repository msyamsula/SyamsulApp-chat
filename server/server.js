import express, { text } from "express";
import { db } from "./connections/mongo.js";
import hserver from "http";
import { Server } from "socket.io";
import { getChatHistory, saveChatItem } from "./services/chat.js";
const app = express();
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
  socket.once("init", async (room)=>{
    const chatHistory = await getChatHistory(room)
    socket.emit("initReply", chatHistory)
  })

  socket.on("messaging", async (msg) => {
    await saveChatItem(msg)
    socket.broadcast.emit(msg.room, msg.text);
  });
});

httpServer.listen(process.env.CHAT_BACKEND_PORT, () => {
  console.log("server start");
});
