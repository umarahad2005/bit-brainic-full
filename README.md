# Bit Brainic — Your CS Tutor

Bit Brainic is a full-stack MERN app for learning computer science through an AI tutor chat. Users sign up, pick their interests, and chat with "BitBraniac", a Google Gemini–powered tutor that only answers computer-science questions and personalises its replies using the user's interests and chosen persona.

## Features

- Email/password sign-up and login with JWT auth (passwords hashed with bcrypt)
- Forgot / reset password via an emailed reset link (Nodemailer, SMTP)
- Interest selection and a custom tutor persona, both fed into the AI system prompt
- Chat dashboard: create, rename and delete chats; message history stored in MongoDB
- AI replies from Gemini (`gemini-2.5-flash`, falling back to `gemini-2.0-flash`), rendered with syntax-highlighted code blocks and quick replies
- Profile management: update profile, change password, delete account
- Admin panel protected by an admin password: usage statistics and user management (view, edit, delete users)
- Contact form endpoint that emails submissions
- Public pages (Home, Features, About, FAQ, Contact, Careers, Terms, Privacy) and a light/dark theme toggle

## Tech stack

**Client** (`client/`): React 19, Vite 7, React Router 7, Tailwind CSS 4, Axios, TanStack React Query, Framer Motion, Lucide icons, react-syntax-highlighter

**Server** (`server/`): Node.js (ES modules), Express 4, MongoDB with Mongoose, JSON Web Tokens, bcryptjs, Nodemailer, `@google/genai` (Gemini), dotenv, nodemon

## Project structure

```
.
├── client/              # React + Vite frontend
│   └── src/
│       ├── api/         # axios instance and API calls
│       ├── components/  # chat, layout, ui, common components
│       ├── context/     # auth and theme context
│       └── pages/       # public, auth, dashboard, admin pages
└── server/              # Express API
    ├── config/          # MongoDB connection
    ├── middleware/      # JWT auth and admin-password middleware
    ├── models/          # User, Chat, Message
    ├── routes/          # /api/auth, /api/chat, /api/admin, /api/contact
    ├── services/        # Gemini and email services
    └── server.js
```

## Getting started

Prerequisites: Node.js, npm, a MongoDB instance, and a Gemini API key.

### 1. Server

```bash
cd server
npm install
cp .env.example .env   # then fill in your own values
npm run dev            # frees port 5000, then starts the API with nodemon
```

Other scripts: `npm start` (nodemon) and `npm run prod` (plain `node`). The API listens on `PORT` (default 5000) and exposes a health check at `GET /api/health`.

### 2. Client

```bash
cd client
npm install
npm run dev
```

The Vite dev server (port 5173) proxies `/api` to `http://localhost:5000`. Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Environment variables

Server (`server/.env`, see `server/.env.example`):

| Name | Used for |
| --- | --- |
| `PORT` | API port (default 5000) |
| `MONGODB_URI` | MongoDB connection string (required) |
| `JWT_SECRET` | Signing auth tokens |
| `GEMINI_API_KEY` | Google Gemini API |
| `ADMIN_PASSWORD` | Admin panel access |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_EMAIL`, `SMTP_PASSWORD`, `FROM_NAME` | Password-reset emails |
| `CLIENT_URL` | Building password-reset links |
| `EMAIL_USER`, `EMAIL_PASS` | Contact form emails (if `EMAIL_PASS` is unset, sending is simulated) |
| `NODE_ENV` | `production` changes CORS origin and hides error stacks |

Client (optional): `VITE_API_URL` overrides the API base URL (defaults to `/api`).

Note: in production the server's CORS origin is still a placeholder in `server/server.js` and needs to be set to the real frontend URL.
