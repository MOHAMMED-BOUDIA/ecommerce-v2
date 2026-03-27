import React from "react";
const PriceTag = ({ amount, oldAmount }) => (
  <div className="flex items-center gap-3">
    <span className="text-lg font-black text-slate-900">${amount}</span>
    {oldAmount && <span className="text-sm font-bold text-slate-400 line-through">${oldAmount}</span>}
  </div>
);
export default PriceTag;
