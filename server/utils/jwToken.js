import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, config.server.jwtSecret, { expiresIn: '1h' });
};

//Secret key random Generator functionality. One generated,save/store/assgin
// to env secret variable
const jwtSecretKey = crypto.randomBytes(32).toString('hex');
console.log(jwtSecretKey);

export const jwToken = {
    generateToken,
    jwtSecretKey
}
  