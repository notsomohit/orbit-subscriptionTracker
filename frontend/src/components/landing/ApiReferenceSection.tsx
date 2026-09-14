import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

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
    <section id="api-reference" data-id="api" className="py-12 md:py-16 bg-[#F7F5F0] border-b-3 border-black">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5D90A] border-2 border-black font-mono font-bold text-xs shadow-[2px_2px_0px_#111] uppercase tracking-wider">
            <Terminal className="w-4 h-4 stroke-[2.5]" />
            <span>REST API Contracts</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-display font-black text-black tracking-tight uppercase leading-tight">
            STANDARDIZED API SPECIFICATIONS
          </h2>

          <p className="text-neutral-800 font-medium text-sm sm:text-base leading-relaxed">
            All endpoints return structured `ApiResponse` payloads (`statusCode`, `message`, `data`) with centralized `ApiError` validation handlers.
          </p>
        </div>

        {/* Endpoints Nav + Code Viewer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Endpoint Buttons (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            {[
              { id: 'createSub', method: 'POST', label: 'Create Subscription', path: '/subscription' },
              { id: 'getSubs', method: 'GET', label: 'Fetch User Subs', path: '/subscription' },
              { id: 'signUp', method: 'POST', label: 'User Sign Up', path: '/auth/sign-up' },
              { id: 'login', method: 'POST', label: 'User Log In', path: '/auth/log-in' },
            ].map((item) => {
              const isSelected = activeEndpoint === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveEndpoint(item.id as any)}
                  className={`
                    w-full text-left p-3.5 border-2 border-black transition-all duration-100 flex items-center justify-between
                    ${isSelected
                      ? 'bg-[#F5D90A] shadow-[2px_2px_0px_#111] translate-x-[2px] translate-y-[2px]'
                      : 'bg-white shadow-[4px_4px_0px_#111] hover:bg-[#FAF9F5]'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`
                        font-mono text-[10px] font-black px-2 py-0.5 border border-black shadow-[1px_1px_0px_#111]
                        ${item.method === 'POST' ? 'bg-black text-[#F5D90A]' : 'bg-[#22C55E] text-black'}
                      `}
                    >
                      {item.method}
                    </span>
                    <span className="text-xs font-mono font-bold text-black">{item.path}</span>
                  </div>
                  <span className="text-[11px] font-display font-bold text-neutral-800 hidden sm:inline uppercase">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Code Viewer (8 cols) */}
          <div className="lg:col-span-8 bg-[#111111] border-3 border-black shadow-[8px_8px_0px_#111] overflow-hidden text-white">
            
            {/* Top Bar */}
            <div className="p-3.5 bg-black border-b-2 border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`
                    font-mono text-xs font-black px-2.5 py-0.5 border border-black
                    ${current.method === 'POST' ? 'bg-[#F5D90A] text-black' : 'bg-[#22C55E] text-black'}
                  `}
                >
                  {current.method}
                </span>
                <span className="font-mono text-xs text-white font-bold">{current.path}</span>
                <span className="text-[11px] font-mono text-[#F5D90A] hidden sm:inline font-bold">[{current.auth}]</span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 bg-white text-black font-mono text-xs font-bold border-2 border-black shadow-[2px_2px_0px_#F5D90A] hover:bg-[#F5D90A] transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 stroke-[3] text-black" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
                <span>{copied ? 'COPIED!' : 'COPY CURL'}</span>
              </button>
            </div>

            {/* Description */}
            <div className="px-5 py-3 bg-[#1A1A1A] border-b border-neutral-800 text-xs font-sans text-neutral-300 font-medium">
              {current.description}
            </div>

            {/* Request Block */}
            <div className="p-5 font-mono text-xs space-y-4 overflow-x-auto">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#F5D90A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#F5D90A] inline-block" />
                  <span>REQUEST CURL COMMAND</span>
                </div>
                <pre className="bg-[#181818] p-4 border-2 border-neutral-800 text-neutral-100 whitespace-pre overflow-x-auto">
                  <code>{current.request}</code>
                </pre>
              </div>

              <div>
                <div className="text-[10px] font-mono font-bold text-[#22C55E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#22C55E] inline-block" />
                  <span>TYPICAL JSON RESPONSE</span>
                </div>
                <pre className="bg-[#181818] p-4 border-2 border-neutral-800 text-neutral-100 whitespace-pre overflow-x-auto">
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
