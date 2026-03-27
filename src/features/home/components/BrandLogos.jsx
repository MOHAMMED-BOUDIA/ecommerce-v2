import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  "STRATUS / CORP",
  "VALOR ECHELON",
  "NEXUS DYNAMICS",
  "KINETIC SIGHT",
  "ZERO / GRID",
  "AERIS"
];

const BrandLogos = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity duration-1000">
      <div className="container-custom px-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-x-24 gap-y-16 lg:justify-between px-12 lg:px-0">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1 }}
              className="group"
            >
              <span className="text-xs md:text-sm font-black tracking-[0.5em] text-white/40 group-hover:text-white transition-colors duration-700 uppercase italic">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;