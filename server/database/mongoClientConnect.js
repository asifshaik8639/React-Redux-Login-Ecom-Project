
import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from '../config.js';
const uri = config.database.mongo_connection_Url;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});