# Student Dropout Prediction & Mentor Support Platform

Dev quickstart:

- Ensure Docker and Docker Compose are installed.
- Create `.env` in repo root to override defaults if needed.
- Run: `docker compose up --build`

Services:
- Backend (Node/Express): http://localhost:4000/health
- ML Service (FastAPI): http://localhost:8000/health
- Frontend (Vite): http://localhost:3000
- Postgres: localhost:5432
- Redis: localhost:6379
