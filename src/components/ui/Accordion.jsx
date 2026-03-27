import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-100 last:border-none">
      <button
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className="text-xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-emerald-500 transition-colors italic">
          {title}
        </span>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-premium">
          {isOpen ? <HiOutlineMinus size={18} /> : <HiOutlinePlus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pt-2 text-slate-500 font-medium italic leading-relaxed text-lg max-w-2xl">
              {content}
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
    <div className="space-y-2">
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
