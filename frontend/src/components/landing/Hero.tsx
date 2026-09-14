import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Check } from 'lucide-react';
import { OrbitHeroGraphic } from './OrbitHeroGraphic';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import clumsySvg from '../../assets/illustrations/clumsy.svg';

export const Hero: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const targetDestination = isAuthenticated ? '/dashboard' : '/signup';

  return (
    <section className="relative py-10 md:py-14 bg-[#F7F5F0] border-b-3 border-black">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Proposition */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Logged in Welcome Greeting */}
            {isAuthenticated && user?.name && (
              <div className="inline-flex items-center gap-2 bg-[#F5D90A] border-2 border-black px-3 py-1 font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#111]">
                <span>👋</span>
                <span>WELCOME BACK, {user.name}!</span>
              </div>
            )}

            {/* Headline with STILL PAYING highlighted in brutalist yellow block (capped ~60px) */}
            <h1 className="text-3xl sm:text-5xl lg:text-[58px] lg:leading-[1.1] font-display font-black text-black tracking-tight uppercase px-1 sm:px-0">
              YOU'RE{' '}
              <span className="inline-block bg-[#F5D90A] px-2 py-0.5 border-3 border-black shadow-[3px_3px_0px_#111] sm:shadow-[4px_4px_0px_#111]">
                STILL PAYING
              </span>{' '}
              FOR THAT?
            </h1>

            {/* Short Outcome-Driven Subtext (16-18px body) */}
            <p className="text-sm sm:text-base text-neutral-800 max-w-xl font-medium leading-relaxed">
              Orbit tracks every subscription, renews nothing you forgot, and emails you 7, 5, 2 &amp; 1 days before you're billed.
            </p>

            {/* Actions: Primary CTA + Free Badge + How It Works */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link to={targetDestination} className="w-full sm:w-auto">
                  <Button variant="primary" size="md" className="w-full sm:w-auto gap-2.5 text-sm">
                    <span>OPEN DASHBOARD</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </Button>
                </Link>

                <span className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-2 bg-white border-2 border-black font-mono font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#111] select-none text-black">
                  ★ FREE · NO CARD REQUIRED
                </span>
              </div>

              <div className="pt-0.5 flex justify-center lg:justify-start">
                <a href="#how-it-works">
                  <Button variant="secondary" size="sm" className="gap-2 text-xs">
                    <span>HOW IT WORKS ↓</span>
                    <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Button>
                </a>
              </div>
            </div>

            {/* STANDALONE Clumsy Illustration: under "HOW IT WORKS" button, above trust checklist. Never overlaps demo card */}
            <div className="py-2 flex justify-center lg:justify-start">
              <img
                src={clumsySvg}
                alt="Subscription chaos illustration"
                className="w-[200px] sm:w-[220px] md:w-[240px] max-w-full h-auto select-none pointer-events-none animate-float-clumsy"
              />
            </div>

            {/* User Benefits Checklist */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-5 text-xs font-mono font-bold text-black">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#22C55E] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#111]">
                  <Check className="w-3 h-3 stroke-[3] text-black" />
                </span>
                <span>Email reminders at 7/5/2/1 days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#22C55E] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#111]">
                  <Check className="w-3 h-3 stroke-[3] text-black" />
                </span>
                <span>Multi-currency (USD, EUR, INR)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#22C55E] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#111]">
                  <Check className="w-3 h-3 stroke-[3] text-black" />
                </span>
                <span>Free to start, no card required</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic - Zero overlapping illustration, clean standalone presentation */}
          <div className="lg:col-span-5 flex justify-center relative py-4 lg:py-0">
            <div className="relative z-10 w-full flex justify-center">
              <OrbitHeroGraphic />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
