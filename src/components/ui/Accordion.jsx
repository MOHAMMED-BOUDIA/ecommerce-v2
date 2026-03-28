import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border transition-all duration-500 ${isOpen ? "border-emerald-500/20 bg-slate-950/[0.03] shadow-[0_18px_60px_rgba(15,23,42,0.06)]" : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_12px_34px_rgba(15,23,42,0.05)]"}`}
    >
      <button
        onClick={onClick}
        className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-7 md:py-7"
      >
        <div className="min-w-0 space-y-1">
          <div className="text-[8px] font-black uppercase tracking-[0.45em] text-emerald-600/70 transition-colors duration-300 group-hover:text-emerald-600">
            Restricted Protocol
          </div>
          <span className={`block text-lg md:text-xl font-black uppercase italic tracking-tighter transition-colors duration-300 ${isOpen ? "text-slate-950" : "text-slate-900 group-hover:text-emerald-600"}`}>
            {title}
          </span>
        </div>

        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? "border-emerald-500/20 bg-emerald-500 text-slate-950 shadow-[0_0_0_4px_rgba(16,185,129,0.08)]" : "border-slate-200 bg-slate-50 text-slate-400 group-hover:border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950"}`}>
          <span className="transition-transform duration-300 group-hover:scale-105">
            {isOpen ? <HiOutlineMinus size={18} /> : <HiOutlinePlus size={18} />}
          </span>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 md:px-7 md:pb-7">
              <div className="rounded-[1.5rem] border border-emerald-500/10 bg-white p-5 md:p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-[1px] w-10 bg-emerald-500" />
                  <span className="text-[9px] font-black uppercase tracking-[0.45em] text-slate-400">Protocol Details</span>
                </div>
                <div className="max-w-2xl text-sm md:text-[15px] leading-relaxed text-slate-500 italic">
                  {content}
                </div>
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
    <div className="space-y-3">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
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
