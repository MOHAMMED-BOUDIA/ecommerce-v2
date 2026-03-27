import React from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { clsx } from 'clsx';

/**
 * Premium Reusable QuantityInput Component
 */
const QuantityInput = ({ 
  value = 1, 
  onChange, 
  min = 1, 
  max = 99, 
  className = '',
  size = 'md' // sm, md, lg
}) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const sizes = {
    sm: 'h-8 px-2 space-x-2 text-xs',
    md: 'h-10 px-3 space-x-3 text-sm',
    lg: 'h-12 px-4 space-x-4 text-base'
  };

  const buttonSizes = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2'
  };

  return (
    <div className={clsx(
      'inline-flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl select-none',
      sizes[size],
      className
    )}>
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className={clsx(
          'text-slate-400 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-premium rounded-md hover:bg-white active:scale-90',
          buttonSizes[size]
        )}
      >
        <HiMinus size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} strokeWidth={1} />
      </button>
      
      <span className="font-extrabold text-slate-800 tracking-tight w-6 text-center tabular-nums">
        {value}
      </span>
      
      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className={clsx(
          'text-slate-400 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-premium rounded-md hover:bg-white active:scale-90',
          buttonSizes[size]
        )}
      >
        <HiPlus size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} strokeWidth={1} />
      </button>
    </div>
  );
};

export default QuantityInput;
