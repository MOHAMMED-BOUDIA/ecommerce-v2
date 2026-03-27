import React from "react";
const EmptyState = ({ title, subtitle }) => (
  <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
    <h3 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">{title}</h3>
    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-4">{subtitle}</p>
  </div>
);
export default EmptyState;
