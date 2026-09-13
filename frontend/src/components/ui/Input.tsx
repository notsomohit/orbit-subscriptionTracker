import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-xs font-display font-bold uppercase tracking-wider text-black"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full bg-white text-black font-sans px-3.5 py-2.5 text-sm
            border-2 border-black
            placeholder:text-neutral-500
            focus:outline-none focus:shadow-[3px_3px_0px_#F5D90A] focus:border-black
            transition-all duration-100
            ${error ? 'border-[#EF4444] bg-red-50 focus:shadow-[3px_3px_0px_#EF4444]' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-xs font-mono font-bold text-[#EF4444] mt-1">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs font-mono text-neutral-600 mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
