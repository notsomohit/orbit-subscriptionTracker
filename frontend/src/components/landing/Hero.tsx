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
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#F7F5F0] border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Hero Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Logged in Welcome Greeting */}
            {isAuthenticated && user?.name && (
              <div className="inline-flex items-center gap-2 bg-[#F5D90A] border-2 border-black px-3.5 py-1.5 font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#111]">
                <span>👋</span>
                <span>WELCOME BACK, {user.name}!</span>
              </div>
            )}

            {/* Headline with RENEWAL highlighted in brutalist yellow block */}
            <h1 className="text-2xl sm:text-5xl lg:text-7xl font-display font-black text-black leading-[1.15] sm:leading-[1.05] tracking-tight uppercase px-1 sm:px-0">
              NEVER GET SURPRISED BY A{' '}
              <span className="inline-block mt-1 bg-[#F5D90A] px-2 py-0.5 border-3 border-black shadow-[3px_3px_0px_#111] sm:shadow-[5px_5px_0px_#111]">
                RENEWAL
              </span>{' '}
              AGAIN.
            </h1>

            {/* Responsive: Shrunk Clumsy Illustration below headline on mobile (< 1024px) */}
            <div className="block lg:hidden my-2 flex justify-center">
              <img
                src={clumsySvg}
                alt="Subscription chaos"
                className="w-44 sm:w-56 max-w-full h-auto select-none pointer-events-none animate-float-clumsy"
              />
            </div>

            {/* Short Outcome-Driven Subtext */}
            <p className="text-base sm:text-lg text-neutral-800 max-w-xl font-medium leading-relaxed">
              Orbit tracks every subscription, renews nothing you forgot, and emails you 7, 5, 2 &amp; 1 days before you're billed.
            </p>

            {/* Actions: Primary CTA + Free Badge + How It Works */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link to={targetDestination} className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-3 text-base">
                    <span>OPEN DASHBOARD</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </Button>
                </Link>

                <span className="w-full sm:w-auto inline-flex items-center justify-center px-3.5 py-3 bg-white border-2 border-black font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#111] select-none text-black">
                  ★ FREE · NO CARD REQUIRED
                </span>
              </div>

              <div className="pt-1 flex justify-center lg:justify-start">
                <a href="#how-it-works">
                  <Button variant="secondary" size="md" className="gap-2 text-xs">
                    <span>HOW IT WORKS ↓</span>
                    <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                  </Button>
                </a>
              </div>
            </div>

            {/* User Benefits Checklist */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-xs font-mono font-bold text-black">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-[#22C55E] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#111]">
                  <Check className="w-3.5 h-3.5 stroke-[3] text-black" />
                </span>
                <span>Email reminders at 7/5/2/1 days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-[#22C55E] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#111]">
                  <Check className="w-3.5 h-3.5 stroke-[3] text-black" />
                </span>
                <span>Multi-currency (USD, EUR, INR)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-[#22C55E] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#111]">
                  <Check className="w-3.5 h-3.5 stroke-[3] text-black" />
                </span>
                <span>Free to start, no card required</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic with Staggered Fade-in & Floating Clumsy Illustration */}
          <div className="lg:col-span-5 flex justify-center relative py-4 lg:py-0">
            {/* Desktop Clumsy Illustration floating behind the mockup card */}
            <img
              src={clumsySvg}
              alt="Subscription chaos"
              className="hidden lg:block absolute -top-12 -left-20 w-64 h-auto pointer-events-none z-0 select-none animate-float-clumsy opacity-90"
            />
            <div className="relative z-10 w-full flex justify-center">
              <OrbitHeroGraphic />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
