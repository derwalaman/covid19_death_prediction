# 🦠 COVID-19 Death Prediction Project
An advanced full-stack machine learning application that predicts COVID-19 death counts based on user-provided case data. Features a vibrant, futuristic UI with interactive data visualizations and multiple machine learning models for analysis.

---

## 🚀 Live Demo

🌐 [Frontend (Vercel)](https://covid19-death-prediction.vercel.app/)  
⚙️ [Backend (Railway)](https://covid19deathprediction-production.up.railway.app)

---

## 📁 Project Structure  

```
COVID19_DEATH_PREDICTION/  
├── frontend/ 
│   ├── app/
│   ├── components/
│   └── public/
├── backend/
│   ├── main.py
│   ├── model.py
│   ├── dataset/
│   └── requirements.txt
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js** (React Framework)
- **Tailwind CSS** for styling
- **Glassmorphism + Parallax + Animations** for a vibrant, futuristic UI
- **Dropdown-based Graph Selection** with preloaded images

### Backend
- **FastAPI** for ML model serving and graph generation
- **Pydantic** for input validation
- **Matplotlib** for EDA graph generation
- **Base64 encoding** for sending plot images

### Machine Learning
- Multiple ML algorithms (e.g., Linear Regression, Decision Tree, etc.)
- Trained on COVID-19 case data
- Single model used in production with saved weights (no runtime training)

---

## 📊 Dataset

- **Source**: [WHO COVID-19 Dataset](https://srhdpeuwpubsa.blob.core.windows.net/whdh/COVID/WHO-COVID-19-global-daily-data.csv)
- **Contains**: Country-wise data on cases, deaths.

---

## ✨ Features

- 🔮 Predict COVID-19 deaths from user input (cases, testing, etc.)
- 📊 Dynamic visualizations (EDA graphs) served via FastAPI
- 💡 Responsive and animated UI with dropdown-based navigation
- ⚡ Optimized performance with preloaded graphs
- 🎨 Glassmorphism effects and smooth transitions

---

## 🚀 How to Run

### Clone the repository:
```bash
git clone 'https://github.com/derwalaman/covid19_death_prediction.git'
cd "covid19_death_prediction"
```

### 📥 Installation
##### Frontend
```bash
cd frontend
npm install
npm run dev
```

##### Backened
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📡 API Endpoints
- POST /predict
Predict deaths based on features defined

- GET /generate_graph?index=0
Returns a base64-encoded EDA graph image (PNG) based on index.

---

## 📊 Visualization Graphs Include

- Deaths vs Cases
- Cases Over Time
- Cases Over Time
- Country wise visuations
- Correlation Heatmaps
- Boxplot of WHO region wise deaths over time
- Visualizations of Models used

---

## 🧠 Learnings & Goals

- Mastered machine learning algorithms from basics to advanced
- Built an end-to-end deployable ML product
- Hands-on with real-world data handling, EDA, and model interpretation
- Developed full-stack skills with modern frameworks and design principles
