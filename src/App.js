// src/App.js
import React, { useState } from 'react';
import VideoUpload from './VideoUpload';
import WebcamCapture from './WebcamCapture';
import './App.css';

function App() {
  const [mode, setMode] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🧍 Posture Checker</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setMode('video')}>📤 Upload Video</button>
        <button onClick={() => setMode('webcam')}>🎥 Use Webcam</button>
      </div>

      {mode === 'video' && (
        <VideoUpload setFeedback={setFeedback} setAnalysis={setAnalysis} />
      )}

      {mode === 'webcam' && (
        <WebcamCapture setFeedback={setFeedback} setAnalysis={setAnalysis} />
      )}

      {feedback && <div style={{ color: 'red', marginTop: '1rem' }}>{feedback}</div>}

      {analysis && (
        <div style={{ marginTop: '2rem', background: '#f0f0f0', padding: '1rem' }}>
          <h3>{analysis.message}</h3>
          <p><strong>Total Frames:</strong> {analysis.total_frames}</p>
          <p><strong>Good Posture Frames:</strong> {analysis.good_posture_frames}</p>
          <p><strong>Bad Posture Frames:</strong> {analysis.bad_posture_frames}</p>
          <p><strong>Posture Score:</strong> {analysis.posture_score}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
