import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, Server } from 'lucide-react';

export const ApiReferenceSection: React.FC = () => {
  const [activeEndpoint, setActiveEndpoint] = useState<'createSub' | 'getSubs' | 'login' | 'signUp'>('createSub');
  const [copied, setCopied] = useState(false);

  const endpointData = {
    createSub: {
      method: 'POST',
      path: '/api/v1/subscription',
      auth: 'Bearer JWT Required',
      description: 'Creates a new subscription, validates required fields, computes renewalDate, and triggers the Upstash reminder workflow.',
      request: `curl -X POST http://localhost:5500/api/v1/subscription \\
  -H "Authorization: Bearer <your_jwt_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "GitHub Copilot",
    "price": 19,
    "currency": "USD",
    "frequency": "monthly",
    "category": "technology",
    "paymentMethod": "Credit Card (Visa •••• 4242)",
    "startDate": "2026-08-01"
  }'`,
      response: `{
  "statusCode": 201,
  "message": "subscrition was successfully created",
  "data": {
    "subscription": {
      "_id": "66d101a09f821",
      "name": "GitHub Copilot",
      "price": 19,
      "currency": "USD",
      "frequency": "monthly",
      "category": "technology",
      "paymentMethod": "Credit Card (Visa •••• 4242)",
      "status": "active",
      "startDate": "2026-08-01T00:00:00.000Z",
      "renewalDate": "2026-09-01T00:00:00.000Z",
      "user": "66c28f9901aa92110293",
      "createdAt": "2026-08-01T10:00:00.000Z",
      "updatedAt": "2026-08-01T10:00:00.000Z"
    },
    "workflowRunId": "wfr_01J6G7288AQ9K"
  }
}`,
    },
    getSubs: {
      method: 'GET',
      path: '/api/v1/subscription',
      auth: 'Bearer JWT Required',
      description: 'Fetches all subscriptions owned by the authenticated user from MongoDB.',
      request: `curl -X GET http://localhost:5500/api/v1/subscription \\
  -H "Authorization: Bearer <your_jwt_token>"`,
      response: `{
  "statusCode": 200,
  "message": "subscriptions succesfully fetched",
  "data": [
    {
      "_id": "66d101a09f821",
      "name": "GitHub Copilot",
      "price": 19,
      "currency": "USD",
      "frequency": "monthly",
      "category": "technology",
      "paymentMethod": "Credit Card",
      "status": "active",
      "startDate": "2026-08-01T00:00:00.000Z",
      "renewalDate": "2026-09-01T00:00:00.000Z"
    }
  ]
}`,
    },
    signUp: {
      method: 'POST',
      path: '/api/v1/auth/sign-up',
      auth: 'Public',
      description: 'Registers a new user, hashes password with bcrypt, and sets HTTP-only JWT token cookie.',
      request: `curl -X POST http://localhost:5500/api/v1/auth/sign-up \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Mohit",
    "email": "mohit@example.com",
    "password": "strongpassword123"
  }'`,
      response: `{
  "statusCode": 201,
  "message": "user created successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "66c28f9901aa92110293",
      "name": "mohit",
      "email": "mohit@example.com"
    }
  }
}`,
    },
    login: {
      method: 'POST',
      path: '/api/v1/auth/log-in',
      auth: 'Public',
      description: 'Authenticates existing user with email and password, returning JWT token.',
      request: `curl -X POST http://localhost:5500/api/v1/auth/log-in \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "mohit@example.com",
    "password": "strongpassword123"
  }'`,
      response: `{
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "66c28f9901aa92110293",
      "name": "mohit",
      "email": "mohit@example.com"
    }
  }
}`,
    },
  };

  const current = endpointData[activeEndpoint];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.request);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="py-20 md:py-28 bg-white dark:bg-[#080c14] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>REST API Endpoints</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Standardized API Contracts
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            All endpoints return structured `ApiResponse` payloads (`statusCode`, `message`, `data`) and centralized `ApiError` handlers.
          </p>
        </div>

        {/* Endpoints Nav + Code Viewer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Endpoint Buttons (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            {[
              { id: 'createSub', method: 'POST', label: 'Create Subscription', path: '/subscription' },
              { id: 'getSubs', method: 'GET', label: 'Fetch User Subscriptions', path: '/subscription' },
              { id: 'signUp', method: 'POST', label: 'User Sign Up', path: '/auth/sign-up' },
              { id: 'login', method: 'POST', label: 'User Log In', path: '/auth/log-in' },
            ].map((item) => {
              const isSelected = activeEndpoint === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveEndpoint(item.id as any)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-[#0e1424] border-indigo-600 text-slate-900 dark:text-white font-semibold'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.method === 'POST'
                          ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                          : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      }`}
                    >
                      {item.method}
                    </span>
                    <span className="text-xs font-mono">{item.path}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-sans hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Code Viewer (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl bg-[#090d18] border border-slate-800 shadow-xl overflow-hidden">
            
            {/* Top Bar */}
            <div className="p-4 bg-[#060911] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    current.method === 'POST'
                      ? 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}
                >
                  {current.method}
                </span>
                <span className="font-mono text-xs text-white">{current.path}</span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">({current.auth})</span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>

            {/* Description */}
            <div className="px-5 py-3 bg-slate-900/40 border-b border-slate-800/60 text-xs text-slate-400">
              {current.description}
            </div>

            {/* Request Block */}
            <div className="p-5 font-mono text-xs text-slate-300 space-y-4 overflow-x-auto">
              <div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Request Command
                </div>
                <pre className="bg-[#05070e] p-3.5 rounded-xl border border-slate-800/80 text-indigo-300 whitespace-pre">
                  <code>{current.request}</code>
                </pre>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Response Body
                </div>
                <pre className="bg-[#05070e] p-3.5 rounded-xl border border-slate-800/80 text-emerald-300 whitespace-pre">
                  <code>{current.response}</code>
                </pre>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
