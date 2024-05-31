import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Check if the browser supports the Web Speech API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (recognition) {
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        setTranscript(finalTranscript || interimTranscript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [recognition]);

  const handleStartStop = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div>
      <button onClick={handleStartStop}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default Chat;
