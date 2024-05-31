import express from 'express';
import {voiceController} from '../controllers/voiceController.js';
import multer from 'multer';
// import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
//authMiddleware.authenticate,

router.post('/upload-audio', upload.single('file'), voiceController.uploadAudioData);

router.get('/get-transcription/:jobName', voiceController.getTranscriptionByJobName);

export const voiceSearchRoutes = {
    router
}