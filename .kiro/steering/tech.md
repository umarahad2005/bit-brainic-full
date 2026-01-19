# Technology Stack

## Frontend (Client)
- **Framework**: React 19.2.0 with Vite 7.2.4
- **Styling**: TailwindCSS 4.1.18 with custom configuration
- **State Management**: TanStack React Query for server state
- **Routing**: React Router DOM 7.11.0
- **HTTP Client**: Axios 1.13.2
- **Animations**: Framer Motion 12.24.5
- **Icons**: Lucide React 0.562.0
- **Code Highlighting**: React Syntax Highlighter 16.1.0
- **Linting**: ESLint 9.39.1 with React hooks and refresh plugins

## Backend (Server)
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js 4.21.0
- **Database**: MongoDB with Mongoose 8.7.0
- **Authentication**: JWT with bcryptjs for password hashing
- **AI Integration**: Google Gemini API via @google/generative-ai and LangChain
- **Email**: Nodemailer 7.0.12
- **Environment**: dotenv 16.4.5
- **CORS**: Configured for development and production

## Development Tools
- **Package Manager**: npm
- **Module System**: ES modules (type: "module")
- **Environment**: Node.js --watch for development

## Common Commands

### Client Development
```bash
cd client
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Server Development
```bash
cd server
npm run dev          # Start with --watch flag
npm start            # Start production server
```

### Full Stack Development
- Client runs on `http://localhost:5173`
- Server runs on `http://localhost:5000`
- Vite proxy configured to forward `/api` requests to server

## Environment Configuration
- Server requires `.env` file with MongoDB URI, JWT secret, Gemini API key, and admin password
- See `server/.env.example` for required variables