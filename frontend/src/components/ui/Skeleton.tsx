import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'yellow' | 'dark' | 'card';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-neutral-200/80 border-black/30',
    yellow: 'bg-[#F5D90A]/30 border-black/40',
    dark: 'bg-neutral-800/20 border-black/30',
    card: 'bg-[#EFECE6] border-2 border-black shadow-[3px_3px_0px_#111]',
  };

  return (
    <div
      className={`animate-pulse border ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
};
