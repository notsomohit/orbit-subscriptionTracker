import React from 'react';
import { Server, Database, ShieldCheck, Clock, Mail, Key, ArrowRight, Layers } from 'lucide-react';

export const ArchitectureOverview: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Auth & Arcjet Security Layer',
      tech: 'jsonwebtoken • @arcjet/node',
      description: 'Incoming requests pass through Arcjet bot detection & rate limiting. Protected endpoints require valid JWT bearer tokens or cookie authorization.',
      icon: ShieldCheck,
    },
    {
      num: '02',
      title: 'Subscription CRUD & Model Lifecycle',
      tech: 'Express.js • Mongoose • MongoDB',
      description: 'Pre-save hooks auto-calculate renewalDate based on frequency (daily: 1d, weekly: 7d, monthly: 30d, yearly: 365d) and transition expired subscriptions automatically.',
      icon: Database,
    },
    {
      num: '03',
      title: 'Upstash Async Workflow Trigger',
      tech: '@upstash/workflow/express',
      description: 'Creating a subscription dispatches a background workflow. It schedules sleepUntil() states for 7, 5, 2, and 1 day prior to the renewal date.',
      icon: Clock,
    },
    {
      num: '04',
      title: 'Nodemailer HTML Reminder Dispatch',
      tech: 'nodemailer • Gmail SMTP',
      description: 'When a reminder timestamp arrives, the workflow wakes up and sends dynamic HTML renewal notices to the user email with price and payment details.',
      icon: Mail,
    },
  ];

  return (
    <section id="architecture" className="py-20 md:py-28 bg-white dark:bg-[#080c14] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Under The Hood</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How The Backend Pipeline Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            The end-to-end execution flow of the Subscription Tracker API, from client request to database lifecycle hooks and scheduled Upstash email alerts.
          </p>
        </div>

        {/* Asymmetric 4-Step Technical Architecture Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-slate-50/80 dark:bg-[#0d1222] border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                      STEP {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {step.title}
                  </h3>

                  <div className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 mb-3">
                    {step.tech}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
