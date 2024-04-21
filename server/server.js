import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRoutes } from './routes/authRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import { paymentRoutes } from './routes/paymentRoutes.js'; 
import { config } from './config.js';
import {loadEnv} from './utils/loadEnv.js';

if (loadEnv?.result?.error) {
  console.error(' Error loading .env file in server :', result.error);
} else {
  console.log('.env file loaded successfully in server');
}

const app = express();
const PORT = config.server.port ||  3007;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://54.91.251.198:5173', // Add your allowed origin(s)
    credentials: true // If you're using credentials (cookies, headers, etc.)
}));

// Connect routes
app.use('/auth', authRoutes.router);

app.use('/user', userRoutes.router);

app.use('/payment', paymentRoutes.router);

app.listen(PORT, '0.0.0.0', '54.91.251.198', 'localhost',  () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});


  
