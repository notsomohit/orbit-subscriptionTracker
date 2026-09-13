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
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brutalist Logo Icon Box */}
      <div 
        className={`
          ${iconSizes[size]}
          bg-[#F5D90A] border-2 border-black shadow-[2px_2px_0px_#111]
          flex items-center justify-center font-display font-black text-black
          transition-transform duration-100 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none
        `}
      >
        <span className="font-mono font-black tracking-tighter">O•</span>
      </div>

      {showText && (
        <div className="flex items-center">
          <span className={`font-display font-black tracking-wider uppercase text-black ${textSizes[size]}`}>
            ORBIT
          </span>
          <span className="w-2 h-2 bg-[#F5D90A] border border-black ml-1 shadow-[1px_1px_0px_#111]" />
        </div>
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link to="/" className="inline-flex items-center group">
        {content}
      </Link>
    );
  }

  return content;
};
