import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi2';

const LookbookSection = () => {
  return (
    <section className="bg-white py-40 overflow-hidden">
      <div className="container-custom px-6 text-center mb-24">
        <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.8em] block mb-6 animate-pulse">
           Visual Archive // 2026.1
        </span>
        <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-10">
           LIMITS <br />
           <span className="text-slate-100">OF FORM.</span>
        </h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-slate-400 text-sm font-medium italic leading-relaxed tracking-wide">
             Exploring the intersection of human movement and technical architecture. A study in obsidian, chrome, and structural resilience.
          </p>
        </div>
      </div>

      <div className="flex gap-10 overflow-x-auto no-scrollbar scroll-smooth px-6 md:px-[10vw]">
        {[
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1974&auto=format&fit=crop'
        ].map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="w-[80vw] md:w-[45vw] lg:w-[30vw] aspect-[3/4] flex-shrink-0 relative group rounded-[3rem] overflow-hidden bg-slate-100"
          >
            <img src={img} alt={`Lookbook ${i}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-premium flex items-center justify-center">
               <span className="px-8 py-4 bg-white text-slate-950 font-black uppercase italic text-[10px] tracking-widest rounded-2xl">
                 Expand Entry
               </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <Link to="/lookbook" className="group flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-950 transition-colors">
          View Full Archive <HiOutlineArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default LookbookSection;