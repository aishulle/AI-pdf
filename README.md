# AIpdf - PDF Question Answering System

AIpdf is a full-stack application that allows users to upload PDFs and ask questions about the content. The system processes the PDFs, extracts text, and leverages **LLMs (Gemini via llama-index)** to provide intelligent responses. The backend is built with **FastAPI**, while the frontend uses **React.js** for a seamless user experience.

## Features
- Upload PDFs for processing
- Ask questions and get context-aware answers
- FastAPI backend with **Gemini LLM via llama-index**
- React.js frontend for user interaction
- Uses **SQLite/PostgreSQL** for metadata storage
- Supports local and cloud PDF storage

## Tech Stack
- **Backend:** FastAPI, llama-index, LangChain, Gemini LLM
- **Frontend:** React.js, TailwindCSS
- **Database:** SQLite
- **Storage:** Local filesystem 

## Installation & Setup

### 2. Set up the backend
```sh
cd backend
pip install fastapi uvicorn llama-index langchain pymupdf pydantic python-dotenv numpy pandas
```
Create a **.env** file in the `backend/` directory with your credentials:
```
GEMINI_API_KEY=your-api-key
DATABASE_URL=sqlite:///./database.db
```
Run the FastAPI server:
```sh
uvicorn main:app --reload --port 8003
```

### 3. Set up the frontend
```sh
cd frontend
npm install
npm start
```

## Usage
- Open `http://localhost:3000/` in your browser
- Upload a PDF and ask questions
- View responses generated using **Gemini LLM**

## API Endpoints
| Method | Endpoint         | Description                |
|--------|----------------|----------------------------|
| POST   | /upload        | Upload a PDF              |
| GET    | /ask         | Ask a question            |
| GET    | /documents     | List uploaded PDFs        |
| DELETE | /delete        | Delete an uploaded PDF    |






