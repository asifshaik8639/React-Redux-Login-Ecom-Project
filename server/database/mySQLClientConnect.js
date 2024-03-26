import mysql from 'mysql';
import { config } from '../config.js';

const db = mysql.createConnection({
  host: config.mySQLDatabase.host,
  user: config.mySQLDatabase.user,
  password: config.mySQLDatabase.password,
  database: config.mySQLDatabase.database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + db.threadId);
});

export default db;
