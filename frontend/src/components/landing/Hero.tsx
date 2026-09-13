import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Check } from 'lucide-react';
import { OrbitHeroGraphic } from './OrbitHeroGraphic';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#F7F5F0] border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Authentic Technical Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono font-bold">
              <span className="px-2.5 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_#111]">
                EXPRESS.JS
              </span>
              <span className="px-2.5 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_#111]">
                MONGODB
              </span>
              <span className="px-2.5 py-1 bg-[#F5D90A] border-2 border-black shadow-[2px_2px_0px_#111]">
                UPSTASH WORKFLOW
              </span>
              <span className="px-2.5 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_#111]">
                NODEMAILER
              </span>
            </div>

            {/* Headline with Neo-Brutalist heavy fonts and high contrast */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-black leading-[1.05] tracking-tight">
              EVERY SUBSCRIPTION. <br />
              <span className="inline-block mt-2 bg-[#F5D90A] px-3 py-1 border-3 border-black shadow-[5px_5px_0px_#111]">
                ONE UNIFIED ORBIT.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-neutral-800 max-w-xl font-medium leading-relaxed">
              Orbit monitors your recurring subscription lifecycle with automated background workflows. Track renewal dates, trigger email reminders at 7, 5, 2, and 1 days before billing, and protect endpoints with Arcjet security.
            </p>

            {/* Actions with tactile Neo-Brutalist buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="w-full sm:w-auto"
              >
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-3 text-base">
                  <span>{isAuthenticated ? 'OPEN DASHBOARD' : 'LAUNCH CONSOLE'}</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </Button>
              </Link>

              <a
                href="#workflows"
                className="w-full sm:w-auto"
              >
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-3 text-base">
                  <Mail className="w-5 h-5 stroke-[2.5]" />
                  <span>SEE EMAIL REMINDERS</span>
                </Button>
              </a>
            </div>

            {/* Real Stack Highlights with sharp brutalist checkmarks */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-xs font-mono font-bold text-black">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-[#22C55E] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#111]">
                  <Check className="w-3.5 h-3.5 stroke-[3] text-black" />
                </span>
                <span>Mongoose Lifecycle Hooks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-[#22C55E] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#111]">
                  <Check className="w-3.5 h-3.5 stroke-[3] text-black" />
                </span>
                <span>Upstash Workflow sleepUntil</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-[#22C55E] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#111]">
                  <Check className="w-3.5 h-3.5 stroke-[3] text-black" />
                </span>
                <span>Arcjet Rate Protection</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic */}
          <div className="lg:col-span-5 flex justify-center py-4 lg:py-0">
            <OrbitHeroGraphic />
          </div>

        </div>
      </div>
    </section>
  );
};
