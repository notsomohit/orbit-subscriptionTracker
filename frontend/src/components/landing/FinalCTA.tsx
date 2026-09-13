import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F5D90A] text-black border-b-3 border-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-black uppercase leading-tight">
          READY TO RUN THE SUBSCRIPTION TRACKER API?
        </h2>

        <p className="text-black text-base sm:text-lg max-w-xl mx-auto font-medium">
          Clone the repository, configure your Upstash & MongoDB environment variables, and manage subscriptions with automated email workflows.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="dark" size="lg" className="w-full sm:w-auto gap-2.5 text-base">
              <span>OPEN DASHBOARD CONSOLE</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </Button>
          </Link>

          <Link to="/signup" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base">
              <span>CREATE FREE ACCOUNT</span>
            </Button>
          </Link>
        </div>

        <div className="pt-6">
          <div className="inline-block bg-white text-black border-2 border-black px-4 py-2 font-mono text-xs font-bold shadow-[3px_3px_0px_#111]">
            $ git clone https://github.com/notsomohit/subscription-tracker.git
          </div>
        </div>
      </div>
    </section>
  );
};
