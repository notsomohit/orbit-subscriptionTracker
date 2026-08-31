# 🚀 Orbit — Subscription Tracker API & Dashboard

Backend API and dashboard for managing subscriptions and automating renewal reminder emails using Upstash Workflow, Nodemailer, and MongoDB.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Arcjet](https://img.shields.io/badge/Arcjet-262626?style=for-the-badge)
![Upstash](https://img.shields.io/badge/Upstash-00E9A3?style=for-the-badge&logo=upstash&logoColor=black)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

# Features

- JWT Authentication & Authorization (`sign-up`, `log-in`, `log-out`)
- Full Subscription CRUD Operations with Mongoose Hooks
- Auto-calculation of Renewal Dates (`daily`, `weekly`, `monthly`, `yearly`)
- Automated Renewal Reminder Emails (`7`, `5`, `2`, `1` days before renewal)
- Async Delayed Workflows using `@upstash/workflow` (`sleepUntil`)
- Dynamic HTML Email Templates with Nodemailer
- Arcjet Security (Bot Detection & Token Bucket Rate Limiting)
- Centralized Error Handling (`ApiError`, `ApiResponse`, `asyncHandler`)
- React 19 + TypeScript + Vite Dark-Mode UI
- Route Protection (Guest redirect to landing page)
- Real-time Analytics (Monthly spend timeline, status breakdown, category distribution)
- TanStack Table v8 Subscription Management with Search, Sort & CRUD Modals

---

# 📚 Libraries Used

### Backend
- `express`
- `mongoose`
- `jsonwebtoken`
- `bcryptjs`
- `cookie-parser`
- `dotenv`
- `dayjs`
- `nodemailer`
- `@arcjet/node`
- `@upstash/workflow`
- `nodemon`

### Frontend
- `react` & `react-dom`
- `react-router-dom`
- `@tanstack/react-query`
- `@tanstack/react-table`
- `recharts`
- `lucide-react`
- `tailwindcss`

---

# 📁 Project Structure

```bash
subscription-tracker/
├── config/
│   ├── arcjet.js
│   ├── env.js
│   ├── nodemailer.js
│   └── upstash.js
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── subscription.controller.js
│   │   └── workflow.controller.js
│   ├── db/
│   │   └── db.js
│   ├── middleware/
│   │   ├── arcjet.middleware.js
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── subscription.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── subscription.routes.js
│   │   └── workflow.routes.js
│   ├── utils/
│   │   ├── api-errors.js
│   │   ├── api-response.js
│   │   ├── async-handler.js
│   │   ├── email_templates.js
│   │   └── send_email.js
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── common/
│   │   │   ├── landing/
│   │   │   └── layout/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   └── dashboard/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── package.json
└── README.md
```

---

# 🔑 API Routes

## Auth Routes (`/api/v1/auth`)

```http
POST   /api/v1/auth/sign-up
POST   /api/v1/auth/log-in
POST   /api/v1/auth/log-out
```

---

## Subscription Routes (`/api/v1/subscription`)

```http
GET    /api/v1/subscription
GET    /api/v1/subscription/:id
POST   /api/v1/subscription
PUT    /api/v1/subscription/:id
DELETE /api/v1/subscription/:id
```

---

## Workflow Routes (`/api/v1/workflows`)

```http
POST   /api/v1/workflows/subscription/reminder
```

---

# 📊 Schema Enums

```javascript
// Frequency
enum: ["daily", "weekly", "monthly", "yearly"]

// Currency
enum: ["USD", "EUR", "RS"]

// Status
enum: ["active", "cancelled", "expired"]

// Category
enum: ["sports", "news", "entertainment", "lifestyle", "technology", "finance", "politics"]
```

---

# 🔐 Authentication Flow

```text
Client Request
   ↓
JWT Token Validation
   ↓
Auth Middleware (req.user)
   ↓
Protected Route Handlers
```

---

# 🛡️ Security Features

- Arcjet Token Bucket Rate Limiting (5 tokens per 10s interval, capacity 10)
- Arcjet Bot Detection (`DRY_RUN`, allow search engines)
- Arcjet Shield (SQL / injection attack protection)
- JWT token signing with configurable expiry
- Passwords hashed with bcrypt (salt rounds: 10)
- Mongoose schema-level validations and pre-save lifecycle hooks

---

# ⏰ Reminder Workflow System

Whenever a subscription is created, a workflow is triggered via `@upstash/workflow`:

```text
[Subscription Created]
       │
       ▼
[Upstash Workflow Triggered]
       │
       ├──► sleepUntil(7 days before renewal) ──► Send 7-day Reminder Email
       ├──► sleepUntil(5 days before renewal) ──► Send 5-day Reminder Email
       ├──► sleepUntil(2 days before renewal) ──► Send 2-day Reminder Email
       └──► sleepUntil(1 day before renewal)  ──► Send 1-day Final Reminder Email
```

Reminder Intervals:
- 7 days before renewal
- 5 days before renewal
- 2 days before renewal
- 1 day before renewal

---

# 📧 Email Reminder System

Emails are sent using:
- Nodemailer (`smtp.gmail.com`)
- Gmail App Passwords
- Dynamic HTML templates (`generateEmailTemplate`)

Features:
- Personalized greeting with user name
- Subscription details (Plan, Price, Payment Method)
- Renewal date countdown
- Responsive email formatting

---

# ⚙️ Environment Variables

Create `.env.development.local` in the project root:

```env
PORT=5500
SERVER_URL="http://localhost:5500"
NODE_ENV="development"

DB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/orbit"

JWT_SECRET="your_jwt_secret"
JWT_SECRET_EXPIRY="7d"

ARCJET_KEY="ajkey_your_key"
ARCJET_ENV="development"

QSTASH_URL="https://qstash.upstash.io"
QSTASH_TOKEN="your_qstash_token"
QSTASH_CURRENT_SIGNING_KEY="your_qstash_signing_key"
QSTASH_NEXT_SIGNING_KEY="your_qstash_next_signing_key"

ACCOUNT_EMAIL="your_email@gmail.com"
EMAIL_PASSWORD="your_gmail_app_password"
```

---

# 🚀 Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/notsomohit/subscription-tracker.git
cd subscription-tracker
```

---

## 2. Backend Setup

```bash
# Install backend dependencies
npm install

# Start Express server with nodemon
npm run dev
```

---

## 3. Upstash Local Dev Tunnel (for Workflow testing)

```bash
npx @upstash/qstash-cli dev
```

---

## 4. Frontend Setup

```bash
# From the root directory:
npm run client

# Or directly in frontend folder:
cd frontend
npm install
npm run dev
```

---

# 🔄 Request Flow

```text
Client
   ↓
Routes
   ↓
Arcjet Middleware (Bot & Rate Limit)
   ↓
Auth Middleware (JWT Verify)
   ↓
Controller
   ↓
MongoDB Database (Mongoose Hook)
   ↓
Workflow Trigger
   ↓
Upstash Workflow (sleepUntil)
   ↓
Nodemailer Email Reminder
```

---

# 📌 Current Status

- ✅ Authentication System (`sign-up`, `log-in`, `log-out`)
- ✅ Subscription CRUD Operations
- ✅ Auto-calculation of Renewal Dates & Expiration
- ✅ Upstash Workflow Integration (`sleepUntil`)
- ✅ Automated Reminder Emails (`7, 5, 2, 1` days)
- ✅ Nodemailer Dynamic HTML Templates
- ✅ Arcjet Security (Rate Limiting, Shield, Bot Detection)
- ✅ Centralized Error & Response Envelopes
- ✅ React 19 + Vite Frontend Dashboard & Landing UI

---

# 👨‍💻 Author

Backend chaos managed by [mohit](https://github.com/notsomohit)