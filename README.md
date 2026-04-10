# NIW Deployment Guide (Vercel)

This repository is configured for **single-project deployment on Vercel**:
- Frontend: React (CRA) static output from `frontend/build`
- Backend API: FastAPI serverless function at `api/index.py`

## What Vercel serves
- `/*` → `index.html` (SPA routing)
- `/api/*` → FastAPI app (`backend.server:app`)

Configured in `vercel.json`.

## Required environment variables (Vercel Project Settings → Environment Variables)
- `MONGO_URL` — MongoDB connection string
- `DB_NAME` — MongoDB database name
- `CORS_ORIGINS` — comma-separated list, e.g. `https://your-app.vercel.app`

## Optional frontend env var
- `REACT_APP_BACKEND_URL`
  - Leave unset when frontend and API are on the same Vercel project/domain.
  - Set it only if your API is hosted elsewhere.

## Deploy steps
1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Framework preset: **Other** (or let Vercel auto-detect).
4. Keep default root as repository root.
5. Add environment variables listed above.
6. Deploy.

## Local checks before deploying
```bash
python -m py_compile backend/server.py api/index.py
node -e "const fs=require('fs'); JSON.parse(fs.readFileSync('vercel.json','utf8')); console.log('vercel.json ok')"
```
