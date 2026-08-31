import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Shield, Mail, CheckCircle2, Clock, Play } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Technical Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tech Stack Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              <span>Express.js • MongoDB • Upstash Workflow • Nodemailer</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Track every subscription. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 dark:from-indigo-400 dark:via-indigo-300 dark:to-purple-400">
                Automate renewal alerts before you get billed.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
              Orbit manages your recurring subscription lifecycle with automated background workflows. Calculate exact renewal cycles, receive dynamic email warnings at 7, 5, 2, and 1 days out, and enforce Arcjet bot security.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02]"
              >
                <span>Launch Interactive Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#workflows"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-all"
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>See Email Reminder Workflow</span>
              </a>

              <a
                href="#api"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>REST Routes</span>
              </a>
            </div>

            {/* Verified Capabilities */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Mongoose Pre-Save Lifecycle</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Upstash Workflow `sleepUntil()`</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Arcjet Rate Limiting</span>
              </div>
            </div>
          </div>

          {/* Right Column: Real Schema & Workflow Run Payload Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#090d18] border border-slate-800 shadow-2xl overflow-hidden">
              
              {/* Window Bar */}
              <div className="px-4 py-3 bg-[#060911] border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-xs text-slate-400">POST /api/v1/subscription</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] border border-emerald-800">
                  201 Created
                </span>
              </div>

              {/* Body */}
              <div className="p-4 font-mono text-xs text-slate-300 space-y-3 leading-relaxed overflow-x-auto">
                <div className="text-slate-500">// Response Payload with Workflow Trigger</div>
                <div className="text-indigo-300">
                  {`{
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
      "renewalDate": "2026-09-01T00:00:00.000Z"
    },
    "workflowRunId": "wfr_01J6G7288AQ9K"
  }
}`}
                </div>
              </div>

              {/* Attached Workflow Notification */}
              <div className="p-3 bg-indigo-950/40 border-t border-slate-800 text-xs flex items-center justify-between text-indigo-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
                  <span>Upstash Workflow: Sleeping until 7-day reminder</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">@upstash/workflow</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
