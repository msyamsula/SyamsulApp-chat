import { db } from "../connections/mongo.js";
import { createChatItem } from "../models/chat.js";


export const saveChatItem = async (data) => {
  const chatItem = createChatItem(data.text, data.room)
  const room = chatItem.room;
  const collection = db.collection(room);
  const item = {
    text: chatItem.text,
    createdAt: chatItem.createdAt,
  };
  await collection.insertOne(item);
};

export const getChatHistory = async (room) => {
  const collection = db.collection(room)
  const sort = {"createdAt": 1}
  const limit = 100
  let cursor = await collection.find().sort(sort).limit(limit)
  let result = []
  await cursor.forEach(e => {
    result.push(e)
  })

  // console.log(result);
  return result;
}

// const item = chatItem("khello","arifin-syamsul");
// await saveChatItem(item);

// await getChatHistory("arifin-syamsul")
