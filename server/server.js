import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRoutes } from './routes/authRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import { paymentRoutes } from './routes/paymentRoutes.js';
import { voiceSearchRoutes } from './routes/voiceSearchRoutes.js'; 
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
    origin: 'http://35.154.88.150:5173', // Add your allowed origin(s)
    credentials: true // If you're using credentials (cookies, headers, etc.)
}));
// Use Morgan to log requests in 'combined' format
app.use(morgan('combined'));

// Connect routes
app.use('/api/v1/auth', authRoutes.router);

app.use('/api/v1/user', userRoutes.router);

app.use('/api/v1/payment', paymentRoutes.router);

app.use('/api/v1/voice-search', voiceSearchRoutes.router);

app.listen(PORT, '0.0.0.0', '35.154.88.150', '127.0.0.1', 'localhost',  () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});


  
