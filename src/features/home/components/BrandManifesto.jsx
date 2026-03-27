import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Brand Manifesto / Philosophy Section
 * Minimal, Typography-driven, large text.
 */
const BrandManifesto = () => {
  return (
    <section className="bg-black py-40 md:py-80 overflow-hidden relative">      
      <div className="container-custom px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-40">

          <div className="space-y-12">
            <span className="text-[10px] md:text-sm font-black uppercase tracking-[1em] text-white/30 block mb-10 text-center animate-pulse">
              PHILOSOPHY // THE MANIFESTO
            </span>
            <motion.h2
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5 }}
               className="text-[10vw] md:text-[8vw] lg:text-[7vw] font-black leading-[0.8] uppercase italic tracking-tighter text-center text-white -indent-[0.05em]"
            >
              WE DO NOT <br />
              <span className="text-white/20">JUST CREATE.</span> <br />        
              WE EVOLVE.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-start">
             <div className="space-y-20 lg:pt-40">
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] leading-loose">
                   01 // THE MISSION <br />
                   To redefine the concept of utility by merging futuristic engineering with human ergonomic requirements.
                </p>
                <div className="w-40 h-[1px] bg-white/10" />
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] leading-loose">
                   02 // THE VISION <br />
                   Creating the ultimate urban uniform for the next generation of pioneers, thinkers, and explorers.
                </p>
             </div>

             <div className="space-y-12">
                <p className="text-white/60 text-xl md:text-3xl font-medium italic leading-relaxed tracking-wide">
                  The Vanguard Archives is more than a store. 
                  It is a research laboratory exploring the 
                  limits of material science and technical 
                  design. We believe that form is the logical 
                  conclusion of optimal function.
                </p>
                <p className="text-white/30 text-base md:text-lg font-medium italic leading-relaxed tracking-wide">
                  Every deployment in our archive is tested 
                  in extreme environments to ensure 
                  absolute resilience and adaptability 
                  in the face of the unknown.
                </p>
             </div>
          </div>

        </div>
      </div>

      {/* Background Decorative Matrix */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden overflow-x-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100vh] font-black text-white/5 uppercase select-none pointer-events-none whitespace-nowrap -rotate-12 italic tracking-tighter">
            VANGUARD LABS
         </div>
      </div>
    </section>
  );
};

export default BrandManifesto;