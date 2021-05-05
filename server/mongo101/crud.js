import {db} from "../connections/mongo.js"
const collection = db.collection("test")

// insert
const book = {
    "name": "harry potter",
    "page": 500,
    "authors": ["jk", "rowling"]
}

let result = await collection.insertOne(book)

// get all
result = await collection.find(book)

// get with query
let query = {"name": "harry potter"}
result = await collection.find(query)

// get sort limit
let sort = {"_id": -1}
result = await collection.find(query).sort(sort).limit(5)
await result.forEach(console.dir)


