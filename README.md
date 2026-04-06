# QBTech

A full-stack project with:

- Landing page website (React + Vite)
- Careers/job application flow
- Admin SPA at `/admin`
- Express API with Drizzle ORM + PostgreSQL
- JWT-based admin authentication
- Local resume uploads linked to messages/applications

## Tech Stack

- Frontend: React, TypeScript, Vite, React Router
- Backend: Express, TypeScript
- Database: PostgreSQL + Drizzle ORM
- Auth: JWT (admin login)
- Uploads: Multer (local disk storage)

## Project Structure

- `src/` - Frontend app
  - `src/api/` - API client and service modules
  - `src/components/pages/` - Public website pages
  - `src/components/admin/` - Admin SPA pages/layout
- `backend/` - Express API + Drizzle schema
  - `backend/src/routes/` - Auth/public/admin routes
  - `backend/src/db/` - Drizzle db + schema
  - `backend/src/scripts/seed-admin.ts` - Admin seed script
  - `backend/uploads/resumes/` - Uploaded resume files

## Data Model

Core tables:

- `admins`
  - `id`, `email`, `passwordHash`, `createdAt`
- `jobs`
  - `id`, `name`, `description`, `department`, `timeType`, `location`, `createdAt`, `updatedAt`
- `messages`
  - `id`, `email`, `name`, `body`, `jobId`, `resumePath`, `createdAt`

`messages.jobId` behavior:

- `null` -> normal contact message
- non-null -> job application

## Environment Variables

### Frontend (`.env`)

Copy `.env.example` at repo root:

```bash
cp .env.example .env
```

Variables:

- `VITE_API_URL` (optional)
  - Leave empty in development to use Vite proxy (`/api` -> `http://localhost:4000`)
  - Set full API origin in production if frontend and backend are on different hosts

### Backend (`backend/.env`)

Copy backend example:

```bash
cp backend/.env.example backend/.env
```

Required/used variables:

- `DATABASE_URL=postgres://user:pass@localhost:5432/qbtech`
- `JWT_SECRET=your-long-random-secret`
- `PORT=4000`
- `CORS_ORIGIN=http://localhost:5173`
- `ADMIN_EMAIL=admin@qbtech.local`
- `ADMIN_PASSWORD=changeme`

## Local Setup

### 1) Install dependencies

Frontend:

```bash
npm install
```

Backend:

```bash
cd backend
npm install
cd ..
```

### 2) Database setup

With `backend/.env` configured:

```bash
cd backend
npm run db:push
npm run db:seed
cd ..
```

### 3) Run development servers

Terminal 1 (backend):

```bash
cd backend
npm run dev
```

Terminal 2 (frontend):

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:4000`

Admin login page: `http://localhost:5173/admin/login`

## Scripts

### Frontend (root)

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview build
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript checks

### Backend (`backend/`)

- `npm run dev` - start API with watch mode
- `npm run build` - compile backend TypeScript
- `npm run start` - run compiled backend
- `npm run db:generate` - drizzle migration generate
- `npm run db:push` - push schema to database
- `npm run db:seed` - create default admin user

## API Overview

Base URL: `/api`

### Health

- `GET /api/health`

### Auth

- `POST /api/auth/login`
  - body: `{ "email": "...", "password": "..." }`
  - returns: `{ token, admin }`

### Public

- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/messages` (multipart/form-data)
  - fields:
    - `email` (required)
    - `message` (required)
    - `name` (optional)
    - `jobId` (optional)
    - `resume` (optional file: PDF/DOC/DOCX, max 10MB)

### Admin (requires `Authorization: Bearer <token>`)

- `GET /api/admin/stats`
- `GET /api/admin/jobs`
- `POST /api/admin/jobs`
- `PUT /api/admin/jobs/:id`
- `DELETE /api/admin/jobs/:id`
- `GET /api/admin/messages?kind=contact|application`
- `GET /api/admin/applications`
- `GET /api/admin/jobs/:jobId/applications`
- `GET /api/admin/messages/:id/resume`
- `DELETE /api/admin/messages/:id`

## Frontend Features

- Careers page loads jobs from backend (`/api/jobs`)
- Skeleton loading states for job list and job apply flow
- Contact form submits through shared message endpoint (`/api/messages`)
- Job apply page also uses `/api/messages` with `jobId`
- Reusable `ResumeUpload` component for optional file upload
- Admin SPA with sidebar:
  - Dashboard
  - Jobs (create/edit/delete + per-job applications)
  - Applications
  - Messages

## Notes

- Resume files are stored locally in `backend/uploads/resumes/`.
- Deleting a message/application via admin also attempts to remove the uploaded file from disk.
- If a job is deleted, related message rows keep existing data and `jobId` is set to null by FK behavior.
