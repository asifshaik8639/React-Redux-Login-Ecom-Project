import express from 'express';
import { paymentController } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', paymentController.createOrder);

router.post('/pay-notification-web-hook', paymentController.paymentNotificationWebhook);

// router.get('/dashboard', authMiddleware.authenticate, authController.dashboard);

export const paymentRoutes = {
    router
}


