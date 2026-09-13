import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'yellow' | 'gray' | 'dark';
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  borderWidth?: 2 | 3;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant = 'white', 
    shadow = 'md', 
    borderWidth = 2,
    className = '', 
    children, 
    ...props 
  }, ref) => {

    const variants = {
      white: "bg-white text-black",
      yellow: "bg-[#F5D90A] text-black",
      gray: "bg-[#EFECE6] text-black",
      dark: "bg-black text-white",
    };

    const shadows = {
      none: "",
      sm: "shadow-[2px_2px_0px_#111]",
      md: "shadow-[4px_4px_0px_#111]",
      lg: "shadow-[6px_6px_0px_#111]",
    };

    const borders = {
      2: "border-2 border-black",
      3: "border-3 border-black",
    };

    return (
      <div
        ref={ref}
        className={`
          ${variants[variant]}
          ${borders[borderWidth]}
          ${shadows[shadow]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
