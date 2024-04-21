import  { userModel }  from '../models/userModel.js';

import { config } from '../config.js';
import { client } from '../database/mongoClientConnect.js';
import bcrypt from 'bcrypt';
import { jwToken } from '../utils/jwToken.js';
import { mongoClient } from '../utils/mongoClient.js';


const mongoDBConnect = async () => {
  try {
    const resClient =  mongoClient.getMongoClient();
    // Connect to the "insertDB" database and access its "haiku" collection
    const dbName = config.database.name;  
    const collectionName = config.database.collectionName;
    const database =  resClient.db(dbName);
    const collection =  database.collection(collectionName);

    // Create a document to insert
    const doc = {
      title: config.loginDoc.title,
      username: config.loginDoc.username,
      password: config.loginDoc.password
    }
    // Insert the defined document into the "sample test" collection
    const result = await collection.insertOne(doc);
    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id : ${result.insertedId}`);
  } finally {
     // Close the MongoDB client connection
    await client.close();
  }
};

const verifyandGetUserCredentials = async (username) => {
    try {
      const mongoDBClient =  mongoClient.getMongoClient();

      const dbName =  config.database.name;
      const collectionName = config.database.collectionName;
      // Get the database and collection on which to run the operation
      const database = mongoDBClient.db(dbName);
      const mongoCollection = database.collection(collectionName);

      console.log('username entered is => ',username);

      const query = { title: config.loginDoc.hash_test_title, username: username };
      const options = {
        // Include _id,  `title`, username and `hashPassword` fields in the returned document
        projection: { _id: 1, title: 1, username: 1, hashPassword:1 },
      };
      // Execute query
      const userCredentials = await mongoCollection.findOne(query, options);
      // Print the document returned by findOne()
      console.log(' response on hash credentials from DB' , userCredentials);

      return userCredentials;
    } catch (error) {
      console.error('verifyandGetUserCredentials failed:', error.message);
    } finally {
      await client.close();
    }
}

const createUserWithHashSalt = async(username, password) => {
  try {
    // Generate a random salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hash = await bcrypt.hash(password, salt);

    const resClient =  mongoClient.getMongoClient();

    const dbName =  config.database.name;
    const collectionName = config.database.collectionName;

    const database =  resClient.db(dbName);
    const collection =  database.collection(collectionName);

    // Create a document to insert with the hashed password and salt
    const doc = {
      title: config.loginDoc.title,
      username: username,
      hashPassword: hash
    }
    // Insert the defined document into the "haiku" collection
    const result = await collection.insertOne(doc);
    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id : ${result.insertedId}`);
    console.log('User created with hash password successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
        console.log('in login handler with username ', username);
        console.log('in login handler with password ', password);
        const userCredentials = await verifyandGetUserCredentials(username);
       // console.log('userCredentials from verifyandGetUserDetails', userCredentials);

        if (userCredentials) {
              // User found, now verify the password with the stored salt
              const isPasswordValid = await bcrypt.compare(
                password,//enterd password from client side
                userCredentials.hashPassword, // Stored hashed password
              );

              if (isPasswordValid) {
                  console.log('Login successful, so can generate Token!');
                  const token =  jwToken.generateToken(userCredentials);
                  console.error('Login success with hash password check and Generated JWT Token is :', token);
                  res.status(200).json({ userCredentials, token });
                  return;
              } else {
                  console.log('Incorrect password');
                  res.status(401).json({ error: 'Invalid credentials' });
                  return;
              }
        } else {
              console.log('User not found');
              res.status(404).json({ error: 'User not found' });
              return;
        }
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
};

const dashboard = (req, res) => {
  res.status(200).json({ message: 'Dashboard', user: req.user });
};

export const authController = {
  login, dashboard
};
