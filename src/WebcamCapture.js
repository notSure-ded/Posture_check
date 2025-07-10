import React, { useRef, useState } from 'react';

const WebcamCapture = ({ setFeedback, setAnalysis }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [framesData, setFramesData] = useState([]);
 const [feedback, _] = useState(); 

  const [stream, setStream] = useState(null)

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setRecording(true);

      const options = { mimeType: 'video/webm' };
      const recordedChunks = [];
      const mediaRecorder = new MediaRecorder(mediaStream, options);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const formData = new FormData();
        formData.append('video', blob, 'webcam_video.webm');

        try {
          setFeedback('⏳ Analyzing your posture...');
          setFramesData([]);

          const res = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            body: formData
          });

          const data = await res.json();

          if (data.error) {
            setFeedback(`❌ ${data.error}`);
            return;
          }

          setAnalysis({
            total_frames: data.total_frames,
            good_posture_frames: data.good_posture_frames,
            bad_posture_frames: data.bad_posture_frames,
            posture_score: data.posture_score,
            message: data.message
          });

          setFramesData(data.frames || []);
          setFeedback(`✅ Processed ${data.frames?.length || 0} frames`);
        } catch (err) {
          console.error('Upload failed:', err);
          setFeedback('❌ Failed to analyze video.');
        }

        // Stop webcam
        mediaStream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (err) {
      console.error('Webcam access error:', err);
      setFeedback('❌ Could not access webcam.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <h2>🎥 Record with Webcam</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: '480px', border: '1px solid black', marginBottom: '1rem' }}
      />

      <div>
        {!recording ? (
          <button onClick={startRecording}>🎬 Start Recording</button>
        ) : (
          <button onClick={stopRecording}>⏹ Stop & Analyze</button>
        )}
      </div>

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

export default WebcamCapture;
