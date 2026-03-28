import React, { useState } from "react";
import { HiStar, HiCheckBadge, HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const ProductRatingSystem = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a technical rating level.");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Intel transmitted to VANGUARD servers.", {
      icon: <HiCheckBadge className="text-emerald-500" />,
    });
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50/50 border border-emerald-100 p-8 rounded-[2rem] text-center space-y-4"
      >
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <HiCheckBadge size={32} className="text-slate-950" />
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-black text-slate-950 uppercase italic tracking-tighter">Review Verified</h4>
          <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest leading-loose">
            Your verification data has been added to the subject archive.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <HiOutlineChatBubbleLeftEllipsis size={20} className="text-emerald-500" />
          <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Subject Evaluation</h3>
        </div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Feedback Required</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Performance Rating</label>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-all duration-300 transform hover:scale-125 focus:outline-none"
              >
                <HiStar 
                  size={32} 
                  className={`transition-colors duration-300 ${
                    (hover || rating) >= star 
                      ? "text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
                      : "text-slate-200"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-4 text-xs font-black text-emerald-600 uppercase tracking-tighter italic">
                Level 0{rating} / 05
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Operational Field Notes</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Document performance, durability, and field utility..."
            className="w-full h-32 bg-white border border-slate-200 rounded-2xl p-5 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none resize-none placeholder:text-slate-300 italic"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-16 bg-slate-950 text-white rounded-2xl font-black uppercase italic tracking-tighter flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-slate-950 transition-all duration-500 disabled:opacity-50 group shadow-xl shadow-slate-950/10"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Submit Evaluation
              <HiCheckBadge size={20} className="group-hover:scale-110 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductRatingSystem;