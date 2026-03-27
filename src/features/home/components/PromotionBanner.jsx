import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const PromotionBanner = () => {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white group cursor-crosshair">
            {/* Split Screen Concept (Editorial) */}
            <div className="absolute inset-0 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black/5">
                {/* Left Side: Cinematography */}
                <motion.div 
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 2 }}
                    className="w-full h-full relative"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop" 
                        alt="Restricted Drop" 
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700" />
                </motion.div>
                
                {/* Visual Divide Marker */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/5" />
            </div>

            {/* Content Overlay */}
            <div className="container-custom relative z-10 px-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        className="space-y-6"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-black/40 block italic">
                            // LIMITED PHASE // DROP 01
                        </span>
                        
                        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-black italic uppercase tracking-tighter leading-none -indent-[0.05em] mix-blend-difference invert group-hover:invert-0 transition-all duration-700">
                            THE <br />OFFER.
                        </h2>

                        <p className="text-black/60 text-sm md:text-base font-bold max-w-md leading-relaxed tracking-wide italic">
                            Archive members receive priority clearance. 
                            Use Protocol <span className="text-black underline underline-offset-8 decoration-2">VANGUARD20</span> for 20% tier reduction.
                        </p>

                        <div className="pt-10">
                            <Button
                                as={Link}
                                to="/shop"
                                className="px-16 h-20 bg-black text-white hover:bg-zinc-800 transition-all duration-700 rounded-none italic font-black text-xs tracking-[0.3em] uppercase"
                            >
                                Secure Access
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2 }}
                    className="hidden lg:block text-right"
                >
                    <span className="text-[12vw] font-black italic text-black/5 tracking-tighter uppercase select-none leading-none -indent-[0.1em]">
                        20%<br />OFF
                    </span>
                </motion.div>
            </div>
        </section>
    );
};

export default PromotionBanner;