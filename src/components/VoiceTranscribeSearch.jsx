import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalSearchText } from '../redux/features/commonSlice';
import axios from 'axios';

const VoiceTranscribeSearch = forwardRef(function VoiceTranscribeSearch(props, ref) {
  const [audioBlob, setAudioBlob] = useState(null);
  const dispatch = useDispatch();


  let mediaRecorder;
  let audioChunks = [];

  const voiceSearchRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      onVoiceStartRecordingHandler,
      onVoiceStopRecordingHandler,
      uploadAudio,
      checkTranscriptionStatus
    };
  }, []);

  const checkTranscriptionStatus = async (jobName) => {
    let interval;
    if(!!jobName && jobName !== '') {
      interval = setInterval(async () => {
        const response = await axios.get(`https://35.154.88.150:3007/api/v1/voice-search/get-transcription/${jobName}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        console.log('response *** from checkTranscriptionStatus => ', response);
        if (response?.data?.status === 'COMPLETED' || response?.status === 'COMPLETED') {
          console.log('checkTranscriptionStatus success ** *********:', response.data.data.results.transcripts[0].transcript);
          const transcriptText = response.data.data.results.transcripts[0].transcript;
          // To translate to lower case and cleaning up the specail characters 
          dispatch(setGlobalSearchText(transcriptText.toLowerCase().replace(/[^\w\s]/gi, '')));
          // setTranscription(response.data.results.transcripts[0].transcript);
          clearInterval(interval);
        } else if(response?.data?.status === 'FAILED' || response?.status === 'FAILED') {
          clearInterval(interval);
        }
      }, 5000);
    } else {
      !!interval && clearInterval(interval);
    }

  };

  const uploadAudio = async () => {
    console.log('in  uploadAudio async call ');
    const formData = new FormData();
    formData.append('file', audioBlob);

    const response = await fetch('https://35.154.88.150:3007/api/v1/voice-search/upload-audio', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    console.log('Transcription asif success:', result);
    console.log('Transcription asif success:', result.jobName);

    if(!!result) {
      if(!!result?.message) {
          if(!result?.message?.includes('The input file that you provided is empty.')
            && !!result?.jobName ) {
            checkTranscriptionStatus(result.jobName);
          }
      }

      if(!!result?.jobName) {
        checkTranscriptionStatus(result.jobName);
      }
    }
    // Perform search with result.transcription
  };

  const onVoiceStartRecordingHandler = async (event) => {
    // playSound(recordingStartedSound);
    console.log('in  onVoiceStartRecordingHandler **** ', event);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      console.log('pushing the audio chunks ');
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      setAudioBlob(audioBlob);
      audioChunks = [];
      console.log('in  mediaRecorder onstop ');
    };

    mediaRecorder.start();
  };

  const onVoiceStopRecordingHandler = (event) => {
    console.log('in  onVoiceStopRecordingHandler **** ',event);
    // playSound(recordingEndedSound);
    if(!!mediaRecorder) {
      console.log('before mediaRecorder stop ');
      mediaRecorder.stop();
    }
    console.log('audioBlob in  onVoiceStopRecordingHandler **** ', audioBlob);
    if(!!audioBlob) {
      console.log('before upload audio ');
      uploadAudio();
    }
  };

  return (<div {...props} ref={voiceSearchRef} ></div>)
});

export default VoiceTranscribeSearch;