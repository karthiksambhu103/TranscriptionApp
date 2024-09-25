
import React from 'react';
import './App.css';
import Transcription from './components/Transcription';

function App() {
  console.log('Deepgram API Key:', process.env.REACT_APP_DEEPGRAM_API_KEY);

  return (
    <div className="App" >
      <h1 style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Audio Transcription App</h1>
      <Transcription />
      
    </div>
  );
}

export default App;
