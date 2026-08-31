import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, CheckCircle2, Clock } from 'lucide-react';
import { OrbitHeroGraphic } from './OrbitHeroGraphic';
import { useAuth } from '../../context/AuthContext';

export const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Authentic Technical Proposition */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Tech Stack Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/60 text-indigo-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>Express.js • MongoDB • Upstash Workflow • Nodemailer</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Every subscription. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-purple-400">
                In one unified orbit.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Orbit monitors your recurring subscription lifecycle with automated background workflows. Track renewal dates, trigger email reminders at 7, 5, 2, and 1 days before billing, and protect endpoints with Arcjet security.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02]"
              >
                <span>{isAuthenticated ? 'Open Dashboard' : 'Launch Console'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#workflows"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 bg-slate-900/80 border border-slate-800 hover:bg-slate-800 rounded-xl transition-all"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>See Email Reminders</span>
              </a>
            </div>

            {/* Real Stack Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Mongoose Renewal Calculations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Upstash `sleepUntil()` Workflows</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Arcjet Rate Limiting</span>
              </div>
            </div>
          </div>

          {/* Right Column: Orbiting Subscriptions Visual */}
          <div className="lg:col-span-6 flex justify-center py-6 lg:py-0">
            <OrbitHeroGraphic />
          </div>

        </div>
      </div>
    </section>
  );
};
