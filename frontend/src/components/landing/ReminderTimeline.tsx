import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface TimelineStep {
  days: number;
  stepNum: string;
  badgeText: string;
  heading: string;
  subject: string;
  description: string;
  isYellow: boolean;
}

export const ReminderTimeline: React.FC = () => {
  const steps: TimelineStep[] = [
    {
      days: 7,
      stepNum: '01',
      badgeText: '7 DAYS BEFORE',
      heading: 'First Early Warning Notice',
      subject: '📅 Reminder: Your GitHub Copilot Subscription Renews in 7 Days!',
      description: 'Scheduled 7 days prior to renewalDate. Upstash Workflow sleeps until timestamp, wakes up, and sends via Nodemailer.',
      isYellow: true,
    },
    {
      days: 5,
      stepNum: '02',
      badgeText: '5 DAYS BEFORE',
      heading: 'Mid-Cycle Confirmation',
      subject: '⏳ GitHub Copilot Renews in 5 Days – Stay Subscribed!',
      description: 'Dispatched 5 days before renewal to prompt users to review usage or update payment details.',
      isYellow: false,
    },
    {
      days: 2,
      stepNum: '03',
      badgeText: '2 DAYS BEFORE',
      heading: 'High-Priority Alert',
      subject: '🚀 2 Days Left! GitHub Copilot Subscription Renewal',
      description: 'Dispatched 48 hours prior to charge date with full pricing and payment method breakdown.',
      isYellow: true,
    },
    {
      days: 1,
      stepNum: '04',
      badgeText: '24 HOURS BEFORE',
      heading: 'Final Renewal Warning',
      subject: '⚡ Final Reminder: GitHub Copilot Renews Tomorrow!',
      description: 'Sent 24 hours before renewal date so the user can cancel in account settings if desired.',
      isYellow: false,
    },
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-16 bg-[#F7F5F0] border-b-3 border-black scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5D90A] border-2 border-black font-mono font-bold text-xs shadow-[2px_2px_0px_#111] uppercase tracking-wider">
            <Clock className="w-4 h-4 stroke-[2.5]" />
            <span>HOW IT WORKS · TIMELINE ENGINE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-display font-black text-black tracking-tight uppercase leading-tight">
            THE 4-STAGE RENEWAL TIMELINE
          </h2>

          <p className="text-neutral-800 font-medium text-sm sm:text-base leading-relaxed">
            When you add a subscription, Orbit registers an automated serverless workflow with Upstash. We calculate exact renewal alert timestamps and dispatch dynamic email notifications at 7, 5, 2, and 1 days before you get billed.
          </p>
        </div>

        {/* 4 Connected Alternating Yellow/White Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.days}
              className={`
                border-3 border-black p-6 flex flex-col justify-between transition-all duration-100 relative
                ${step.isYellow 
                  ? 'bg-[#F5D90A] text-black shadow-[6px_6px_0px_#111]' 
                  : 'bg-white text-black shadow-[6px_6px_0px_#111]'
                }
              `}
            >
              {/* Card Header: Step & Days Badge */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
                  <span className="font-mono text-xs font-black bg-black text-white px-2 py-0.5 border border-black">
                    STAGE {step.stepNum}
                  </span>
                  <span className="font-mono text-xs font-black uppercase tracking-wider">
                    {step.badgeText}
                  </span>
                </div>

                <div className="font-display font-black text-3xl mb-2 text-black">
                  -{step.days}d
                </div>

                <h3 className="font-display font-bold text-base uppercase text-black mb-2 leading-tight">
                  {step.heading}
                </h3>

                {/* Email Subject Tag */}
                <div className="font-mono text-[11px] font-bold bg-white text-black p-2 border-2 border-black shadow-[2px_2px_0px_#111] mb-3 leading-snug break-words">
                  {step.subject}
                </div>

                {/* Description pulled directly from workflows page */}
                <p className="font-sans text-xs text-neutral-900 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              {/* Status footer pill (NO CTA button) */}
              <div className="mt-5 pt-3 border-t-2 border-black/30 flex items-center justify-between text-[11px] font-mono font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#22C55E] border border-black inline-block" />
                  <span>DISPATCH T-{step.days}D</span>
                </span>
                {idx < 3 ? <span className="text-sm">→</span> : <span className="text-sm">✓</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom: ONE Single Black Brutalist CTA Button to /signup */}
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link to="/signup">
            <Button variant="dark" size="lg" className="gap-3 text-base shadow-[5px_5px_0px_#F5D90A]">
              <span>GET STARTED FREE</span>
              <ArrowRight className="w-5 h-5 stroke-[3] text-[#F5D90A]" />
            </Button>
          </Link>
          <span className="font-mono text-xs font-bold uppercase text-neutral-600">
            NO CREDIT CARD REQUIRED · INSTANT ACCESS
          </span>
        </div>

      </div>
    </section>
  );
};
