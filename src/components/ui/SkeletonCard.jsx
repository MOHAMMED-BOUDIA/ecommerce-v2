import React from 'react';

const SkeletonCard = ({ aspect = "aspect-[4/5]" }) => {
  return (
    <div 
      className={`relative ${aspect} rounded-[3rem] overflow-hidden bg-slate-900 border border-white/5`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" 
           style={{ backgroundSize: '200% 100%' }} />
      <div className="absolute bottom-10 left-10 space-y-4 w-2/3">
        <div className="h-2 w-1/3 bg-white/5 rounded-full" />
        <div className="h-8 w-full bg-white/10 rounded-xl" />
      </div>
    </div>
  );
};

export default SkeletonCard;
