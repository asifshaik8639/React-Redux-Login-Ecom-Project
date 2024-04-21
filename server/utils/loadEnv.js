
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Convert file URL to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to your .env file
const envFilePath = path.resolve(__dirname, '../../.env');

// Load environment variables from the specified file
const result = dotenv.config({ path: envFilePath });

// Exporting Configuration
export const loadEnv = {
    result 
    // Other Configuration Parameters...
};