import express from 'express';
import {userController} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
//authMiddleware.authenticate,

router.get('/userprofile/:id', userController.getUserProfileData);

export const userRoutes = {
    router
}