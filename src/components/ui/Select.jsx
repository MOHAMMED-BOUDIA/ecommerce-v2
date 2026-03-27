import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { HiChevronDown } from 'react-icons/hi';

/**
 * Premium Reusable Select Component
 */
const Select = forwardRef(({
  label,
  error,
  options = [],
  id,
  className = '',
  containerClassName = '',
  helperText,
  ...props
}, ref) => {
  return (
    <div className={clsx('w-full space-y-2', containerClassName)}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-bold text-slate-700 select-none cursor-pointer"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        <select
          id={id}
          ref={ref}
          className={clsx(
            'w-full bg-white border-2 rounded-xl transition-premium placeholder:text-slate-400 focus:outline-none focus:ring-4 sm:text-[15px] appearance-none cursor-pointer',
            'disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed',
            'pl-4.5 pr-11 h-12',
            error 
              ? 'border-red-100 bg-red-50/20 focus:border-red-500 focus:ring-red-100 text-red-900' 
              : 'border-slate-100 focus:border-primary-500 focus:ring-primary-50/50 hover:border-slate-200',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none">
          <HiChevronDown size={20} />
        </div>
      </div>
      {error ? (
        <p className="flex items-center text-[13px] text-red-600 font-semibold animate-in fade-in slide-in-from-top-1">
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      ) : helperText && (
        <p className="text-[13px] text-slate-500 font-medium">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
