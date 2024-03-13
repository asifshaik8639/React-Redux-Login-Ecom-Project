import express from 'express';
import { authController } from '../controllers/authController.js';
import {authOTPController} from '../controllers/authOTPController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authController.login);

router.post('/verify-otp', authOTPController.verifyOTP);

router.post('/send-otp-with-twilio', authOTPController.sendOTPWithTwilio);

router.get('/dashboard', authMiddleware.authenticate, authController.dashboard);

export const authRoutes = {
    router
}