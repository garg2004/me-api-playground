# Me-API Playground

## 🚀 Goal
A full-stack mini playground that stores my profile in a DB and exposes it via APIs + minimal frontend.

---

## 🏗️ Architecture
- **Backend**: Node.js (Express) + PostgreSQL
- **Frontend**: React (Vite)
- **Hosting**: Backend (Render), Frontend (Vercel), DB (Supabase/Railway)

---

## 📌 API Endpoints
- `GET /health` → check service
- `GET /profile` → fetch profile
- `POST /profile` → create profile
- `PUT /profile` → update profile
- `GET /projects?skill=python` → projects by skill
- `GET /skills/top` → top 5 skills
- `GET /search?q=mern` → search across projects

---

## 🗄️ Database Schema
(see `backend/src/schema.sql`)

---

## ▶️ Run Locally
```bash
cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev
