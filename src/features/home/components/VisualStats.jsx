import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Deployment Centers", value: "32", unit: "LOC" },
  { label: "Material Patents", value: "148", unit: "SPEC" },
  { label: "Archive Members", value: "88", unit: "K+" },
  { label: "Zero-Waste Ratio", value: "94", unit: "%" }
];

const VisualStats = () => {
  return (
    <section className="py-16 md:py-24 lg:py-40 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
      {/* Background oversized text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span className="text-3xl md:text-6xl lg:text-8xl xl:text-[120px] font-black text-white/[0.02] leading-none uppercase italic tracking-tighter">METRICS</span>
      </div>

      <div className="container-custom px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 gap-y-12 md:gap-y-16 lg:gap-y-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1 }}
              className="group"
            >
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl md:text-6xl lg:text-8xl font-black text-white tabular-nums tracking-tighter italic group-hover:text-emerald-500 transition-colors duration-700">
                  {stat.value}
                </span>
                <span className="text-xs font-black text-white/40 uppercase tracking-widest">{stat.unit}</span>
              </div>
              <div className="h-[2px] w-8 bg-white/20 mb-6 group-hover:w-full transition-all duration-1000 ease-out" />
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] italic">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualStats;