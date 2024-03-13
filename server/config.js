// config.js
// Server Configuration
const server = {
  port: process.env.PORT || 3001,
  secretKey: process.env.SECRET_KEY || 'your-secret-key-here',
  jwtSecret: process.env.JWT_SECRET || ''
};

// Database Configuration
const database = {
  mongo_connection_Url: '',
  name: '',
};

//OTP Configuration with Twilio
const twilio = {
  //Register with Twilip and Replace with the original accountSid, authToken, twilioPhone, userPhone
 accountSid: '',
 authToken:  '',
 twilioPhone: '',
 userPhone:  '' // Replace with the user's phone number
}

// Exporting Configuration
export const config = {
  server,
  database,
  twilio
  // Other Configuration Parameters...
};



  