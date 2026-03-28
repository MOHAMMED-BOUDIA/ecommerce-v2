import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineTruck, HiOutlineShieldCheck, HiOutlineReceiptRefund, HiOutlineClock } from 'react-icons/hi2';

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
    icon: HiOutlineReceiptRefund,
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
    <section className="py-16 md:py-24 lg:py-32 bg-[#050505] border-t border-white/5">
      <div className="container-custom px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 xl:gap-16">
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
                <div className="w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 flex items-center justify-center rounded-full border border-white/5 group-hover:border-white/20 group-hover:bg-white/5 transition-all duration-700">
                  <benefit.icon className="w-5 md:w-6 lg:w-6 h-5 md:h-6 lg:h-6 text-white/40 group-hover:text-white transition-colors duration-500" />
                </div>
              </div>
              
              <h3 className="text-[10px] md:text-xs lg:text-xs font-black tracking-[0.2em] md:tracking-[0.4em] text-white/80 mb-4 uppercase italic">
                {benefit.title}
              </h3>
              <p className="text-white/30 text-[11px] md:text-[12px] lg:text-[12px] leading-relaxed font-medium group-hover:text-white/50 transition-colors duration-500 max-w-[200px]">
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