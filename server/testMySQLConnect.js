import mysql from 'mysql2';
import { config } from '../server/config.js';

// Create connection
const connection = mysql.createConnection({
  host: config.mySQLDatabase.host,
  user: config.mySQLDatabase.user,
  password: config.mySQLDatabase.password,
  database: config.mySQLDatabase.database
});

// Use connection
connection.query('SELECT * FROM user_profile limit 10', (err, results, fields) => {
  if (err) throw err;
  console.log('connected and the results are =>', results);
});

// Close connection
connection.end();
