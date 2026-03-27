import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

/**
 * Editorial Hero Section
 * Large cinematography, massive typography, minimal supporting text.
 */
const HeroSection = () => {
  return (
    <section className="relative min-h-screen py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Immersive Background Layer */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2600&auto=format&fit=crop"
          alt="Campaign Hero"
          className="w-full h-full object-cover scale-105"
        />
        {/* Layered Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </motion.div>

      {/* Decorative Technical Borders - Cinematic Framing */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute top-12 left-12 right-12 bottom-12 border border-white/5 pointer-events-none z-10 hidden lg:block" />

      {/* Content Container */}
      <div className="container-custom relative z-20 flex flex-col items-center justify-center px-6 text-center h-full">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto flex flex-col items-center"
        >
          {/* Top Label / Campaign ID */}
          <div className="flex items-center gap-6 mb-12">
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="text-[10px] md:text-sm font-black uppercase tracking-[1em] text-white/50 animate-pulse">
              // DROP 08: THE VANGUARD ARCHIVE
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
          </div>

          {/* Massive Dominant Headline */}
          <h1 className="text-[14vw] md:text-[10vw] lg:text-[11vw] font-black text-white leading-[0.8] uppercase italic tracking-tighter -indent-[0.05em] mb-12 drop-shadow-2xl">     
            ARCHITECTING<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white/10 uppercase">UTILITY.</span>
          </h1>

          {/* Refined Narrative Text */}
          <div className="max-w-2xl mx-auto space-y-16">
            <p className="text-white/40 text-sm md:text-lg lg:text-xl font-medium italic leading-relaxed tracking-wider px-4 md:px-0">
              Engineering the intersection of high-performance technical fabrics 
              and elite urban aesthetics. A manifestation of absolute intent.        
            </p>

            {/* High-Impact CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
              <Button
                as={Link}
                to="/shop" 
                className="w-full sm:w-80 h-24 rounded-none bg-white text-black hover:bg-zinc-200 transition-all duration-700 uppercase italic font-black text-sm tracking-[0.4em] shadow-2xl relative group overflow-hidden"
              >
                <span className="relative z-10">Enter Archive</span>
                <div className="absolute inset-0 bg-emerald-500/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
              </Button>
              <Button
                as={Link}
                to="/about"
                variant="transparent"
                className="w-full sm:w-80 h-24 rounded-none border border-white/10 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-1000 uppercase italic font-black text-sm tracking-[0.4em]"
              >
                Intel Report
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Technical Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8 z-20"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20 origin-center -rotate-90 pb-16">Scroll</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/40 to-transparent relative">
            <motion.div 
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
          </div>
        </div>
      </motion.div>

      {/* Background Decorative Tech Text */}
      <div className="absolute bottom-12 left-12 hidden xl:block pointer-events-none z-20">
        <p className="text-[10px] font-black font-mono text-white/10 tracking-[0.5em] uppercase italic">
          vanguard.sys // internal_id: 8.44.08
        </p>
      </div>
      <div className="absolute bottom-12 right-12 hidden xl:block pointer-events-none z-20">
        <p className="text-[10px] font-black font-mono text-white/10 tracking-[0.5em] uppercase italic">
          lat: 35.6762° n // lng: 139.6503° e
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
