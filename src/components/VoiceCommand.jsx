import { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import '../App.css';

const VoiceCommand = forwardRef(function VoiceCommand({ onhandleVoiceCommand, 
                                                        setIsListening, children }, ref) {
  const voiceCommandRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      startListening
    };
  }, []);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech API is not supported by your browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      console.log('speechResult ))))))))))))) ===>>> ', speechResult);
    //   setTranscript(speechResult);
      onhandleVoiceCommand(speechResult);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (<div ref={voiceCommandRef} >
            {children}
        </div>);
});

export default VoiceCommand;

