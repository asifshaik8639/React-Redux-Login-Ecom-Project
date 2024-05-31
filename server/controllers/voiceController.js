import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { loadEnv } from '../utils/loadEnv.js';
import axios from 'axios';

const app = express();
const upload = multer({ dest: 'uploads/' });

if (loadEnv?.result?.error) {
  console.error(' Error loading .env file in voice controller :', result.error);
} else {
  console.log('.env file loaded successfully in voice controller');
}

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION_NAME
});

AWS.config.logger = console;

const transcribeService = new AWS.TranscribeService();
const s3 = new AWS.S3();


const uploadAudioData = async (req, res) => {

    const fileContent = fs.readFileSync(req.file.path);

    const s3Params = {
        Bucket: process.env.AWS_VOICE_SEARCH_INPUT_BUCKET,
        Key: path.basename(req.file.path),
        Body: fileContent,
    };

    try {
        const s3Data = await s3.upload(s3Params).promise();
        const transcribeParams = {
          LanguageCode: 'en-US',
          Media: { MediaFileUri: s3Data.Location },
          TranscriptionJobName: `transcription-${Date.now()}`,
          OutputBucketName: process.env.AWS_VOICE_SEARCH_OUTPUT_BUCKET,
        };
    
        const transcribeData = await transcribeService.startTranscriptionJob(transcribeParams).promise();
        console.log('uploadAudioData 4 => ', transcribeData);
        res.status(200).send({ jobName: transcribeData.TranscriptionJob.TranscriptionJobName });
      } catch (err) {
        console.error('uploadAudioData 5 server catch error => ', err);
        res.status(500).send(err);
    }

};

const getTranscriptionByJobName = async (req, res) => {
  const params = { TranscriptionJobName: req.params.jobName };
  // console.log('in getTranscriptionByJobName 0 => ',params);

  try {
    const data = await transcribeService.getTranscriptionJob(params).promise();
    if (data.TranscriptionJob.TranscriptionJobStatus === 'COMPLETED') {
      const resultUrl = data.TranscriptionJob.Transcript.TranscriptFileUri;
      const result = await axios.get(resultUrl);  
      console.log('in getTranscriptionByJobName success final => ',result.data);
      res.status(200).send({status: data.TranscriptionJob.TranscriptionJobStatus, 
                            data: result.data});
    } else if (data.TranscriptionJob.TranscriptionJobStatus === 'FAILED') {
        console.log('Transcription job failed:', data.TranscriptionJob.FailureReason);
        res.status(200).send({ status: data.TranscriptionJob.TranscriptionJobStatus,
                               reason: data.TranscriptionJob.FailureReason});
    } else {
      console.log('in getTranscriptionByJobName status  => ',data.TranscriptionJob.TranscriptionJobStatus);
      res.status(200).send({ status: data.TranscriptionJob.TranscriptionJobStatus });
    }
  } catch (err) {
    console.error('getTranscriptionByJobName catch error => ', err);
    res.status(500).send(err);
  }
};

export const voiceController = {
    uploadAudioData,
    getTranscriptionByJobName
};