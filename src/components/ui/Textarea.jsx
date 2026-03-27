import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Premium Reusable Textarea Component
 */
const Textarea = forwardRef(({
  label,
  error,
  id,
  className = '',
  containerClassName = '',
  helperText,
  rows = 4,
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
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={clsx(
            'w-full bg-white border-2 rounded-xl transition-premium placeholder:text-slate-400 focus:outline-none focus:ring-4 sm:text-[15px] resize-none',
            'disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed',
            'px-4.5 py-3',
            error 
              ? 'border-red-100 bg-red-50/20 focus:border-red-500 focus:ring-red-100 text-red-900' 
              : 'border-slate-100 focus:border-primary-500 focus:ring-primary-50/50 hover:border-slate-200',
            className
          )}
          {...props}
        />
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

Textarea.displayName = 'Textarea';

export default Textarea;
