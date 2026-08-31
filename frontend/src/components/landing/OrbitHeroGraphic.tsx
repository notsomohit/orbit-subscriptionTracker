import React from 'react';
import { OrbitLogo } from '../common/OrbitLogo';

interface OrbitingItem {
  id: string;
  name: string;
  price: string;
  category: string;
  status: 'active' | 'renewing-soon' | 'cancelled' | 'expired';
  track: 1 | 2 | 3;
  logo: React.ReactNode;
  colorClass: string;
  borderColorClass: string;
  glowClass: string;
}

export const OrbitHeroGraphic: React.FC = () => {
  // SVG Brand Icons tinted per status
  const githubIcon = (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );

  const upstashIcon = (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );

  const spotifyIcon = (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.02.24-2.82-1.74-6.36-2.13-10.561-1.17-.419.09-.81-.179-.9-.6-.09-.42.18-.81.6-.9 4.62-1.051 8.52-.599 11.7 1.379.36.24.48.66.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-.961-.18-.1.08-.659.18-.48-.12-.96-.3-.1.419-.6.84-.3 1.261 4.319 1.32 9.78 1.98 13.56-.36.42-.3.96-.12 1.26.3zm.12-3.42c-3.899-2.34-10.319-2.58-14.099-1.44-.6.18-1.2-.18-1.38-.78-.18-.6.18-1.2.78-1.38 4.38-1.32 11.459-1.02 15.9 1.62.54.3.72 1.02.42 1.56-.3.54-1.02.72-1.56.42z"/>
    </svg>
  );

  const ftIcon = (
    <span className="font-serif font-extrabold text-[13px] tracking-tighter">FT</span>
  );

  const gymIcon = (
    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2M6 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2M6 12h12M6.5 7v10M17.5 7v10" />
    </svg>
  );

  const sportIcon = (
    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );

  const subscriptions: OrbitingItem[] = [
    {
      id: 'sub_1',
      name: 'GitHub Copilot',
      price: '$19',
      category: 'technology',
      status: 'active',
      track: 1,
      logo: githubIcon,
      colorClass: 'text-emerald-400',
      borderColorClass: 'border-emerald-500/20 bg-emerald-950/20',
      glowClass: 'shadow-[0_0_12px_rgba(52,211,153,0.15)]',
    },
    {
      id: 'sub_2',
      name: 'Upstash Workflow',
      price: '$320',
      category: 'technology',
      status: 'active',
      track: 1,
      logo: upstashIcon,
      colorClass: 'text-indigo-400',
      borderColorClass: 'border-indigo-500/20 bg-indigo-950/20',
      glowClass: 'shadow-[0_0_12px_rgba(129,140,248,0.15)]',
    },
    {
      id: 'sub_3',
      name: 'Spotify Premium Family',
      price: '₹179',
      category: 'entertainment',
      status: 'renewing-soon',
      track: 2,
      logo: spotifyIcon,
      colorClass: 'text-amber-400',
      borderColorClass: 'border-amber-500/30 bg-amber-950/20',
      glowClass: 'shadow-[0_0_16px_rgba(251,191,36,0.3)]',
    },
    {
      id: 'sub_4',
      name: 'Financial Times',
      price: '€39',
      category: 'finance',
      status: 'active',
      track: 2,
      logo: ftIcon,
      colorClass: 'text-cyan-400',
      borderColorClass: 'border-cyan-500/20 bg-cyan-950/20',
      glowClass: 'shadow-[0_0_12px_rgba(34,211,238,0.15)]',
    },
    {
      id: 'sub_5',
      name: 'Gym Pass',
      price: '₹2,500',
      category: 'lifestyle',
      status: 'cancelled',
      track: 3,
      logo: gymIcon,
      colorClass: 'text-rose-400',
      borderColorClass: 'border-rose-500/25 bg-rose-950/10',
      glowClass: 'shadow-[0_0_8px_rgba(244,63,94,0.08)]',
    },
    {
      id: 'sub_6',
      name: 'EuroSport Pass',
      price: '€5',
      category: 'sports',
      status: 'expired',
      track: 3,
      logo: sportIcon,
      colorClass: 'text-slate-400',
      borderColorClass: 'border-slate-800/80 bg-slate-900/10',
      glowClass: 'shadow-[0_0_6px_rgba(148,163,184,0.05)]',
    },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center select-none bg-grain-texture">
      
      {/* Subtle background glow maps */}
      <div className="absolute w-72 h-72 rounded-full bg-cyan-950/10 blur-[80px] pointer-events-none" />
      <div className="absolute w-48 h-48 rounded-full bg-indigo-950/15 blur-[60px] pointer-events-none" />

      {/* TRACK 3: Outer Ring (Diameter: ~400px) */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full border border-slate-800/80 border-dashed animate-spin-slow"
        style={{ animationDuration: '38s' }}
      >
        {/* Gym Pass (Top) */}
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2"
          style={{ animation: 'spin 38s linear infinite reverse' }}
        >
          <div className={`w-12 h-12 rounded-xl bg-[#080c14] border ${subscriptions[4].borderColorClass} ${subscriptions[4].glowClass} ${subscriptions[4].colorClass} flex items-center justify-center`}>
            {subscriptions[4].logo}
          </div>
        </div>

        {/* EuroSport (Bottom) */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2"
          style={{ animation: 'spin 38s linear infinite reverse' }}
        >
          <div className={`w-12 h-12 rounded-xl bg-[#080c14] border ${subscriptions[5].borderColorClass} ${subscriptions[5].glowClass} ${subscriptions[5].colorClass} flex items-center justify-center`}>
            {subscriptions[5].logo}
          </div>
        </div>
      </div>

      {/* TRACK 2: Middle Ring (Diameter: ~290px, Reverse rotation) */}
      <div
        className="absolute w-[290px] h-[290px] rounded-full border border-slate-800/50"
        style={{ 
          animation: 'spin 28s linear infinite reverse',
        }}
      >
        {/* Spotify Premium - Pulsing Warning */}
        <div
          className="absolute top-1/2 -left-6 -translate-y-1/2"
          style={{ animation: 'spin 28s linear infinite' }}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing Glow Base */}
            <span className="absolute inset-0 w-12 h-12 rounded-xl bg-amber-500/5 animate-pulse" />
            <span className="absolute -inset-1 rounded-xl border border-amber-500/20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className={`relative w-12 h-12 rounded-xl bg-[#080c14] border ${subscriptions[2].borderColorClass} ${subscriptions[2].glowClass} ${subscriptions[2].colorClass} flex items-center justify-center`}>
              {subscriptions[2].logo}
            </div>
          </div>
        </div>

        {/* Financial Times (Right) */}
        <div
          className="absolute top-1/2 -right-6 -translate-y-1/2"
          style={{ animation: 'spin 28s linear infinite' }}
        >
          <div className={`w-12 h-12 rounded-xl bg-[#080c14] border ${subscriptions[3].borderColorClass} ${subscriptions[3].glowClass} ${subscriptions[3].colorClass} flex items-center justify-center`}>
            {subscriptions[3].logo}
          </div>
        </div>
      </div>

      {/* TRACK 1: Inner Ring (Diameter: ~180px, Faster rotation) */}
      <div
        className="absolute w-[180px] h-[180px] rounded-full border border-slate-800/60"
        style={{ 
          animation: 'spin 18s linear infinite',
        }}
      >
        {/* GitHub Copilot (Top) */}
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2"
          style={{ animation: 'spin 18s linear infinite reverse' }}
        >
          <div className={`w-12 h-12 rounded-xl bg-[#080c14] border ${subscriptions[0].borderColorClass} ${subscriptions[0].glowClass} ${subscriptions[0].colorClass} flex items-center justify-center`}>
            {subscriptions[0].logo}
          </div>
        </div>

        {/* Upstash (Bottom) */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2"
          style={{ animation: 'spin 18s linear infinite reverse' }}
        >
          <div className={`w-12 h-12 rounded-xl bg-[#080c14] border ${subscriptions[1].borderColorClass} ${subscriptions[1].glowClass} ${subscriptions[1].colorClass} flex items-center justify-center`}>
            {subscriptions[1].logo}
          </div>
        </div>
      </div>

      {/* CENTER NODE: Permanent Orbit Core Anchor (Decorative Only, Butter-Smooth 60fps) */}
      <div className="relative z-20 w-[140px] h-[140px] rounded-[24px] bg-[#0b0f19] border border-slate-800 shadow-[0_0_35px_rgba(6,182,212,0.08)] flex flex-col items-center justify-center p-3 text-center">
        <div className="flex flex-col items-center justify-center">
          <OrbitLogo size="sm" showText={false} clickable={false} />
          <div className="mt-2 font-display text-xs font-bold text-white tracking-wide">
            ORBIT
          </div>
          <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-semibold mt-1">
            ACTIVE CORE
          </div>
        </div>
      </div>

      {/* Dynamic Status Legend at the Bottom */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-4 text-[10px] font-mono text-slate-500 bg-[#090d16]/70 px-4 py-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span>Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)] animate-pulse" />
          <span className="text-amber-300 font-semibold">Renewal Warning</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400/80" />
          <span>Cancelled / Expired</span>
        </div>
      </div>

    </div>
  );
};
