import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";

const AccordionItem = ({ title, content, isOpen, onClick, index }) => {
  return (
    <div className={`group transition-all duration-700 ${isOpen ? "bg-slate-50/50" : "bg-transparent"} border-b border-slate-100 last:border-none`}>
      <button
        onClick={onClick}
        className="w-full py-10 flex items-center justify-between text-left relative overflow-hidden px-4 md:px-8"
      >
        {/* Active Indicator (Vertical Bar) */}
        <motion.div 
          initial={false}
          animate={{ height: isOpen ? "40%" : "0%", opacity: isOpen ? 1 : 0 }}
          className="absolute left-0 w-1 bg-emerald-500 rounded-r-full"
        />

        <div className="flex items-center gap-6 relative z-10 transition-transform duration-500 group-hover:translate-x-2">
          <span className="text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.3em] font-mono leading-none">
            Node_{String(index + 1).padStart(2, '0')}
          </span>
          <span className={`text-xl md:text-2xl font-black uppercase tracking-tighter italic transition-colors duration-500 ${
            isOpen ? "text-slate-950" : "text-slate-500 group-hover:text-slate-900"
          }`}>
            {title}
          </span>
        </div>

        <motion.div 
          animate={{ rotate: isOpen ? 45 : 0 }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
            isOpen ? "bg-emerald-500 border-emerald-500 text-slate-950 shadow-[0_10px_30px_rgba(16,185,129,0.3)]" : "bg-white border-slate-100 text-slate-400 group-hover:border-emerald-500/30 group-hover:text-emerald-500"
          }`}
        >
          <HiOutlinePlus size={20} className="transition-transform duration-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-12 pt-0 px-4 md:px-[6.5rem] relative">
              <div className="text-slate-500 font-medium italic leading-relaxed text-lg max-w-2xl border-l-[1px] border-emerald-500/20 pl-8 ml-[-2rem]">
                {content}
              </div>
              
              {/* Technical Detail Tag */}
              <div className="mt-8 flex items-center gap-4 text-[8px] font-black text-emerald-500/30 uppercase tracking-[0.5em] select-none">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 animate-pulse" />
                 Protocol_Log::Authorized_Access_Granted
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full border-t border-slate-950/5">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
