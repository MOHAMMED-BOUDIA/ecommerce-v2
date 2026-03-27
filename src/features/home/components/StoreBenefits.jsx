import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineTruck, HiOutlineShieldCheck, HiOutlineReceiptRefun, HiOutlineClock } from 'react-icons/hi2';

const benefits = [
  {
    icon: HiOutlineTruck,
    title: "EXPRESS CLEARANCE",
    description: "Global logistics network ensuring rapid deployment of architectural gear."
  },
  {
    icon: HiOutlineShieldCheck,
    title: "SECURE ENCRYPTION",
    description: "Tier-1 financial security protocols for all transactional data."
  },
  {
    icon: HiOutlineReceiptRefun,
    title: "30-DAY EXCHANGE",
    description: "Seamless rotation of inventory within our 30-day archive policy."
  },
  {
    icon: HiOutlineClock,
    title: "24/7 SUPPORT",
    description: "Dedicated tactical support for all archive inquiries and technical help."
  }
];

const StoreBenefits = () => {
  return (
    <section className="py-24 bg-[#050505] border-t border-white/5">
      <div className="container-custom px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-6 relative">
                <div className="w-16 h-16 flex items-center justify-center rounded-full border border-white/5 group-hover:border-white/20 group-hover:bg-white/5 transition-all duration-700">
                  <benefit.icon className="w-6 h-6 text-white/40 group-hover:text-white transition-colors duration-500" />
                </div>
              </div>
              
              <h3 className="text-xs font-black tracking-[0.4em] text-white/80 mb-4 uppercase italic">
                {benefit.title}
              </h3>
              <p className="text-white/30 text-[12px] leading-relaxed font-medium group-hover:text-white/50 transition-colors duration-500 max-w-[200px]">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreBenefits;