import express from "express";
import hserver from "http";
import { Server } from "socket.io";
import { getChatHistory, saveChatItem } from "./services/chat.js";
import { createGroup, addGroupMember } from "./services/group.js";
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
  socket.once("init", async (room) => {
    const chatHistory = await getChatHistory(room);
    socket.emit("initReply", chatHistory);
  });

  // group = {
  //   name,
  //   memberIds=[]
  // }
  socket.once("create_group", async (group, creatorId) => {
    try {
      await createGroup(group.name);
    } catch (error) {
      console.log(error);
    }

    try {
      await addGroupMember(group.memberIds, group.name, creatorId);
    } catch (error) {
      console.log(error);
    }
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
