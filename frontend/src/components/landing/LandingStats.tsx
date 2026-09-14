import React from 'react';
import meditatingSvg from '../../assets/illustrations/meditating.svg';

export const LandingStats: React.FC = () => {
  const stats = [
    {
      value: '4',
      unit: 'STAGES',
      label: 'Automated Notices',
      sublabel: '7, 5, 2, and 1 day alerts',
    },
    {
      value: '100%',
      unit: 'UPTIME',
      label: 'Serverless Cron',
      sublabel: 'Upstash Workflow runner',
    },
    {
      value: '$0.00',
      unit: 'USD',
      label: 'Starting Cost',
      sublabel: 'Free & fully self-hostable',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#111111] text-white border-b-3 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left / Center: Stats Metrics Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-black text-[#F5D90A] uppercase tracking-widest bg-black px-2.5 py-1 border border-neutral-700 inline-block">
                SYSTEM METRICS
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
                PEACE OF MIND BY DESIGN
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-2">
              {stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="bg-black border-2 border-neutral-800 p-5 shadow-[4px_4px_0px_#F5D90A] space-y-1"
                >
                  <div className="font-mono font-black text-3xl sm:text-4xl text-[#F5D90A]">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    {stat.unit}
                  </div>
                  <div className="font-display font-bold text-sm text-white pt-2 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-xs font-sans text-neutral-400">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Meditating SVG (Vertically centered, hidden on mobile 390px to prevent crowding) */}
          <div className="hidden lg:col-span-5 lg:flex items-center justify-center">
            <div className="relative p-2 max-w-sm">
              <img
                src={meditatingSvg}
                alt="Person meditating in peace"
                className="w-full max-w-[340px] h-auto object-contain select-none pointer-events-none"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
