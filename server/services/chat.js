const { db } = require("../connections/mongo.js");
const { createChatItem } = require("../models/chat.js");

// data = {
//   owner,
//   text,
//   room
// }
const saveChatItem = async (data) => {
  const chatItem = createChatItem(data.owner, data.text, data.room);
  const room = chatItem.room;
  const collection = db.collection(room);
  const item = {
    owner: chatItem.owner,
    text: chatItem.text,
    createdAt: chatItem.createdAt,
  };
  await collection.insertOne(item);
};

const getChatHistory = async (room) => {
  const collection = db.collection(room);
  const sort = { createdAt: 1 };
  const limit = 100;
  let cursor = await collection.find().sort(sort).limit(limit);
  let result = [];
  await cursor.forEach((e) => {
    result.push(e);
  });

  // result = {
  //   owner,
  //   text,
  //   room,
  //   date
  // }
  return result;
};

module.exports = {
  saveChatItem,
  getChatHistory,
};

// const item = chatItem("khello","arifin-syamsul");
// await saveChatItem(item);

// await getChatHistory("arifin-syamsul")
