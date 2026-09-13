import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, children, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label 
            htmlFor={selectId} 
            className="block text-xs font-display font-bold uppercase tracking-wider text-black"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full appearance-none bg-white text-black font-sans px-3.5 py-2.5 text-sm
              border-2 border-black
              focus:outline-none focus:shadow-[3px_3px_0px_#F5D90A] focus:border-black
              cursor-pointer transition-all duration-100
              ${error ? 'border-[#EF4444] bg-red-50' : ''}
              ${className}
            `}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black font-bold">
            ▼
          </div>
        </div>
        {error && (
          <p className="text-xs font-mono font-bold text-[#EF4444] mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
