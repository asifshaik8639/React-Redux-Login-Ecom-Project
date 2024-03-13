
import { MongoClient } from "mongodb";
import { config } from "../config.js"

 const getMongoClient = () => {
    const uri = config.database.mongo_connection_Url;
    // Create a new client and connect to MongoDB
    const client = new MongoClient(uri);
    return client;
}

export const mongoClient = {
    getMongoClient
}