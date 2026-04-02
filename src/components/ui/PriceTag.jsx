import React from "react";
const PriceTag = ({ amount, oldAmount }) => (
  <div className="flex items-center gap-3">
    <span className="text-lg font-black text-white">{amount.toLocaleString()} DH</span>
    {oldAmount && <span className="text-sm font-bold text-white/40 line-through">{oldAmount.toLocaleString()} DH</span>}
  </div>
);
export default PriceTag;
