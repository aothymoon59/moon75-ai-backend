# 🤖 Moon75 AI Agent

A full-stack AI-powered chatbot application with real-time streaming responses, multiple AI model support, and an admin panel for managing custom Q&A pairs.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter_AI-412991?style=for-the-badge&logo=openai&logoColor=white)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Architecture Overview](#-architecture-overview)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 💬 Chat Interface
- **Real-time streaming responses** — AI responses appear character-by-character using Server-Sent Events (SSE)
- **Session-based conversation history** — maintains context across messages within a session
- **Multi-model support** — switch between AI models on the fly:
  - GPT-4o Mini
  - Step 3.5 Flash (Free)
  - Nemotron 3 Super (Free)
  - Trinity Large (Free)
- **Markdown rendering** — AI responses support full markdown formatting including tables, lists, bold/italic, and more
- **Syntax highlighting** — code blocks rendered with Prism.js syntax highlighting (One Dark theme)
- **Copy to clipboard** — one-click copy for AI responses
- **Auto-scrolling** — chat window automatically scrolls to the latest message
- **Auto-resizing textarea** — input field grows dynamically as you type (up to 200px)

### 🔧 Admin Panel
- **Secret-code authentication** — admin access protected via environment-configured secret code
- **Custom Q&A management** — full CRUD operations to create, read, update, and delete custom Q&A pairs
- **Keyword-based triggers** — define comma-separated keywords that trigger specific custom responses
- **Session persistence** — admin authentication persists across page refreshes via `sessionStorage`
- **Responsive card layout** — Q&A entries displayed in a clean, modern card grid
- **Delete confirmation** — inline confirmation overlay before deleting entries

### 🎨 UI/UX
- **Dark theme** — modern, sleek dark interface
- **Loading indicators** — animated progress bar and spinner during AI responses
- **Blinking cursor** — typing indicator while AI is streaming
- **Responsive design** — works across desktop and mobile devices
- **404 page** — custom "Not Found" page for invalid routes

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web framework |
| **OpenAI SDK** | AI model API client (via OpenRouter) |
| **OpenRouter** | Multi-model AI gateway |
| **UUID** | Session ID generation |
| **CORS** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite 4** | Build tool and dev server |
| **React Router DOM 6** | Client-side routing |
| **React Markdown** | Markdown rendering |
| **remark-gfm** | GitHub Flavored Markdown support |
| **React Syntax Highlighter** | Code block syntax highlighting |
| **ESLint** | Code linting |

---

## 📁 Project Structure

```
ai-agent/
├── backend/
│   ├── config/
│   │   └── openai.js              # OpenAI client configuration (OpenRouter)
│   ├── constants/
│   │   └── customResponses.js     # Default custom response definitions
│   ├── data/
│   │   └── customResponses.json   # Custom Q&A data store (JSON file)
│   ├── middlewares/
│   │   ├── adminAuth.js           # Admin authentication middleware
│   │   └── errorHandler.js        # Global error handler
│   ├── modules/
│   │   ├── chat/
│   │   │   ├── index.js           # Chat module entry point
│   │   │   ├── chatRoutes.js      # Chat route definitions
│   │   │   ├── chatController.js  # Chat request handler
│   │   │   └── chatService.js     # Chat business logic & SSE streaming
│   │   └── customQnA/
│   │       ├── index.js           # Custom Q&A module entry point
│   │       ├── customQnARoutes.js # Q&A CRUD route definitions
│   │       ├── customQnAController.js # Q&A request handlers
│   │       └── customQnAService.js    # Q&A CRUD logic & file I/O
│   ├── utils/
│   │   └── logger.js              # Logger utility (placeholder)
│   ├── .env.example               # Environment variables template
│   ├── .gitignore
│   ├── ai-agents.js               # Standalone AI test script
│   ├── package.json
│   └── server.js                  # Express app entry point
│
└── frontend/
    ├── public/                    # Static assets
    ├── src/
    │   ├── assets/                # Images and media
    │   ├── constants/
    │   │   └── index.js           # AI model definitions
    │   ├── pages/
    │   │   ├── AdminPanel.jsx     # Admin Q&A management page
    │   │   └── AdminPanel.css     # Admin panel styles
    │   ├── router/
    │   │   └── routes.jsx         # App route configuration
    │   ├── App.jsx                # Main chat interface component
    │   ├── App.css                # Chat interface styles
    │   ├── main.jsx               # React app entry point
    │   └── index.css              # Global styles
    ├── .env.example               # Environment variables template
    ├── .gitignore
    ├── index.html                 # HTML entry point
    ├── package.json
    ├── vercel.json                # Vercel deployment config
    └── vite.config.js             # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **OpenRouter API Key** — get one at [openrouter.ai](https://openrouter.ai/)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and fill in your values:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ADMIN_SECRET_CODE=your_admin_secret_code_here
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   The API will be running at `http://localhost:3001`

5. **Verify it's running:**
   ```
   GET http://localhost:3001/
   → 🚀 Moon75 AI Agent API running...
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key for AI model access | ✅ Yes |
| `ADMIN_SECRET_CODE` | Secret code for admin panel authentication | ✅ Yes |
| `PORT` | Server port (default: `3001`) | ❌ No |

### Frontend (`frontend/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL (e.g., `http://localhost:3001/api`) | ✅ Yes |

---

## 📡 API Documentation

### Health Check

```
GET /
```
Returns: `🚀 Moon75 AI Agent API running...`

---

### Chat

```
POST /api/chat
```

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "model": "stepfun/step-3.5-flash:free",
  "sessionId": "optional-session-id"
}
```

**Response:** Server-Sent Events (SSE) stream

| SSE Event | Description |
|-----------|-------------|
| `{ "sessionId": "uuid" }` | Session ID (sent first, for new sessions) |
| `{ "text": "chunk" }` | Streamed AI response text chunk |
| `{ "done": true, "sessionId": "uuid" }` | Stream completion signal |
| `{ "error": "message" }` | Error message (if any) |

**How it works:**
1. If no `sessionId` is provided, a new session is created with a UUID
2. The message is checked against custom Q&A keywords first
3. If no custom match, the message is sent to the selected AI model via OpenRouter
4. Response is streamed back character-by-character via SSE

---

### Admin Authentication

```
POST /api/admin/verify
```

**Request Body:**
```json
{
  "secretCode": "your-admin-secret"
}
```

**Response:**
```json
{ "success": true }
```

---

### Custom Q&A Management

> All `/api/admin/qna` routes require the `x-admin-secret` header.

#### List All Q&A Pairs
```
GET /api/admin/qna
```

**Response:**
```json
[
  {
    "id": "1",
    "keywords": ["hello", "hi", "hey"],
    "answer": "Hello! How can I help you today?"
  }
]
```

#### Create Q&A Pair
```
POST /api/admin/qna
```

**Request Body:**
```json
{
  "keywords": ["trigger1", "trigger2"],
  "answer": "Custom response text"
}
```

#### Update Q&A Pair
```
PUT /api/admin/qna/:id
```

**Request Body:**
```json
{
  "keywords": ["updated-trigger"],
  "answer": "Updated response text"
}
```

#### Delete Q&A Pair
```
DELETE /api/admin/qna/:id
```

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│  React + Vite (Port 5173)                               │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │  Chat UI     │    │  Admin Panel │                   │
│  │  (App.jsx)   │    │  (/admin)    │                   │
│  └──────┬───────┘    └──────┬───────┘                   │
│         │                   │                           │
│         │  SSE Stream       │  REST API                 │
└─────────┼───────────────────┼───────────────────────────┘
          │                   │
          ▼                   ▼
┌─────────────────────────────────────────────────────────┐
│                      BACKEND                            │
│  Node.js + Express (Port 3001)                          │
│                                                         │
│  ┌─────────────────┐  ┌─────────────────┐               │
│  │  Chat Module    │  │  CustomQnA      │               │
│  │  POST /api/chat │  │  /api/admin/qna │               │
│  └────────┬────────┘  └────────┬────────┘               │
│           │                    │                        │
│           ▼                    ▼                        │
│  ┌─────────────────┐  ┌─────────────────┐               │
│  │  In-Memory      │  │  JSON File      │               │
│  │  Sessions       │  │  Data Store     │               │
│  └─────────────────┘  └─────────────────┘               │
│           │                                             │
│           ▼                                             │
│  ┌─────────────────────────┐                            │
│  │  OpenRouter AI Gateway  │                            │
│  │  (OpenAI SDK)           │                            │
│  └─────────────────────────┘                            │
└─────────────────────────────────────────────────────────┘
```

### Key Design Decisions

- **SSE Streaming** — Uses Server-Sent Events for real-time response streaming instead of WebSockets, keeping the implementation simple and HTTP-native
- **In-Memory Sessions** — Chat history is stored in-memory for simplicity (sessions reset on server restart)
- **JSON File Storage** — Custom Q&A data is persisted in a JSON file (`data/customResponses.json`) for simplicity without requiring a database
- **Modular Architecture** — Backend follows a module-based pattern with each feature (chat, customQnA) having its own routes, controllers, and services
- **OpenRouter Integration** — Uses the OpenAI SDK with a custom base URL pointing to OpenRouter, enabling access to multiple AI models through a single API

---

## 🌐 Deployment

### Frontend (Vercel)

The frontend is pre-configured for Vercel deployment with `vercel.json`:

1. Push your frontend code to a Git repository
2. Import the project in [Vercel](https://vercel.com)
3. Set the root directory to `frontend`
4. Add the environment variable:
   - `VITE_API_URL` = your deployed backend URL (e.g., `https://api-moon75-ai.vercel.app`)
5. Deploy

### Backend (Vercel / Any Node.js Host)

1. Push your backend code to a Git repository
2. Deploy to your preferred platform (Vercel, Railway, Render, etc.)
3. Set environment variables:
   - `OPENROUTER_API_KEY`
   - `ADMIN_SECRET_CODE`
4. Ensure the start command is `npm start` (which runs `node server.js`)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

<p align="center">
  Built with ❤️ by <strong>Aothy Mahamud Moon</strong>
</p>
