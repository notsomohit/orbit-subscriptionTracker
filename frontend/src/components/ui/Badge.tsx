import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'active' | 'cancelled' | 'expired' | 'yellow' | 'blue' | 'purple' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'outline',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const variants = {
    active: "bg-[#DCFCE7] text-[#15803D] border-black",
    cancelled: "bg-[#FEE2E2] text-[#B91C1C] border-black",
    expired: "bg-[#F4F4F5] text-[#52525B] border-black",
    yellow: "bg-[#F5D90A] text-black border-black",
    blue: "bg-[#DBEAFE] text-[#1D4ED8] border-black",
    purple: "bg-[#F3E8FF] text-[#7E22CE] border-black",
    outline: "bg-white text-black border-black",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider
        border-2 shadow-[2px_2px_0px_#111] select-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};
