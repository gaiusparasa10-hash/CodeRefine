# CodeRefine 🚀 — AI-Powered Code Review & Optimization Platform

A clean, efficient, full-stack developer tool that leverages **FastAPI**, **React.js**, **PostgreSQL**, and **Groq AI (Llama 3.3 70B)** to analyze source code for bugs, security vulnerabilities, performance bottlenecks, and maintainability issues.

---

## 📌 Overview

**CodeRefine** assists developers and students by providing automated code reviews and code rewrites. Users can select from 19 programming languages, paste their code, and receive instant structured reviews categorized by severity (*Critical*, *High*, *Medium*, *Low*), along with line-by-line explanations, suggested fixes, and runnable optimized code.

The project features a lightweight **React.js** frontend with **Vite** and **TailwindCSS**, communicating asynchronously via RESTful endpoints to a **FastAPI** Python backend connected to **PostgreSQL**.

---

## ✨ Key Features

* ⚡ **AI Code Review**: Analyzes code snippets across 19 languages for bugs, algorithm issues, and security risks.
* ✨ **AI Code Rewrite**: Refactors code to improve readability, maintainability, and complexity while preserving functionality.
* 📊 **Severity Breakdown & Analytics**: Displays issue counts by severity with interactive distribution charts (`recharts`).
* 📄 **PDF Export**: Generates downloadable PDF review reports for offline sharing (`jspdf` / `html2canvas`).
* 📜 **Review History**: Automatically saves analysis logs into PostgreSQL and displays past reviews chronologically.
* 🔐 **User Authentication**: Secure user sign-in and registration using JWT authentication tokens.

---

## 🛠️ Tech Stack

| Tier | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite, TailwindCSS | Fast, responsive user interface & state management |
| **Backend** | FastAPI, Python 3.x | High-performance asynchronous REST API controller |
| **AI Model** | Groq API (`llama-3.3-70b-versatile`) | LLM code analysis & refactoring engine |
| **Database** | PostgreSQL (SQLAlchemy ORM) | Persistent database for users and review history |
| **PDF Generation** | jsPDF / html2canvas | Client-side export of formatted review reports |

---

## 📂 Project Structure

```text
CodeRefine_project/
│
├── backend/                  # FastAPI Python Application
│   ├── app/
│   │   ├── api/              # API endpoints (/review, /rewrite, /history, /auth)
│   │   ├── core/             # Configuration & security settings
│   │   ├── db/               # SQLAlchemy database session & engine
│   │   ├── models/           # Database models (User, Review)
│   │   ├── schemas/          # Pydantic request/response schemas
│   │   ├── services/         # Groq AI client & JSON response parser
│   │   └── main.py           # FastAPI entrypoint & CORS middleware
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Backend environment variables (GROQ_API_KEY, DATABASE_URL)
│
├── frontend/                 # React Vite Application
│   ├── src/
│   │   ├── components/       # Reusable components (Navbar, CodeEditor, ReviewPanel, PdfExport)
│   │   ├── pages/            # Page components (Dashboard, History, Login, Register)
│   │   ├── services/         # Axios API client instance
│   │   ├── App.jsx           # React Router route configuration
│   │   └── main.jsx          # React DOM root entrypoint
│   ├── package.json          # Node dependencies & scripts
│   └── vite.config.js        # Vite bundler configuration
│
└── README.md                 # Project documentation & interview guide
```

---

## 🚀 How to Run Locally

### 1. Backend Setup (FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create & activate virtual environment (optional)
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI dev server
uvicorn app.main:app --reload --port 8000
```
Backend server runs at: 👉 `http://127.0.0.1:8000`

### 2. Frontend Setup (React Vite)

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start Vite dev server
npm run dev
```
Frontend runs at: 👉 `http://localhost:5173`

---

## 🌐 API Route Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/login` | Authenticate user & return JWT access token |
| `POST` | `/auth/register` | Register new user account |
| `POST` | `/review/` | Submit code & language for AI analysis |
| `POST` | `/rewrite/` | Submit code & language for AI refactoring |
| `GET` | `/history/` | Fetch user's previous code review history |

---

## 🎓 Student Interview & Viva Guide

### Q1: How does the frontend communicate with the FastAPI backend?
> **Answer**: The frontend uses **Axios** (configured in `services/api.js`) to send JSON requests to FastAPI REST endpoints (e.g. `POST /review/`). When a user submits code, React triggers `handleReview()`, disables buttons to prevent duplicate requests, and updates component state (`useState`) with the returned structured JSON response.

### Q2: How does the AI Code Review work under the hood?
> **Answer**: The FastAPI backend sends the user's code snippet and selected language to the **Groq API** (`llama-3.3-70b-versatile` model) with strict prompt instructions. The model returns structured JSON classifying issues by severity (*Critical*, *High*, *Medium*, *Low*), accompanied by line numbers, explanations, and optimized code. The backend parses this JSON and saves a record into PostgreSQL before returning it to the React frontend.

### Q3: Why did you use React state instead of complex state management libraries like Redux?
> **Answer**: For a single-page review tool, React's built-in `useState` and component-level props provide all the state management needed without unnecessary boilerplate or overhead. It keeps the frontend lightweight, fast, and easy to maintain.

### Q4: How is data stored persistently in PostgreSQL?
> **Answer**: SQLAlchemy ORM maps Python model classes (`Review`) to PostgreSQL database tables. Each time a user completes a code review, `database.py` saves the source code, selected language, timestamp, and review results into the database, allowing users to view their past history on the `/history` page.
