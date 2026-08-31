import React, { useState } from 'react';
import { OrbitLogo } from '../common/OrbitLogo';
import { Sparkles, Bell, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface OrbitingItem {
  id: string;
  name: string;
  price: string;
  category: string;
  status: 'active' | 'renewing-soon' | 'cancelled' | 'expired';
  track: 1 | 2 | 3;
  position: 'top' | 'bottom' | 'left' | 'right';
  badgeColor: string;
  dotColor: string;
  isPulsing?: boolean;
}

export const OrbitHeroGraphic: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const subscriptions: OrbitingItem[] = [
    {
      id: 'sub_1',
      name: 'GitHub Copilot',
      price: '$19/mo',
      category: 'technology',
      status: 'active',
      track: 1,
      position: 'top',
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/80',
      dotColor: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]',
    },
    {
      id: 'sub_2',
      name: 'Upstash Workflow',
      price: '$320/yr',
      category: 'technology',
      status: 'active',
      track: 1,
      position: 'bottom',
      badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/80',
      dotColor: 'bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.8)]',
    },
    {
      id: 'sub_3',
      name: 'Spotify Family',
      price: '₹179/mo',
      category: 'entertainment',
      status: 'renewing-soon',
      track: 2,
      position: 'left',
      badgeColor: 'text-amber-300 border-amber-500/50 bg-amber-950/90',
      dotColor: 'bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,1)]',
      isPulsing: true,
    },
    {
      id: 'sub_4',
      name: 'Financial Times',
      price: '€39/mo',
      category: 'finance',
      status: 'active',
      track: 2,
      position: 'right',
      badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/80',
      dotColor: 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]',
    },
    {
      id: 'sub_5',
      name: 'Gym Pass',
      price: '₹2,500/mo',
      category: 'lifestyle',
      status: 'cancelled',
      track: 3,
      position: 'top',
      badgeColor: 'text-rose-400 border-rose-500/30 bg-rose-950/80',
      dotColor: 'bg-rose-400/80 shadow-[0_0_8px_rgba(244,63,94,0.5)]',
    },
    {
      id: 'sub_6',
      name: 'EuroSport Pass',
      price: '€5/day',
      category: 'sports',
      status: 'expired',
      track: 3,
      position: 'bottom',
      badgeColor: 'text-slate-400 border-slate-700 bg-slate-900/80',
      dotColor: 'bg-slate-500 shadow-[0_0_6px_rgba(148,163,184,0.4)]',
    },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center select-none">
      
      {/* Ambient center background bloom */}
      <div className="absolute inset-0 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-44 h-44 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

      {/* TRACK 3: Outer Ring (Diameter: ~410px) */}
      <div className="absolute w-[400px] h-[400px] rounded-full border border-slate-800/80 border-dashed animate-spin-slow">
        {/* Track 3 Node A: Gym Pass (Top) */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 group cursor-pointer"
          onMouseEnter={() => setHoveredNode('sub_5')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className="relative">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80 block shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-slate-900/90 border border-rose-900 text-[10px] text-rose-300 font-mono shadow-md opacity-75 group-hover:opacity-100 transition-opacity">
              Gym (Cancelled)
            </div>
          </div>
        </div>

        {/* Track 3 Node B: EuroSport (Bottom) */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 group cursor-pointer"
          onMouseEnter={() => setHoveredNode('sub_6')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className="relative">
            <span className="w-3.5 h-3.5 rounded-full bg-slate-500 block shadow-[0_0_6px_rgba(148,163,184,0.4)]" />
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] text-slate-400 font-mono shadow-md opacity-75 group-hover:opacity-100 transition-opacity">
              EuroSport (Expired)
            </div>
          </div>
        </div>
      </div>

      {/* TRACK 2: Middle Ring (Diameter: ~290px, Reverse rotation) */}
      <div
        className="absolute w-[290px] h-[290px] rounded-full border border-indigo-900/40"
        style={{ animation: 'spin 26s linear infinite reverse' }}
      >
        {/* Track 2 Node A: Spotify Family - PULSING UPCOMING RENEWAL */}
        <div
          className="absolute top-1/2 -left-3.5 -translate-y-1/2 group cursor-pointer"
          onMouseEnter={() => setHoveredNode('sub_3')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing Radar Ring */}
            <span className="absolute w-8 h-8 rounded-full bg-amber-400/20 animate-ping" />
            <span className="absolute w-5 h-5 rounded-full bg-amber-400/40 animate-pulse" />
            <span className="relative w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,1)]" />

            {/* Glowing Tag */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-amber-950/90 border border-amber-500/60 text-[10px] text-amber-300 font-bold font-mono shadow-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Spotify (Renews 2d)</span>
            </div>
          </div>
        </div>

        {/* Track 2 Node B: Financial Times (Right) */}
        <div
          className="absolute top-1/2 -right-3 -translate-y-1/2 group cursor-pointer"
          onMouseEnter={() => setHoveredNode('sub_4')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className="relative">
            <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 block shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-slate-900/90 border border-cyan-900 text-[10px] text-cyan-300 font-mono shadow-md opacity-80 group-hover:opacity-100 transition-opacity">
              FT (€39/mo)
            </div>
          </div>
        </div>
      </div>

      {/* TRACK 1: Inner Ring (Diameter: ~180px, Faster smooth rotation) */}
      <div
        className="absolute w-[180px] h-[180px] rounded-full border border-indigo-500/30"
        style={{ animation: 'spin 16s linear infinite' }}
      >
        {/* Track 1 Node A: GitHub Copilot (Top) */}
        <div
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 group cursor-pointer"
          onMouseEnter={() => setHoveredNode('sub_1')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className="relative">
            <span className="w-3 h-3 rounded-full bg-emerald-400 block shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-slate-900/90 border border-emerald-900 text-[10px] text-emerald-300 font-mono shadow-md opacity-80 group-hover:opacity-100 transition-opacity">
              Copilot ($19)
            </div>
          </div>
        </div>

        {/* Track 1 Node B: Upstash Workflow (Bottom) */}
        <div
          className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 group cursor-pointer"
          onMouseEnter={() => setHoveredNode('sub_2')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className="relative">
            <span className="w-3 h-3 rounded-full bg-indigo-400 block shadow-[0_0_12px_rgba(129,140,248,0.9)]" />
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-slate-900/90 border border-indigo-900 text-[10px] text-indigo-300 font-mono shadow-md opacity-80 group-hover:opacity-100 transition-opacity">
              Upstash ($320)
            </div>
          </div>
        </div>
      </div>

      {/* CENTER NODE: Orbit Brand Core Anchor */}
      <div className="relative z-10 p-4 rounded-2xl bg-gradient-to-b from-[#11182c] to-[#0a0f1d] border border-indigo-500/40 shadow-[0_0_40px_rgba(79,70,229,0.35)] flex flex-col items-center justify-center text-center">
        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-2xl border border-indigo-400/20 animate-pulse pointer-events-none" />
        
        <OrbitLogo size="sm" />
        <div className="mt-1.5 font-mono text-[9px] text-indigo-300 tracking-wider uppercase font-semibold">
          Orbit Core
        </div>
      </div>

      {/* Dynamic Status Legend at the Bottom */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-4 text-[11px] font-mono text-slate-400 bg-[#090d18]/90 px-3.5 py-1.5 rounded-full border border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span>Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)] animate-pulse" />
          <span className="text-amber-300 font-semibold">Upcoming Renewal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400/70" />
          <span>Cancelled</span>
        </div>
      </div>

    </div>
  );
};
