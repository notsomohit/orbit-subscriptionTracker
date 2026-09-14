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
    <section className="py-12 md:py-16 bg-[#F5D90A] text-black border-b-3 border-black relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10">
          
          {/* Centered Column: headline → subtext → buttons → git clone terminal directly under the buttons */}
          <div className="flex-1 max-w-2xl text-center space-y-4">
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-display font-black tracking-tight text-black uppercase leading-tight">
              READY TO RUN THE SUBSCRIPTION TRACKER API?
            </h2>

            <p className="text-black text-sm sm:text-base max-w-xl mx-auto font-bold leading-relaxed">
              Clone the repository, configure your Upstash &amp; MongoDB environment variables, and track subscriptions with automated 7/5/2/1-day email workflows.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <Link to={dashboardDestination} className="w-full sm:w-auto">
                <Button variant="dark" size="md" className="w-full sm:w-auto gap-2 text-sm shadow-[4px_4px_0px_#111]">
                  <span>OPEN DASHBOARD CONSOLE</span>
                  <ArrowRight className="w-4 h-4 stroke-[3] text-[#F5D90A]" />
                </Button>
              </Link>

              <Link to="/signup" className="w-full sm:w-auto">
                <Button variant="secondary" size="md" className="w-full sm:w-auto text-sm">
                  <span>CREATE FREE ACCOUNT</span>
                </Button>
              </Link>
            </div>

            {/* Git Clone Terminal directly under buttons (no dead space!) */}
            <div className="pt-2 flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white text-black border-3 border-black px-4 sm:px-5 py-2.5 font-mono text-xs sm:text-sm font-bold shadow-[4px_4px_0px_#111] max-w-full overflow-x-auto">
                <span className="text-neutral-500 select-none">$</span>
                <span>git clone https://github.com/notsomohit/subscription-tracker.git</span>
                <span className="w-2 h-4 bg-black inline-block animate-cursor-blink" />
              </div>
            </div>
          </div>

          {/* Zombie Illustration: stays right, vertically centered against the whole group, current size and -3deg rotation */}
          <div 
            className="hidden md:flex items-center justify-center shrink-0 w-60 sm:w-72 lg:w-[320px] select-none pointer-events-none"
            style={{ transform: 'rotate(-3deg)' }}
          >
            <img
              src={zombieSvg}
              alt="Person celebrating subscription peace"
              className="w-full h-auto object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.15)]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
