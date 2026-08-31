import React from 'react';
import { Link } from 'react-router-dom';

interface OrbitLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  clickable?: boolean;
  className?: string;
}

export const OrbitLogo: React.FC<OrbitLogoProps> = ({
  size = 'md',
  showText = true,
  clickable = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Orbit Graphic Motif */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        {/* Outer Glow */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md dark:bg-indigo-500/30" />
        
        {/* Core Orbit Container */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-900 p-0.5 shadow-md flex items-center justify-center">
          <div className="w-full h-full bg-white dark:bg-[#0b0f19] rounded-[10px] flex items-center justify-center overflow-hidden relative">
            {/* Center Nucleus */}
            <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-[0_0_8px_#6366f1]" />

            {/* Orbit Ring */}
            <div className="absolute inset-1 rounded-full border border-dashed border-indigo-400/40 dark:border-indigo-400/30 animate-spin-slow" />

            {/* Orbiting Satellite Dot */}
            <div className="absolute inset-0.5 animate-spin-slow">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-300 absolute top-0.5 left-1/2 -translate-x-1/2 shadow-[0_0_6px_#818cf8]" />
            </div>
          </div>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold tracking-tight text-slate-900 dark:text-white ${textSizes[size]} flex items-center gap-1.5`}>
            Orbit
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
          </span>
        </div>
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link to="/" className="inline-flex items-center group transition-transform duration-150 hover:scale-[1.02]">
        {content}
      </Link>
    );
  }

  return content;
};
