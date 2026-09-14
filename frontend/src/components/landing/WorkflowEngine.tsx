import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

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
    <section id="workflows" className="py-12 md:py-16 bg-white border-b-3 border-black">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5D90A] border-2 border-black font-mono font-bold text-xs shadow-[2px_2px_0px_#111] uppercase tracking-wider">
            <Clock className="w-4 h-4 stroke-[2.5]" />
            <span>Upstash Workflow + Nodemailer Engine</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-display font-black text-black tracking-tight uppercase leading-tight">
            AUTOMATED 4-STAGE RENEWAL WORKFLOW
          </h2>

          <p className="text-neutral-800 font-medium text-sm sm:text-base leading-relaxed">
            When a subscription is created, a background workflow is registered with Upstash (`/api/v1/workflows/subscription/reminder`). It calculates dates for <strong>7, 5, 2, and 1 day</strong> before renewal, asynchronously sleeps, and dispatches dynamic HTML templates.
          </p>
        </div>

        {/* Interactive Workflow Visualizer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Timeline Selectors (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono font-black uppercase tracking-wider text-black mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-black inline-block" />
              <span>REMINDERS = [7, 5, 2, 1] INTERVALS</span>
            </div>

            {([7, 5, 2, 1] as const).map((days) => {
              const item = remindersConfig[days];
              const isSelected = selectedInterval === days;

              return (
                <button
                  key={days}
                  onClick={() => setSelectedInterval(days)}
                  className={`
                    w-full text-left p-4 border-2 border-black transition-all duration-100 flex items-start gap-3.5
                    ${isSelected
                      ? 'bg-[#F5D90A] shadow-[2px_2px_0px_#111] translate-x-[2px] translate-y-[2px]'
                      : 'bg-[#F7F5F0] shadow-[4px_4px_0px_#111] hover:bg-white'
                    }
                  `}
                >
                  <div
                    className={`
                      w-9 h-9 border-2 border-black flex items-center justify-center font-display font-black text-sm shrink-0 shadow-[1px_1px_0px_#111]
                      ${isSelected ? 'bg-black text-white' : 'bg-white text-black'}
                    `}
                  >
                    {days}d
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-display font-bold text-sm text-black uppercase">
                        {item.heading}
                      </div>
                      <Badge variant="outline" size="sm">
                        -{days}d
                      </Badge>
                    </div>
                    <div className="font-mono text-xs font-bold text-black truncate mt-1 bg-white/70 px-1 py-0.5 border border-black/30 inline-block max-w-full">
                      {item.subject}
                    </div>
                    <p className="text-xs font-sans text-neutral-800 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Exact HTML Email Template Preview (7 cols) */}
          <div className="lg:col-span-7">
            <Card variant="white" borderWidth={3} shadow="lg" className="overflow-hidden">
              
              {/* Email Client Header */}
              <div className="p-4 bg-[#EFECE6] border-b-2 border-black text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#22C55E] border border-black inline-block" />
                    <span className="font-display font-bold uppercase tracking-wider text-black">
                      Nodemailer Dispatch Simulator
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold bg-white border border-black px-2 py-0.5 shadow-[1px_1px_0px_#111]">
                    Gmail SMTP
                  </span>
                </div>
                <div className="font-mono text-xs font-semibold text-black">
                  <span className="bg-black text-white px-1 mr-1">SUBJECT</span> {activeReminder.subject}
                </div>
                <div className="font-mono text-[11px] text-neutral-700">
                  <strong>TO:</strong> user@orbit.dev • <strong>TEMPLATE:</strong> email_templates.js
                </div>
              </div>

              {/* Email Body Preview */}
              <div className="p-6 sm:p-8 bg-[#F7F5F0]">
                <div className="max-w-md mx-auto bg-white border-2 border-black shadow-[4px_4px_0px_#111] overflow-hidden text-xs sm:text-sm">
                  
                  {/* Email Banner Header */}
                  <div className="bg-[#F5D90A] border-b-2 border-black text-center py-5">
                    <span className="text-2xl font-display font-black text-black tracking-widest uppercase">
                      ORBIT
                    </span>
                  </div>

                  {/* Email Inner Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-black font-medium">
                      Hello <strong className="underline decoration-2 decoration-[#F5D90A]">Mohit</strong>,
                    </p>

                    <p className="text-neutral-800 leading-relaxed font-sans">
                      Your <strong>GitHub Copilot</strong> subscription is set to renew on{' '}
                      <strong className="font-mono bg-[#F5D90A] px-1 border border-black">September 1, 2026</strong> ({selectedInterval} day{selectedInterval > 1 ? 's' : ''} from today).
                    </p>

                    {/* Details Table */}
                    <div className="bg-[#FAF9F5] border-2 border-black p-4 space-y-2.5 text-xs">
                      <div className="flex justify-between border-b border-black/20 pb-1.5 font-mono">
                        <span className="font-bold text-neutral-600 uppercase">Plan:</span>
                        <span className="font-black text-black">GitHub Copilot Business</span>
                      </div>
                      <div className="flex justify-between border-b border-black/20 pb-1.5 font-mono">
                        <span className="font-bold text-neutral-600 uppercase">Price:</span>
                        <span className="font-black text-black text-sm">$19.00 USD</span>
                      </div>
                      <div className="flex justify-between font-mono">
                        <span className="font-bold text-neutral-600 uppercase">Payment:</span>
                        <span className="font-black text-black">Visa •••• 4242</span>
                      </div>
                    </div>

                    <p className="text-neutral-700 text-xs leading-relaxed font-sans">
                      If you'd like to make changes or cancel your subscription, visit your{' '}
                      <a href="#dashboard" className="font-bold text-black underline">
                        account settings
                      </a>{' '}
                      before the renewal date.
                    </p>

                    <div className="pt-2 text-xs text-black font-display font-bold">
                      Best regards,<br />
                      <span>THE ORBIT TEAM</span>
                    </div>
                  </div>

                  {/* Email Footer */}
                  <div className="bg-[#EFECE6] p-3 text-center text-[10px] font-mono text-black border-t-2 border-black font-bold">
                    © 2026 ORBIT. ALL RIGHTS RESERVED.
                  </div>
                </div>
              </div>

            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};
