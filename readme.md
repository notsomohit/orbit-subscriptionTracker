# 🚀 Subscription Tracker API

Backend API for managing subscriptions and automating renewal reminders using Upstash Workflow.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Arcjet](https://img.shields.io/badge/Arcjet-262626?style=for-the-badge)
![Upstash](https://img.shields.io/badge/Upstash-00E9A3?style=for-the-badge&logo=upstash&logoColor=black)


---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 📦 Subscription CRUD Operations
- ⏰ Automated Renewal Reminders
- 🛡️ Arcjet Security Protection
- 🚦 Rate Limiting & Bot Detection
- 📄 Standardized API Responses
- ⚡ Centralized Error Handling
- 🗃️ MongoDB + Mongoose Integration

---

## 📚 Libraries Used

- `express`
- `mongoose`
- `jsonwebtoken`
- `bcryptjs`
- `cookie-parser`
- `dotenv`
- `dayjs`
- `@arcjet/node`
- `@upstash/workflow`

---

## 📁 Project Structure

```bash
subscription-tracker/
├── config/
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── package.json
└── README.md
```

---

## 🔑 API Routes

### Auth

```http
POST   /api/v1/auth/sign-up
POST   /api/v1/auth/log-in
POST   /api/v1/auth/log-out
```

### Subscriptions

```http
GET    /api/v1/subscription
GET    /api/v1/subscription/:id
POST   /api/v1/subscription
PUT    /api/v1/subscription/:id
DELETE /api/v1/subscription/:id
```

### Workflows

```http
POST /api/v1/workflows/subscription/reminder
```

---

## 🔐 Authentication Flow

```text
Client
   ↓
JWT Token
   ↓
Auth Middleware
   ↓
Protected Routes
```

---

## 🛡️ Security

- Arcjet middleware integration
- Bot detection
- Rate limiting
- JWT route protection
- Mongoose schema validation

---

## ⏰ Reminder Workflow

Reminder jobs are scheduled automatically when a subscription is created.

Intervals:
- 7 days before renewal
- 5 days before renewal
- 2 days before renewal
- 1 day before renewal

Powered by `@upstash/workflow`.

---

## ⚙️ Environment Variables

```env
PORT=
SERVER_URL=
NODE_ENV=

DB_URI=

JWT_SECRET=
JWT_SECRET_EXPIRY=

ARCJET_KEY=
ARCJET_ENV=

QSTASH_URL=
QSTASH_TOKEN=
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/notsomohit/subscription-tracker.git
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

## 🔄 Request Flow

```text
Client
   ↓
Routes
   ↓
Arcjet Middleware
   ↓
Auth Middleware
   ↓
Controller
   ↓
Database
   ↓
Response
```

---

## 📌 Current Status

- ✅ Authentication System
- ✅ Subscription CRUD
- ✅ Reminder Workflows
- ✅ Arcjet Security Integration
- ✅ Centralized Error Handling

---

## 📈 Future Improvements

- Email Service Integration
- Frontend Dashboard
- Docker Support
- Unit & Integration Tests
- Analytics Dashboard