
# 🧍‍♂️ Posture Detection App

A full-stack AI-powered **Posture Analysis App** built with **React**, **Flask**, and **MediaPipe**. It evaluates human posture from **video uploads** or **webcam feed** using rule-based analysis on body landmarks.

---

## 🔧 Features

- ✅ **Video Upload** for offline posture analysis  
- 🎥 **Live Webcam Mode** for real-time feedback  
- 🧠 **Rule-Based Posture Scoring** (Good/Bad frames)  
- 📊 **Posture Statistics** (Total Frames, Good, Bad, Score %)  
- 🖼️ **Visual Feedback per Frame** (landmarks + labels)  
- 💻 Full browser/device compatibility fallback  
- ⚡ Optimized for **low-latency analysis** using MediaPipe  

---

## 🧱 Tech Stack

| Frontend        | Backend     | AI/Posture Engine |
|----------------|-------------|-------------------|
| React.js        | Flask (Python) | MediaPipe + OpenCV |
| HTML5/CSS       | Flask-SocketIO | Numpy + Custom Angle Logic |
| JavaScript      | CORS, Tempfiles | Pose Landmark Angles |

---

## 📂 Project Structure

```
posture-app/
│
├── backend/
│   ├── app.py                     # Flask app with /analyze route
│   ├── utils.py                   # angle calculation, frame encoding
│   └── requirements.txt           # Flask, opencv-python, mediapipe
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VideoUpload.js     # Upload & analyze video
│   │   │   ├── WebcamCapture.js   # Live webcam detection
│   └── public/                    # index.html, favicon
│
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/posture-detection-app
cd posture-detection-app
```

### 2️⃣ Backend Setup (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt
python app.py
```

### 3️⃣ Frontend Setup (React)

```bash
cd ../frontend
npm install
npm start
```

---

## 📡 Flask API Endpoint

### `POST /analyze`

- Accepts: video file (`multipart/form-data`)
- Returns: posture score, frame-wise feedback, base64 images

```json
{
  "total_frames": 120,
  "good_posture_frames": 90,
  "bad_posture_frames": 30,
  "posture_score": 75.0,
  "message": "⚠️ Fix your posture!",
  "frames": [
    {
      "frame": "data:image/jpeg;base64,...",
      "feedback": "✅ Good posture"
    }
  ]
}
```

---

## 🤖 Posture Rules (Sitting + Squatting)

| Condition        | Bad Posture Trigger |
|------------------|---------------------|
| Sitting          | Back angle < 150° OR Neck angle < 150° |
| Squatting        | Back angle < 150° OR Knee goes past ankle |

Landmarks used: shoulders, hips, knees, ankles, nose.

---

## 📸 Sample Output

- Landmarks rendered on each frame  
- Good posture: ✅ label  
- Bad posture: ⚠️ label  
- Stats shown after upload or session ends  

---

## 🛡️ Browser Support

- Live webcam mode uses `navigator.mediaDevices.getUserMedia()`  
- Fallback handled if browser doesn’t support webcam  

---

## 📌 To-Do (Optional)

- [ ] Add repetition counter for squats  
- [ ] Export session report (PDF/CSV)  
- [ ] User login & posture history  
- [ ] Add neck/shoulder hunch detection in real-time  

---

## 💬 Feedback

Got posture? Drop your thoughts or open a PR 🛠️  
Or just... sit straight.

---

## 📝 License

MIT License © 2025 – *Your Name*
