import React, { useState } from 'react';
import { Mail, Clock, CheckCircle2, ArrowRight, Bell, Calendar, Send, Shield } from 'lucide-react';

export const WorkflowEngine: React.FC = () => {
  const [selectedInterval, setSelectedInterval] = useState<7 | 5 | 2 | 1>(7);

  const remindersConfig = {
    7: {
      days: 7,
      label: '7 days before reminder',
      subject: '📅 Reminder: Your GitHub Copilot Subscription Renews in 7 Days!',
      heading: 'First Early Warning Notice',
      description: 'Scheduled 7 days prior to renewalDate. Upstash Workflow sleeps until the exact timestamp, wakes up, and sends this email via Nodemailer.',
    },
    5: {
      days: 5,
      label: '5 days before reminder',
      subject: '⏳ GitHub Copilot Renews in 5 Days – Stay Subscribed!',
      heading: 'Mid-Cycle Confirmation',
      description: 'Dispatched 5 days before renewal to prompt users to review usage or update payment details.',
    },
    2: {
      days: 2,
      label: '2 days before reminder',
      subject: '🚀 2 Days Left! GitHub Copilot Subscription Renewal',
      heading: 'High-Priority Alert',
      description: 'Dispatched 48 hours prior to charge date with full pricing and payment method breakdown.',
    },
    1: {
      days: 1,
      label: '1 day before reminder',
      subject: '⚡ Final Reminder: GitHub Copilot Renews Tomorrow!',
      heading: 'Final Renewal Warning',
      description: 'Sent 24 hours before renewal date so the user can cancel in account settings if desired before automatic billing occurs.',
    },
  };

  const activeReminder = remindersConfig[selectedInterval];

  return (
    <section id="workflows" className="py-20 md:py-28 bg-slate-50/70 dark:bg-[#070b12] border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Upstash Workflow + Nodemailer Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Automated 4-Stage Renewal Email Workflow
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            When a subscription is created, a background workflow is registered with Upstash (`/api/v1/workflows/subscription/reminder`). It calculates dates for <strong>7, 5, 2, and 1 day</strong> before renewal, asynchronously sleeps, and dispatches dynamic HTML templates.
          </p>
        </div>

        {/* Interactive Workflow Visualizer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Timeline Selectors (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Workflow Sleep Intervals (`REMINDERS = [7, 5, 2, 1]`)
            </h3>

            {([7, 5, 2, 1] as const).map((days) => {
              const item = remindersConfig[days];
              const isSelected = selectedInterval === days;

              return (
                <button
                  key={days}
                  onClick={() => setSelectedInterval(days)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-white dark:bg-[#0e1424] border-indigo-600 dark:border-indigo-500 shadow-md ring-1 ring-indigo-500'
                      : 'bg-white/60 dark:bg-[#0a0e1a] border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {days}d
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.heading}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        -{days} days
                      </span>
                    </div>
                    <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 truncate mt-1">
                      {item.subject}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Exact HTML Email Template Preview (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              
              {/* Email Client Header */}
              <div className="p-4 bg-slate-100 dark:bg-[#080b15] border-b border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-slate-900 dark:text-white">Nodemailer Dispatch Preview</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">Gmail SMTP</span>
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                  <strong>Subject:</strong> {activeReminder.subject}
                </div>
                <div className="text-slate-500 font-mono text-[10px]">
                  <strong>To:</strong> mohit@orbit.dev • <strong>Template:</strong> email_templates.js
                </div>
              </div>

              {/* Email Body from email_templates.js */}
              <div className="p-6 bg-[#f4f7fa] dark:bg-[#070a14] text-slate-800 dark:text-slate-200">
                <div className="max-w-md mx-auto bg-white dark:bg-[#0e1424] rounded-xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden text-xs sm:text-sm">
                  
                  {/* Email Banner Header */}
                  <div className="bg-[#4a90e2] text-center py-5">
                    <span className="text-2xl font-extrabold text-white tracking-wide">
                      Orbit
                    </span>
                  </div>

                  {/* Email Inner Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-slate-800 dark:text-slate-200">
                      Hello <strong className="text-[#4a90e2]">Mohit</strong>,
                    </p>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Your <strong>GitHub Copilot</strong> subscription is set to renew on{' '}
                      <strong className="text-[#4a90e2]">September 1, 2026</strong> ({selectedInterval} day{selectedInterval > 1 ? 's' : ''} from today).
                    </p>

                    {/* Details Table */}
                    <div className="bg-[#f0f7ff] dark:bg-[#11192e] rounded-lg p-3.5 border border-[#d0e3ff] dark:border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between border-b border-[#d0e3ff] dark:border-slate-800/80 pb-1.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Plan:</span>
                        <span className="font-medium text-slate-900 dark:text-white">GitHub Copilot Business</span>
                      </div>
                      <div className="flex justify-between border-b border-[#d0e3ff] dark:border-slate-800/80 pb-1.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Price:</span>
                        <span className="font-bold text-slate-900 dark:text-white">$19.00 USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Payment Method:</span>
                        <span className="font-medium text-slate-900 dark:text-white">Credit Card (Visa •••• 4242)</span>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      If you'd like to make changes or cancel your subscription, visit your{' '}
                      <a href="#dashboard" className="text-[#4a90e2] font-semibold underline">
                        account settings
                      </a>{' '}
                      before the renewal date.
                    </p>

                    <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
                      Best regards,<br />
                      <strong>The Orbit Team</strong>
                    </div>
                  </div>

                  {/* Email Footer */}
                  <div className="bg-[#f0f7ff] dark:bg-[#0b101f] p-3 text-center text-[10px] text-slate-500 border-t border-[#d0e3ff] dark:border-slate-800">
                    © 2026 Orbit. All rights reserved. • Manage Subscription • Support
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
