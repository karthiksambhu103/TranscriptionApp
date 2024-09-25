
import React, { useState } from 'react';
import Microphone from './Microphone';

const Transcription = () => {
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTranscription = async (audioBlob) => {
    // 64f1262251df26b62a5de388ad2831933e4b21d0
    const apiKey=process.env.REACT_APP_DEEPGRAM_API_KEY;

    try {
      const response = await fetch('https://api.deepgram.com/v1/listen', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'audio/wav',
        },
        body: audioBlob, 
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.results && data.results.channels[0].alternatives[0].transcript) {
          setTranscript(data.results.channels[0].alternatives[0].transcript);
        } else {
          setErrorMessage('No transcript found.');
        }
      } else {
        setErrorMessage('Error with transcription service.');
      }
    } catch (error) {
      console.error('Transcription error:', error);
      setErrorMessage('There was an error with the transcription service.');
    }
  };

  return (
    <div>
      
      
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="transcript-box">
        <p>{transcript}</p>
      </div>
      <Microphone handleTranscription={handleTranscription} />
    </div>
  );
};

export default Transcription;
