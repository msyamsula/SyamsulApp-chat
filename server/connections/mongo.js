import MongoClient from "mongodb";

const mongouri = process.env.MONGO_URI;

let connect = async (dbName) => {
  let client = await MongoClient(mongouri);
  return client.db(dbName);
};

export let db = await connect("chat")

// console.log(await connect("chat"));
// MongoClient(mongouri, (error, client) => {
//   if (error) {
//     console.log("error connecting to database");
//     console.log(error);
//   }
//   let db = client.db(dbName);
//   export default db;
// });
