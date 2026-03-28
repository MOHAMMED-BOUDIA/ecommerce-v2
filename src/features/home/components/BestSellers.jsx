import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const bestSellers = [
  {
    id: 1,
    name: "LINEAR GLOVES",
    price: "$110.00",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    metric: "01"
  },
  {
    id: 2,
    name: "AXIS PACK",
    price: "$290.00",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2070&auto=format&fit=crop",
    metric: "02"
  },
  {
    id: 3,
    name: "ZENITH CORE",
    price: "$180.00",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070&auto=format&fit=crop",
    metric: "03"
  }
];

const BestSellers = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="container-custom px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-4 mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white italic uppercase tracking-tighter -indent-[0.05em]">
            STAPLES.
          </h2>
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/30 italic">
            // MOST DEPLOYED UNITS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {bestSellers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-900 border border-white/5 rounded-lg md:rounded-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute top-4 md:top-6 left-4 md:left-6 text-3xl md:text-5xl lg:text-6xl font-black italic text-white/5 leading-none group-hover:text-white/10 transition-colors duration-700">
                  {item.metric}
                </div>
              </div>
              <div className="mt-4 md:mt-6 lg:mt-8 flex justify-between items-end gap-2">
                <div className="flex-1">
                  <h3 className="text-sm md:text-base lg:text-lg font-black text-white italic uppercase tracking-tight line-clamp-1">{item.name}</h3>
                  <span className="text-[8px] md:text-[9px] lg:text-[10px] font-black text-white/20 uppercase tracking-[0.15em] md:tracking-[0.2em]">Tier 01 Core</span>
                </div>
                <span className="text-xs md:text-sm font-black text-white italic whitespace-nowrap">{item.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
