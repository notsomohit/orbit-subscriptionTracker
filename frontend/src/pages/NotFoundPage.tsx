import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center text-center px-6 select-none bg-grid-pattern bg-grain-texture">
      {/* Ambient glow */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-950/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Orbit Motif - decorative */}
      <div className="relative w-32 h-32 flex items-center justify-center mb-10">
        {/* Outer ring */}
        <div className="absolute w-32 h-32 rounded-full border border-slate-800 border-dashed animate-spin" style={{ animationDuration: '14s' }} />
        {/* Middle ring */}
        <div className="absolute w-20 h-20 rounded-full border border-slate-800/60" style={{ animation: 'spin 9s linear infinite reverse' }} />
        {/* Inner ring */}
        <div className="absolute w-10 h-10 rounded-full border border-indigo-900/40" style={{ animation: 'spin 5s linear infinite' }} />

        {/* Orbiting dots */}
        <div className="absolute w-32 h-32 animate-spin" style={{ animationDuration: '14s' }}>
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        </div>
        <div className="absolute w-20 h-20" style={{ animation: 'spin 9s linear infinite reverse' }}>
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
        </div>

        {/* Center */}
        <div className="relative z-10 w-12 h-12 rounded-xl bg-[#0b0f1a] border border-slate-800 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.1)]">
          <span className="text-slate-600 font-bold font-mono text-xs">404</span>
        </div>
      </div>

      {/* Copy */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight mb-3">
        Lost in orbit.
      </h1>
      <p className="text-slate-400 text-sm sm:text-base max-w-sm leading-relaxed mb-8">
        This page has drifted out of range. It doesn't exist, or it moved — either way, it's not here.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all hover:scale-[1.02]"
        >
          ← Back to Landing
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-sm font-medium transition-all"
        >
          Open Dashboard
        </Link>
      </div>
    </div>
  );
};
