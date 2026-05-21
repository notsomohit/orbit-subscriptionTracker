# 🚀 Subscription Tracker API

Backend API for managing subscriptions and automating renewal reminder emails using Upstash Workflow, Nodemailer, and MongoDB.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Arcjet](https://img.shields.io/badge/Arcjet-262626?style=for-the-badge)
![Upstash](https://img.shields.io/badge/Upstash-00E9A3?style=for-the-badge&logo=upstash&logoColor=black)

---

# Features

-  JWT Authentication & Authorization
-  Full Subscription CRUD Operations
-  Automated Renewal Reminder Emails
-  Dynamic HTML Email Templates
-  Async Delayed Workflows using Upstash
-  Arcjet Security Protection
-  Rate Limiting & Bot Detection
-  Standardized API Responses
-  Centralized Error Handling
-  MongoDB + Mongoose Integration

---

# 📚 Libraries Used

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

---

# 📁 Project Structure

```bash
subscription-tracker/
├── config/
│   ├── env.js
│   ├── nodemailer.js
│   └── upstash.js
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   ├── email_templates.js
│   │   ├── send_email.js
│   │   ├── api-errors.js
│   │   ├── api-response.js
│   │   └── async-handler.js
│   │
│   ├── app.js
│   └── server.js
│
├── package.json
└── README.md
```

---

# 🔑 API Routes

## Auth Routes

```http
POST   /api/v1/auth/sign-up
POST   /api/v1/auth/log-in
POST   /api/v1/auth/log-out
```

---

## Subscription Routes

```http
GET    /api/v1/subscription
GET    /api/v1/subscription/:id
POST   /api/v1/subscription
PUT    /api/v1/subscription/:id
DELETE /api/v1/subscription/:id
```

---

## Workflow Routes

```http
POST /api/v1/workflows/subscription/reminder
```

---

# 🔐 Authentication Flow

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

# 🛡️ Security Features

- Arcjet middleware integration
- Bot protection
- Rate limiting
- JWT protected routes
- Secure password hashing with bcrypt
- Mongoose schema validation

---

# ⏰ Reminder Workflow System

Reminder workflows are automatically triggered whenever a subscription is created.

The workflow:
- calculates reminder dates
- sleeps until the scheduled time
- wakes up automatically
- sends renewal reminder emails

Reminder Intervals:
- 7 days before renewal
- 5 days before renewal
- 2 days before renewal
- 1 day before renewal

Powered by:

```bash
@upstash/workflow
```

---

# 📧 Email Reminder System

Emails are sent using:
- Nodemailer
- Gmail App Passwords
- Dynamic HTML Templates

Features:
- Personalized user emails
- Renewal date formatting
- Subscription pricing details
- Payment method details
- Styled responsive email templates

---

# ⚙️ Environment Variables

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

EMAIL_PASSWORD=
ACCOUNT_EMAIL=
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/notsomohit/subscription-tracker.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Start Upstash Local Dev Server

```bash
npx @upstash/qstash-cli dev
```

---

# 🔄 Request Flow

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
MongoDB Database
   ↓
Workflow Trigger
   ↓
Upstash Workflow
   ↓
Email Reminder
```

---

# 📌 Current Status

- ✅ Authentication System
- ✅ Subscription CRUD
- ✅ Upstash Workflow Integration
- ✅ Automated Reminder Emails
- ✅ Nodemailer Integration
- ✅ Dynamic Email Templates
- ✅ Arcjet Security Integration
- ✅ Centralized Error Handling

---

# 📈 Future Improvements

- 📊 Analytics Dashboard
- 🖥️ React Frontend
- 🐳 Docker Support
- 🧪 Unit & Integration Testing
- 📱 SMS Notifications
- 🔔 Push Notifications
- 📅 Google Calendar Integration

---

# 👨‍💻 Author

Backend chaos managed by [mohit](https://github.com/notsomohit) 