import { db } from "../connections/mongo.js";
import { createChatItem } from "../models/chat.js";

// data = {
//   owner,
//   text,
//   room
// }
export const saveChatItem = async (data) => {
  const chatItem = createChatItem(data.owner, data.text, data.room)
  const room = chatItem.room;
  const collection = db.collection(room);
  const item = {
    owner: chatItem.owner,
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

  // result = {
  //   owner,
  //   text,
  //   room,
  //   date
  // }
  return result;
}

// const item = chatItem("khello","arifin-syamsul");
// await saveChatItem(item);

// await getChatHistory("arifin-syamsul")
