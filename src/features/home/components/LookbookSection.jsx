import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi2';

const LookbookSection = () => {
  return (
    <section className="bg-white py-16 md:py-24 lg:py-40 overflow-hidden">
      <div className="container-custom px-4 md:px-6 text-center mb-12 md:mb-16 lg:mb-24">
        <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.8em] block mb-6 animate-pulse">
           Visual Archive // 2026.1
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black uppercase italic tracking-tighter leading-none mb-8 md:mb-10">
           LIMITS <br />
           <span className="text-slate-100">OF FORM.</span>
        </h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-slate-400 text-xs md:text-sm lg:text-base font-medium italic leading-relaxed tracking-wide">
             Exploring the intersection of human movement and technical architecture. A study in obsidian, chrome, and structural resilience.
          </p>
        </div>
      </div>

      <div className="flex gap-6 md:gap-8 lg:gap-10 overflow-x-auto no-scrollbar scroll-smooth px-4 md:px-6 lg:px-12">
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
            className="w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[35vw] aspect-[3/4] flex-shrink-0 relative group rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-100"
          >
            <img src={img} alt={`Lookbook ${i}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-premium flex items-center justify-center">
               <span className="px-6 md:px-8 py-3 md:py-4 bg-white text-slate-950 font-black uppercase italic text-[9px] md:text-[10px] tracking-widest rounded-xl md:rounded-2xl">
                 Expand Entry
               </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 md:mt-20 lg:mt-24 text-center">
        <Link to="/lookbook" className="group flex items-center justify-center gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-950 transition-colors">
          View Full Archive <HiOutlineArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default LookbookSection;