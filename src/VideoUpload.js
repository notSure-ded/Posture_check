import React, { useState } from 'react';

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [framesData, setFramesData] = useState([]);

  const handleUpload = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append('video', videoFile);

    setFeedback('⏳ Processing...');
    setFramesData([]);

    try {
      const res = await fetch('http://localhost:5000/analyze_frames', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setFramesData(data);
        setFeedback(`✅ Processed ${data.length} frames`);
      } else {
        setFeedback('❌ Unexpected response format');
      }

    } catch (err) {
      setFeedback('❌ Failed to analyze video.');
    }
  };

  return (
    <div>
      <h2>📹 Upload Video for Posture Analysis</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Analyze</button>

      <p>{feedback}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {framesData.map((frame, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img
              src={frame.frame}
              alt={`Frame ${index}`}
              style={{ width: '240px', border: '2px solid #ccc' }}
            />
            <p style={{ textAlign: 'center' }}>{frame.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoUpload;
