import mysql from 'mysql2';
//import { Config } from '';

// Create connection
const connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

// Use connection
connection.query('SELECT * FROM user_profile limit 10', (err, results, fields) => {
  if (err) throw err;
  console.log('connected and the results are =>', results);
});

// Close connection
connection.end();
