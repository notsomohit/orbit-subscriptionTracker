import React from 'react';
import { Database, ShieldCheck, Clock, Mail, Layers } from 'lucide-react';
import { Card } from '../ui/Card';

export const ArchitectureOverview: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Auth & Arcjet Security',
      tech: 'jsonwebtoken • @arcjet/node',
      description: 'Incoming requests pass through Arcjet bot detection & rate limiting. Protected endpoints require valid JWT bearer tokens or cookie authorization.',
      icon: ShieldCheck,
    },
    {
      num: '02',
      title: 'Subscription CRUD & Hooks',
      tech: 'Express.js • Mongoose • MongoDB',
      description: 'Pre-save hooks auto-calculate renewalDate based on frequency (daily: 1d, weekly: 7d, monthly: 30d, yearly: 365d) and transition expired subscriptions automatically.',
      icon: Database,
    },
    {
      num: '03',
      title: 'Upstash Workflow Trigger',
      tech: '@upstash/workflow/express',
      description: 'Creating a subscription dispatches a background workflow. It schedules sleepUntil() states for 7, 5, 2, and 1 day prior to the renewal date.',
      icon: Clock,
    },
    {
      num: '04',
      title: 'Nodemailer HTML Dispatch',
      tech: 'nodemailer • Gmail SMTP',
      description: 'When a reminder timestamp arrives, the workflow wakes up and sends dynamic HTML renewal notices to the user email with price and payment details.',
      icon: Mail,
    },
  ];

  return (
    <section id="architecture" className="py-20 md:py-28 bg-[#F7F5F0] border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5D90A] border-2 border-black font-mono font-bold text-xs shadow-[2px_2px_0px_#111] uppercase tracking-wider">
            <Layers className="w-4 h-4 stroke-[2.5]" />
            <span>Under The Hood</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-black tracking-tight uppercase">
            HOW THE BACKEND PIPELINE WORKS
          </h2>

          <p className="text-neutral-800 font-medium text-base sm:text-lg leading-relaxed">
            The end-to-end execution flow of the Subscription Tracker API, from client request to database lifecycle hooks and scheduled Upstash email alerts.
          </p>
        </div>

        {/* 4-Step Technical Architecture Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.num}
                variant="white"
                borderWidth={2}
                shadow="md"
                className="p-6 flex flex-col justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-black bg-[#F5D90A] text-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#111]">
                      STEP {step.num}
                    </span>
                    <div className="w-8 h-8 bg-[#EFECE6] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#111]">
                      <Icon className="w-4 h-4 stroke-[2.5] text-black" />
                    </div>
                  </div>

                  <h3 className="text-lg font-display font-bold text-black mb-2 leading-tight">
                    {step.title}
                  </h3>

                  <div className="font-mono text-xs font-bold text-black bg-[#EFECE6] border border-black px-2 py-1 mb-3 inline-block">
                    {step.tech}
                  </div>

                  <p className="text-xs font-sans text-neutral-800 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
