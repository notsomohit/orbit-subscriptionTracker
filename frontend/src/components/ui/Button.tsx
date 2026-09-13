import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    className = '', 
    children, 
    disabled,
    ...props 
  }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-display font-bold uppercase tracking-wider select-none transition-all duration-100 ease-out border-2 border-black";
    
    const variants = {
      primary: "bg-[#F5D90A] text-black hover:bg-[#ebd005]",
      secondary: "bg-white text-black hover:bg-neutral-100",
      dark: "bg-black text-white hover:bg-neutral-900 border-black",
      danger: "bg-[#EF4444] text-white hover:bg-[#dc2626]",
      ghost: "bg-transparent text-black border-transparent hover:border-black hover:bg-neutral-100 shadow-none hover:shadow-[2px_2px_0px_#111]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const shadowStyles = variant === 'ghost' 
      ? "" 
      : "shadow-[4px_4px_0px_#111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";

    const disabledStyles = disabled 
      ? "opacity-50 cursor-not-allowed hover:translate-x-0 hover:translate-y-0 hover:shadow-[4px_4px_0px_#111] active:translate-x-0 active:translate-y-0" 
      : "";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${shadowStyles}
          ${disabledStyles}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
