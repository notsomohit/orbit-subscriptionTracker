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
    <section className="py-12 md:py-16 bg-[#111111] text-white border-b-3 border-black relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Center: Stats Metrics Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="font-mono text-xs font-black text-[#F5D90A] uppercase tracking-widest bg-black px-2.5 py-1 border border-neutral-700 inline-block">
                SYSTEM METRICS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-display font-black uppercase text-white tracking-tight leading-tight">
                PEACE OF MIND BY DESIGN
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-1">
              {stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="bg-black border-2 border-neutral-800 p-4 sm:p-5 shadow-[4px_4px_0px_#F5D90A] space-y-1"
                >
                  <div className="font-mono font-black text-3xl sm:text-4xl text-[#F5D90A]">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    {stat.unit}
                  </div>
                  <div className="font-display font-bold text-sm text-white pt-1.5 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-xs font-sans text-neutral-400">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Meditating SVG inside a white circle (thick black border, hard shadow, ~280px) */}
          <div className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0">
            <div className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-full bg-white border-3 border-black shadow-[6px_6px_0px_#F5D90A] flex items-center justify-center p-4 overflow-hidden shrink-0">
              <img
                src={meditatingSvg}
                alt="Person meditating in peace"
                className="w-[200px] sm:w-[240px] h-auto object-contain select-none pointer-events-none"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
