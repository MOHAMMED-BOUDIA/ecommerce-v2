import React, { memo } from 'react';
import { clsx } from 'clsx';

const Input = memo(({ label, icon, className = '', ...props }) => (
  <div className={clsx('w-full relative group min-h-[64px]', className)}>
    {icon && (
      <div className='absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors z-10 pointer-events-none'>
        {icon}
      </div>
    )}
    <input 
      className={clsx(
        'w-full bg-slate-50 border-2 border-transparent rounded-2xl py-5 px-6 font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500/20 outline-none transition-all',
        icon && 'pl-16'
      )}
      {...props}
    />
  </div>
));

export default Input;
