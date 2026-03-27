import React from 'react';
import { clsx } from 'clsx';

/**
 * Premium Reusable Loader Component
 * 包括全屏加载、局部加载和内联加载
 */
const Loader = ({ 
  size = 'md', // sm, md, lg, xl
  variant = 'primary', // primary, white, slate
  fullScreen = false,
  className = '',
  text
}) => {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
    xl: 'h-24 w-24 border-6'
  };

  const colors = {
    primary: 'border-primary-600/20 border-t-primary-600',
    white: 'border-white/20 border-t-white',
    slate: 'border-slate-200 border-t-slate-600'
  };

  const loaderContent = (
    <div className={clsx('flex flex-col items-center justify-center gap-4', className)}>
      <div 
        className={clsx(
          'animate-spin rounded-full',
          sizes[size],
          colors[variant]
        )} 
      />
      {text && (
        <span className={clsx(
          'font-bold text-sm uppercase tracking-widest',
          variant === 'primary' ? 'text-primary-900' : variant === 'white' ? 'text-white' : 'text-slate-600'
        )}>
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in duration-500">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
