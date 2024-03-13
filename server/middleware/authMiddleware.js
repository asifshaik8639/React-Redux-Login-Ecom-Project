import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const authenticate = (req, res, next) => {

  console.log('req from authenticate method in authMiddleware => ', req);

  const token = req.headers.authorization?.split(' ')[1];

  console.log('token from authenticate method in authMiddleware => ', token);

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, config.server.jwtSecret);
    console.log('userd from decodedToken in authMiddleware => ', decodedToken.userId);
    req.user = { userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const authMiddleware = {
  authenticate
};

