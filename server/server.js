import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRoutes } from './routes/authRoutes.js';
import { config } from './config.js';


const app = express();
const PORT = config.server.port ||  3001;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5173', // Add your allowed origin(s)
    credentials: false // If you're using credentials (cookies, headers, etc.)
  }));

// Connect routes
app.use('/auth', authRoutes.router);

app.listen(PORT, '127.0.0.1', 'localhost',  () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
  });


  