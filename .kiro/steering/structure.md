# Project Structure

## Root Directory
```
├── client/          # React frontend application
├── server/          # Express.js backend API
├── .git/           # Git repository
├── .kiro/          # Kiro IDE configuration
└── .vscode/        # VS Code settings
```

## Client Structure (`client/`)
```
client/
├── src/
│   ├── api/           # API client functions and configurations
│   ├── assets/        # Static assets (images, fonts, etc.)
│   ├── components/    # Reusable React components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page-level components
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main App component
│   ├── App.css        # App-specific styles
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles
├── public/            # Static public assets
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
├── eslint.config.js   # ESLint configuration
└── package.json       # Frontend dependencies
```

## Server Structure (`server/`)
```
server/
├── config/
│   └── db.js          # MongoDB connection configuration
├── middleware/
│   ├── auth.js        # JWT authentication middleware
│   └── admin.js       # Admin authorization middleware
├── models/
│   ├── User.js        # User schema
│   ├── Chat.js        # Chat session schema
│   └── Message.js     # Message schema
├── routes/
│   ├── auth.js        # Authentication endpoints
│   ├── chat.js        # Chat/AI tutoring endpoints
│   ├── admin.js       # Admin management endpoints
│   └── contact.js     # Contact form endpoints
├── services/
│   └── gemini.js      # Google Gemini AI service
├── server.js          # Main server entry point
├── .env.example       # Environment variables template
└── package.json       # Backend dependencies
```

## Architecture Patterns

### Backend (MVC-like)
- **Models**: Mongoose schemas in `models/`
- **Controllers**: Route handlers in `routes/`
- **Services**: Business logic in `services/`
- **Middleware**: Authentication and validation in `middleware/`

### Frontend (Component-based)
- **Pages**: Top-level route components
- **Components**: Reusable UI components
- **Hooks**: Custom React hooks for state and effects
- **Context**: Global state management
- **API**: Centralized API calls with React Query

### Key Conventions
- ES modules throughout (import/export)
- RESTful API design with `/api` prefix
- JWT-based authentication
- MongoDB with Mongoose ODM
- TailwindCSS for styling
- React Query for server state management