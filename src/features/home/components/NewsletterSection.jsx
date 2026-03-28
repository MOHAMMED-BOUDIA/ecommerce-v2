import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';

/**
 * Editorial Newsletter
 * Focus on precision and high-value access.
 */
const NewsletterSection = () => {
  return (
    <section className="py-16 md:py-24 lg:py-40 bg-zinc-950 flex items-center justify-center relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-6 md:left-10 w-[1px] h-full bg-white/5" />
      <div className="absolute top-0 right-6 md:right-10 w-[1px] h-full bg-white/5" />

      <div className="max-w-4xl px-4 md:px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="space-y-8 md:space-y-12"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40 block italic">
            // JOIN THE PROTOCOL
          </span>
          
          <h2 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-white italic uppercase tracking-tighter leading-tight md:leading-[0.85] -indent-[0.05em]">
            ACCESS THE <br />ARCHIVE.
          </h2>

          <p className="text-white/40 text-xs md:text-sm lg:text-base font-medium max-w-lg mx-auto leading-relaxed tracking-wide italic">
             Receive intelligence reports on modular deployments and restricted-access drops. 
             No noise. Just signals.
          </p>

          <form className="mt-12 md:mt-16 flex flex-col md:flex-row items-center gap-3 md:gap-4 max-w-2xl mx-auto">
            <div className="relative w-full group">
              <input
                type="email"
                placeholder="INTEL-ID@NETWORK.COM"
                className="w-full bg-transparent border-b border-white/10 py-4 md:py-6 px-3 md:px-4 text-white text-[9px] md:text-xs font-black uppercase tracking-[0.4em] focus:outline-none focus:border-white transition-all duration-700 placeholder:text-white/20"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-focus-within:w-full transition-all duration-1000 ease-out" />
            </div>
            
            <Button
              type="submit"
              className="w-full md:w-auto px-6 md:px-16 h-12 md:h-14 lg:h-20 bg-white text-black hover:bg-[#e2e2e2] transition-all duration-700 uppercase italic font-black text-[9px] md:text-xs tracking-widest rounded-none shadow-2xl"
            >
              Authorize
            </Button>
          </form>

          {/* Compliance text */}
          <div className="pt-8">
            <p className="text-[10px] uppercase font-black tracking-widest text-white/10 hover:text-white/30 transition-colors duration-1000 cursor-help">
              TRUST PROTOCOL // END-TO-END // CONSENT 2026/08
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;