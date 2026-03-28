import React from "react";
const PriceTag = ({ amount, oldAmount }) => (
  <div className="flex items-center gap-3">
    <span className="text-lg font-black text-white">{amount} DH</span>
    {oldAmount && <span className="text-sm font-bold text-white/40 line-through">{oldAmount} DH</span>}
  </div>
);
export default PriceTag;
