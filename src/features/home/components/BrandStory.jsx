import React from 'react';
import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section className="py-16 md:py-24 lg:py-40 bg-[#0a0a0a] overflow-hidden relative">
      {/* Background visual texture */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0f0f0f] -z-0" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-0" />

      <div className="container-custom px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
                alt="Craftsmanship"
                className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              />
            </div>
            {/* Design Spec Overlay */}
            <div className="absolute -bottom-8 md:-bottom-10 -right-8 md:-right-10 bg-white p-6 md:p-8 lg:p-10 hidden md:block">
              <span className="text-black text-[10px] font-black uppercase tracking-[0.5em] block mb-2">// SPEC 8.4</span>
              <p className="text-black text-lg font-black italic uppercase leading-none tracking-tighter">
                UNCOMPROMISING<br />INTEGRITY.
              </p>
            </div>
          </motion.div>

          {/* Narrative Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="space-y-8 md:space-y-12"
          >
            <div className="space-y-4 md:space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30 italic block">
                // ORIGIN STORY
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-tight md:leading-none -indent-[0.05em]">
                BORN FROM <br />SILENCE.
              </h2>
            </div>

            <div className="space-y-8 max-w-lg">
              <p className="text-white/50 text-base md:text-lg font-medium leading-relaxed italic border-l border-white/10 pl-8">
                Vanguard started in a subterranean studio with a single objective: 
                to strip away the noise of fast fashion and return to the core of 
                utility, material science, and brutalist form.
              </p>
              <p className="text-white/30 text-sm leading-relaxed tracking-wide">
                We don't follow trends. We architect deployments. Every stitch is 
                a calculated decision, every fabric a choice in longevity. This 
                is not just apparel—it is the uniform of the deliberate.
              </p>
            </div>

            <div className="pt-8">
              <div className="flex items-center gap-4 group cursor-pointer w-fit">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] group-hover:tracking-[0.6em] transition-all duration-500">Read Entire Archive</span>
                <div className="w-12 h-[1px] bg-white group-hover:w-20 transition-all duration-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;