import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Code, DollarSign, Shield, Mail, Calendar, ArrowUpRight } from 'lucide-react';

interface FeatureCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tag: string;
  description: string;
  hasApiLink: boolean;
}

export const LandingFeatures: React.FC = () => {
  const features: FeatureCard[] = [
    {
      icon: Bell,
      title: 'Automated Reminder Engine',
      tag: 'UPSTASH WORKFLOW',
      description: 'Calculates scheduled alert timestamps at 7, 5, 2, and 1 days prior to renewal. Sleeps serverlessly until timestamps trigger.',
      hasApiLink: true,
    },
    {
      icon: Code,
      title: 'REST API & Endpoints',
      tag: 'EXPRESS.JS ROUTER',
      description: 'Comprehensive REST endpoints for subscription CRUD operations, category filtering, user ownership, and health checks.',
      hasApiLink: true,
    },
    {
      icon: DollarSign,
      title: 'Multi-Currency Tracking',
      tag: 'CURRENCY ENGINE',
      description: 'Native formatting and tracking for USD ($), EUR (€), GBP (£), and INR (₹) across monthly and yearly cycles.',
      hasApiLink: true,
    },
    {
      icon: Shield,
      title: 'Arcjet Security & Rate Limits',
      tag: '@ARCJET/NODE',
      description: 'Shields API routes with token bucket rate limiting and bot detection. Enforces secure Bearer JWT authentication.',
      hasApiLink: true,
    },
    {
      icon: Mail,
      title: 'Dynamic Nodemailer Dispatch',
      tag: 'SMTP ENGINE',
      description: 'Auto-generates brutalist HTML reminder emails with renewal dates, plan names, prices, and account links.',
      hasApiLink: true,
    },
    {
      icon: Calendar,
      title: 'Mongoose Lifecycle Hooks',
      tag: 'AUTO-RENEWAL',
      description: 'Pre-save middleware automatically calculates future renewal dates based on daily, weekly, monthly, and yearly frequencies.',
      hasApiLink: true,
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-[#F5D90A] border-b-3 border-black text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white border-2 border-black font-mono font-bold text-xs shadow-[2px_2px_0px_#fff] uppercase tracking-wider">
            <span>CORE FUNCTIONALITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-black tracking-tight uppercase">
            BUILT FOR RELIABILITY &amp; ACCURACY
          </h2>

          <p className="text-black font-bold text-base sm:text-lg leading-relaxed">
            Everything you need to track subscriptions, automate reminder schedules, and maintain complete oversight over recurring expenses.
          </p>
        </div>

        {/* Features Grid: Solid Black Brutalist Cards with NO CTA Buttons */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-[#111111] text-white border-3 border-black p-6 flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 bg-[#F5D90A] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#fff]">
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-neutral-800 text-[#F5D90A] px-2 py-0.5 border border-neutral-700">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2 leading-tight uppercase">
                    {feat.title}
                  </h3>

                  <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Small Mono Text Link to existing API reference route (NO CTA BUTTONS) */}
                {feat.hasApiLink && (
                  <div className="pt-5 mt-4 border-t border-neutral-800">
                    <Link
                      to="/dashboard/api-specs"
                      className="inline-flex items-center gap-1.5 font-mono font-bold text-xs text-[#F5D90A] hover:underline uppercase tracking-wider"
                    >
                      <span>VIEW IN API DOCS</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
