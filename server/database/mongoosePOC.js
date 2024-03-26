
import mongoose from 'mongoose';
import {config} from '../config.js';

// Database Connection
mongoose.connect(config.database.mongo_connection_Url);

// User model
const MongooseUser = mongoose.model('', {
    name: { type: String },
    age: { type: Number }
});

let new_user = new MongooseUser({
    name: 'Asif Shaik',
    age: 38
})

export const mongoosePOC = {
    new_user
}






