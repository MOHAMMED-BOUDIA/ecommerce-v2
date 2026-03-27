import React from 'react';
const Input = ({ label, icon, className = '', ...props }) => (
  <div className='w-full relative group'>
    {icon && <div className='absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors'>{icon}</div>}
    <input 
      className={w-full bg-slate-50 border-2 border-transparent rounded-2xl py-5 px-6 font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500/20 outline-none transition-all  }
      {...props}
    />
  </div>
);
export default Input;
