import mysql from 'mysql';
import { config } from '../config.js';

const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + db.threadId);
});

export default db;