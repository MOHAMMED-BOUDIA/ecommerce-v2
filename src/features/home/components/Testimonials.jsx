import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const testimonials = [
  {
    quote: "The visual language and material integrity are unmatched. It's more than gear; it's a technical manifesto.",
    author: "Elias Vance",
    role: "Architect, Neo-Tokyo"
  },
  {
    quote: "Resilience in high-density environments. The modularity systems have replaced my entire carry infrastructure.",
    author: "Sora Kim",
    role: "Visual Strategist"
  },
  {
    quote: "Minimalism pushed to its absolute logical conclusion. Perfect utility, silent aesthetics.",
    author: "Marcus Thorne",
    role: "Industrial Designer"
  }
];

/**
 * Editorial Testimonials Section
 * Focus on individual accounts of the brand experience.
 */
const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 lg:py-40 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="container-custom px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center mb-12 md:mb-16 lg:mb-24"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 italic">
            // USER ARCHIVE // INTEL
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mt-8 tracking-tighter uppercase italic -indent-[0.05em]">
            THE HUMAN <br />ELEMENT.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 xl:gap-16">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1 }}
              className="flex flex-col relative group"
            >
              {/* Large Quotation Mark - Stylized */}
              <div className="absolute -top-12 -left-6 text-white/5 text-6xl md:text-8xl lg:text-[120px] font-black select-none group-hover:text-white/10 transition-colors duration-700 leading-none">
                "
              </div>
              
              <blockquote className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/70 italic font-medium leading-relaxed tracking-tight mb-12 relative z-10">
                {item.quote}
              </blockquote>

              <div className="mt-auto pl-4 border-l border-white/10">
                <cite className="not-italic block">
                  <span className="text-xs font-black uppercase text-white tracking-[0.3em]">
                    {item.author}
                  </span>
                  <span className="block text-[10px] uppercase text-white/30 tracking-[0.2em] mt-1 italic">
                    {item.role}
                  </span>
                </cite>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;