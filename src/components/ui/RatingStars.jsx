import React from "react";
import { HiStar } from "react-icons/hi";
const RatingStars = ({ rating = 5 }) => (
  <div className="flex items-center gap-1 text-emerald-500">
    {[...Array(5)].map((_, i) => (
      <HiStar key={i} size={14} className={i < Math.floor(rating) ? "fill-current" : "text-slate-200"} />
    ))}
  </div>
);
export default RatingStars;
