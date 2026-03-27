import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCpuChip, HiOutlineCube, HiOutlineShieldCheck, HiOutlineSparkles } from 'react-icons/hi2';

const features = [
  {
    icon: HiOutlineCpuChip,
    title: "INTELLIGENT WEAVE",
    description: "Self-regulating fibers that adapt to thermal fluctuations in real-time."
  },
  {
    icon: HiOutlineShieldCheck,
    title: "BALLISTIC GRADE",
    description: "Reinforcement panels tested against extreme abrasive forces."
  },
  {
    icon: HiOutlineCube,
    title: "MODULAR KINETICS",
    description: "Magnetic attachment systems for rapid gear reconfiguration."
  },
  {
    icon: HiOutlineSparkles,
    title: "ZERO MASS",
    description: "Aerospace-derived alloys providing structural rigidity with minimal weight."
  }
];

/**
 * Editorial Benefits / Features Highlights
 * Focus on technical specs and elite performance.
 */
const FeaturesHighlights = () => {
  return (
    <section className="py-32 bg-[#0a0a0a] border-y border-white/5">
      <div className="container-custom px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="mb-8 relative">
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-colors duration-500">
                  <feature.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-500" />
                </div>
                {/* Micro-detail line */}
                <div className="absolute top-0 right-0 w-4 h-[1px] bg-white/10 group-hover:bg-white/40 transition-colors duration-500" />
              </div>
              
              <h3 className="text-xs font-black tracking-[0.3em] text-white mb-4 italic uppercase">
                {feature.title}
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed font-medium group-hover:text-white/60 transition-colors duration-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesHighlights;