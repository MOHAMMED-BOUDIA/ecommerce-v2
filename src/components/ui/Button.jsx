import React from 'react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

/**
 * Premium Vanguard Button Component
 * Supports both standard <button> and react-router-dom <Link> tags.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  as: Component = 'button',
  to,
  ...props
}) => {
  const variants = {
    primary: 'bg-emerald-500 text-slate-950 hover:bg-white shadow-xl shadow-emerald-500/20',
    secondary: 'bg-white text-slate-950 border border-slate-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500',
    outline: 'bg-transparent border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950',
    ghost: 'bg-transparent text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/5',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    transparent: 'bg-transparent'
  };


  const sizes = {
    sm: 'px-6 py-3 text-[9px]',
    md: 'px-10 py-5 text-[10px]',
    lg: 'px-14 py-7 text-[11px]',
    xl: 'px-20 py-10 text-[12px]'
  };

  const baseStyles = clsx(
    'inline-flex items-center justify-center font-black uppercase tracking-[0.3em] transition-premium active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  if (to) {
    return (
      <Link to={to} className={baseStyles} {...props}>
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;