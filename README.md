# Me-API Playground

## 🚀 Goal
A full-stack mini playground that stores my profile in a PostgreSQL database and exposes it via APIs with a minimal frontend to query profile, projects, skills, and work experience.

---

## 🏗️ Architecture
- **Backend**: Node.js (Express) + PostgreSQL
- **Frontend**: React (Vite)
- **Database**: PostgreSQL (Render Cloud DB)
- **Hosting**: Backend (Render), Frontend (Vercel)

---

## 🌐 Live URLs
- **Frontend (Vercel)**: [Me-API Playground Frontend](https://me-api-playground-3v79.vercel.app)  
- **Backend (Render)**: [Me-API Playground Backend](https://me-api-playground-8.onrender.com)  
- **Resume**: [View Resume](https://drive.google.com/file/d/1cDggKqKj7Y5tyLLPA-35o7H2ZeLSZ1_6/view?usp=sharing)

---

## 📌 API Endpoints
- `GET /health` → Service liveness check
- `GET /profile` → Fetch profile (with skills, projects, work, links)
- `POST /profile` → Create profile
- `PUT /profile` → Update profile
- `GET /projects?skill=python` → List projects filtered by skill
- `GET /skills/top` → Top skills
- `GET /search?q=mern` → Search across profile, projects, work, skills

---

## 🗄️ Database Schema
See [`backend/src/schema.sql`](backend/src/schema.sql).

### Tables:
- `profile` → id, name, email, education, phone, cgpa  
- `skills` → id, profile_id, skill  
- `projects` → id, profile_id, title, description, link  
- `work` → id, profile_id, role, company, duration  
- `links` → id, profile_id, github, linkedin  

Seed data is in [`backend/src/seed.sql`](backend/src/seed.sql).

---

## ▶️ Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
