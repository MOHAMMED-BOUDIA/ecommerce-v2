import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProcessSection = () => {
  const steps = [
    {
      id: "01",
      title: "Material Synthesis",
      description: "Proprietary molecular bonding for extreme durability and thermal regulation."
    },
    {
      id: "02",
      title: "Modular Drafting",
      description: "Every deployment is architected for component-based flexibility."
    },
    {
      id: "03",
      title: "Stress Testing",
      description: "Validated across multiple environmental tiers including zero-altitude zones."
    }
  ];

  return (
    <section className="py-40 bg-zinc-950 relative overflow-hidden">
      <div className="container-custom px-6">
        <div className="flex flex-col md:flex-row items-end gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="flex-shrink-0"
          >
            <h2 className="text-[12vw] md:text-[8vw] font-black text-white italic uppercase tracking-tighter leading-none -indent-[0.05em]">
              THE <br />PROCESS.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-white/40 text-sm md:text-base font-medium max-w-sm mb-4 leading-relaxed tracking-wide border-b border-white/10 pb-12 italic"
          >
            Behind every piece of Vanguard tech lies a rigorous sequence of engineering iterations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1.2 }}
              className="p-12 md:p-16 hover:bg-white/5 transition-colors duration-1000 group cursor-crosshair"
            >
              <span className="text-emerald-500 font-black text-xs tracking-[0.6em] block mb-12 italic group-hover:tracking-[1em] transition-all duration-700">
                //{step.id}
              </span>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-8">
                {step.title}
              </h3>
              <p className="text-white/30 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-700">
                {step.description}
              </p>
              
              <div className="mt-16 w-12 h-12 flex items-center justify-center border border-white/10 rounded-full group-hover:border-emerald-500 group-hover:rotate-180 transition-all duration-1000">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;