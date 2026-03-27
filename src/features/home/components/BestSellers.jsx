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
    <section className="py-32 bg-[#0a0a0a]">
      <div className="container-custom px-6">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter -indent-[0.05em]">
            STAPLES.
          </h2>
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 italic">
            // MOST DEPLOYED UNITS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {bestSellers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-900 border border-white/5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute top-6 left-6 text-[4vw] font-black italic text-white/5 leading-none group-hover:text-white/10 transition-colors duration-700">
                  {item.metric}
                </div>
              </div>
              <div className="mt-8 flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">{item.name}</h3>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Tier 01 Core</span>
                </div>
                <span className="text-sm font-black text-white italic">{item.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
