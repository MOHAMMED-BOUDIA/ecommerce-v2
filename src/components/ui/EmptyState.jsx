import React from "react";
const EmptyState = ({ title, subtitle }) => (
  <div className="text-center py-20 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10">
    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h3>
    <p className="text-white/40 font-bold text-xs uppercase tracking-widest mt-4">{subtitle}</p>
  </div>
);
export default EmptyState;
