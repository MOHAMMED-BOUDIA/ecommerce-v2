import React from 'react';
import { clsx } from 'clsx';

/**
 * Premium Reusable Badge Component
 * 用于商品标签、库存状态、优惠等
 */
const Badge = ({
  children,
  variant = 'primary', // primary, secondary, danger, success, warning, neutral, outline
  size = 'md',      // sm, md, lg
  className = '',
  pill = false,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-700 font-bold border border-primary-200/50',
    secondary: 'bg-slate-100 text-slate-700 font-bold border border-slate-200/50',
    danger: 'bg-red-50 text-red-600 font-bold border border-red-100/50',
    success: 'bg-emerald-50 text-emerald-600 font-bold border border-emerald-100/50',
    warning: 'bg-amber-50 text-amber-700 font-bold border border-amber-100/50',
    neutral: 'bg-gray-50 text-gray-600 font-bold border border-gray-200/50',
    outline: 'bg-transparent border-2 border-slate-200 text-slate-600 font-bold hover:border-primary-500 hover:text-primary-600'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] uppercase tracking-wider',
    md: 'px-2.5 py-1 text-[11px] uppercase tracking-widest',
    lg: 'px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-widest'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center leading-none transition-premium select-none whitespace-nowrap',
        pill ? 'rounded-full' : 'rounded-md',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
