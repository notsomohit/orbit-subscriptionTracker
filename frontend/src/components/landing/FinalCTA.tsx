import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, ShieldCheck, Play } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Ready to run the Subscription Tracker API?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-normal">
          Clone the repository, configure your Upstash & MongoDB environment variables, and manage subscriptions with automated email workflows.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <span>Open Dashboard Console</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
          >
            <span>Create Free Account</span>
          </Link>
        </div>

        <div className="pt-4 font-mono text-xs text-slate-400">
          git clone https://github.com/notsomohit/subscription-tracker.git
        </div>
      </div>
    </section>
  );
};
