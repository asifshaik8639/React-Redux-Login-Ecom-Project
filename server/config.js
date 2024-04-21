// config.js
// Server Configuration
import { loadEnv } from './utils/loadEnv.js';

if (loadEnv?.result?.error) {
  console.error(' Error loading .env file in config :', result.error);
} else {
  console.log('.env file loaded successfully in config');
}

const server = {
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  jwtSecret: process.env.JWT_SECRET
};

// Database Configuration
const database = {
  mongo_connection_Url: process.env.MONGO_DB_CONNECTION_URL,
  name: process.env.MONGO_TEST_DB_NAME,
  collectionName: process.env.MONGO_DB_SAMPLE_TEST_COLLECTION_NAME,
  cust_order_payment_details: process.env.MONGO_DB_CUSTOMER_ORDER_AND_PAYMENT_DETAILS
};


//OTP Configuration with Twilio
const twilio = {
    //Register with Twilio and Replace with the original accountSid, authToken, twilioPhone, userPhone
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken:  process.env.TWILIO_AUTH_TOKEN,
    twilioPhone: process.env.TWILIO_TWILIO_PHONE,
    userPhone: process.env.TWILIO_USER_PHONE // Replace with the user's phone number
};

const mySQLDatabase = {
 host: process.env.MY_SQL_DATABASE_HOST,
 user: process.env.MY_SQL_DATABASE_USER ,
 password: process.env.MY_SQL_DATABASE_PASSWORD, 
 database: process.env.MY_SQL_TEST_DATABASE_NAME,
};

const razorPaymentGateway = {
  key_id: process.env.RAZOR_PAYMENT_GATE_WAY_KEY_ID,
  key_secret: process.env.RAZOR_PAYMENT_GATE_WAY_KEY_SECRET,
  web_hook_secret: process.env.RAZOR_PAYMENT_GATE_WAY_WEB_HOOK_SECRET,
  order_reciept_id: process.env.RAZOR_PAYMENT_GATE_WAY_SAMPLE_ORDER_RECIEPT_ID
};

const loginDoc = {
  title: process.env.TITLE,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  hash_test_title: process.env.HASH_TEST_TITLE
};


// Exporting Configuration
export const config = {
  server,
  database,
  twilio,
  mySQLDatabase,
  razorPaymentGateway,
  loginDoc
  // Other Configuration Parameters...
};