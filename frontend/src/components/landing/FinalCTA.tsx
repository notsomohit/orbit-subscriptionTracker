import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import zombieSvg from '../../assets/illustrations/zombieing.svg';

export const FinalCTA: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const dashboardDestination = isAuthenticated ? '/dashboard' : '/signup';

  return (
    <section className="py-20 md:py-28 bg-[#F5D90A] text-black border-b-3 border-black relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-black uppercase leading-tight">
          READY TO RUN THE SUBSCRIPTION TRACKER API?
        </h2>

        <p className="text-black text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Clone the repository, configure your Upstash &amp; MongoDB environment variables, and track subscriptions with automated 7/5/2/1-day email workflows.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link to={dashboardDestination} className="w-full sm:w-auto">
            <Button variant="dark" size="lg" className="w-full sm:w-auto gap-2.5 text-base">
              <span>OPEN DASHBOARD CONSOLE</span>
              <ArrowRight className="w-5 h-5 stroke-[3] text-[#F5D90A]" />
            </Button>
          </Link>

          <Link to="/signup" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base">
              <span>CREATE FREE ACCOUNT</span>
            </Button>
          </Link>
        </div>

        {/* Git Clone Box with Blinking Cursor and Dancing Zombie Illustration on the Right */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-center gap-6 relative">
          <div className="inline-flex items-center gap-2 bg-white text-black border-3 border-black px-5 py-3 font-mono text-xs sm:text-sm font-bold shadow-[4px_4px_0px_#111] max-w-full overflow-x-auto">
            <span className="text-neutral-500 select-none">$</span>
            <span>git clone https://github.com/notsomohit/subscription-tracker.git</span>
            <span className="w-2 h-4 bg-black inline-block animate-cursor-blink" />
          </div>

          {/* Zombie Illustration: Right of git clone box, -3deg tilt, no animation. Hidden on mobile 390px */}
          <div 
            className="hidden md:block w-36 lg:w-44 shrink-0 select-none pointer-events-none"
            style={{ transform: 'rotate(-3deg)' }}
          >
            <img
              src={zombieSvg}
              alt="Person celebrating subscription peace"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
