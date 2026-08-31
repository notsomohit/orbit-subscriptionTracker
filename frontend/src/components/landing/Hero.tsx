import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { OrbitHeroGraphic } from './OrbitHeroGraphic';
import { useAuth } from '../../context/AuthContext';

export const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-pattern bg-grain-texture">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-950/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Authentic Technical Proposition */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Tech Stack Row - Plain small text, no pill background */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-xs text-slate-500 font-mono">
              <span>Express.js</span>
              <span className="text-slate-700">•</span>
              <span>MongoDB</span>
              <span className="text-slate-700">•</span>
              <span>Upstash Workflow</span>
              <span className="text-slate-700">•</span>
              <span>Nodemailer</span>
            </div>

            {/* Headline with flat accent color (no gradient) & display typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-display">
              Every subscription. <br />
              <span className="text-cyan-400">
                In one unified orbit.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Orbit monitors your recurring subscription lifecycle with automated background workflows. Track renewal dates, trigger email reminders at 7, 5, 2, and 1 days before billing, and protect endpoints with Arcjet security.
            </p>

            {/* Actions with distinct visual weight and animated moving gradient border on primary */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              
              {/* Primary CTA: Glowing Shimmering Border Button */}
              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="relative w-full sm:w-auto inline-flex items-center justify-center p-[1.5px] overflow-hidden rounded-lg font-semibold text-white group hover:scale-[1.02] transition-transform duration-200"
              >
                {/* Continuous rotating conic gradient border */}
                <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(6,182,212,0.15)_0%,#06b6d4_40%,#6366f1_60%,rgba(6,182,212,0.15)_100%)]" />
                
                {/* Button inside content */}
                <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[7px] bg-[#0b0f19] hover:bg-[#111726] text-sm font-bold relative z-10 transition-colors duration-200">
                  <span>{isAuthenticated ? 'Open Dashboard' : 'Launch Console'}</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </span>
              </Link>

              {/* Secondary CTA: Low contrast ghost outline */}
              <a
                href="#workflows"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-400 bg-transparent border border-slate-800 hover:bg-slate-900/60 hover:text-white rounded-lg transition-all"
              >
                <Mail className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                <span>See Email Reminders</span>
              </a>
            </div>

            {/* Real Stack Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>Mongoose Lifecycle Hooks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>Upstash Workflow sleepUntil</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>Arcjet Bot Protection</span>
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetric offset & slight viewport bleed */}
          <div className="lg:col-span-6 flex justify-center py-6 lg:py-0 lg:translate-x-10 xl:translate-x-16 lg:scale-105 transition-transform duration-300">
            <OrbitHeroGraphic />
          </div>

        </div>
      </div>
    </section>
  );
};
