import React from "react";
const SectionTitle = ({ title, subtitle, align = "center" }) => (
  <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
    <h2 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900">{title}</h2>
    {subtitle && <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-2">{subtitle}</p>}
  </div>
);
export default SectionTitle;
