import {config} from '../config.js'; //   ./config.js';

const dbMongooseConnect = async () => {

    await mongoose.connect(config.database.mongo_connection_Url);
    // User model
    const MongooseUser = mongoose.model('Sample_Test_Collection', {
        name: { type: String },
        age: { type: Number }
    });
  
    let new_user = new MongooseUser({
        name: 'Asif Shaik',
        age: 38
    })
  
    const result = await new_user.save();
    console.log('dbMongooseConnect result => ', result);
  
  };

  export const mongooseClient = {
    dbMongooseConnect
  }