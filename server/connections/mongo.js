// import MongoClient from "mongodb";
const { MongoClient } = require("mongodb");

const mongouri = process.env.MONGO_URI;

const connect = async (dbName) => {
  const client = await MongoClient(mongouri);
  return client.db(dbName);
};
// const db = await connect("chat");

module.exports = {
  connect,
};

// console.log(await connect("chat"));
// MongoClient(mongouri, (error, client) => {
//   if (error) {
//     console.log("error connecting to database");
//     console.log(error);
//   }
//   let db = client.db(dbName);
//   export default db;
// });
