import {MongoClient } from "mongodb"

const uri = "mongodb://manab123:qwerty123@ac-neq9zbn-shard-00-00.hphb4ra.mongodb.net:27017,ac-neq9zbn-shard-00-01.hphb4ra.mongodb.net:27017,ac-neq9zbn-shard-00-02.hphb4ra.mongodb.net:27017/?ssl=true&replicaSet=atlas-eihh8b-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const db = client.db("test");
    const collection = db.collection("devices");

    // Return the client and collection to allow further operations
    return { client, collection };
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};

export default connectDB
