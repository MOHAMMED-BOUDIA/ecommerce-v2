import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

/**
 * Editorial Showcase Section
 * Large image + narrative text for specific product deep-dive.
 */
const EditorialShowcase = () => {
    return (
        <section className="py-40 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-900/30 -z-0" />
            
            <div className="container-custom px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="relative group"
                    >
                        <div className="aspect-[4/5] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2079&auto=format&fit=crop" 
                                alt="Technical Precision" 
                                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                            />
                        </div>
                        {/* Technical Label Overlay */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-8 hidden md:block">
                            <span className="text-black text-[10px] font-black uppercase tracking-[0.6em] block mb-2">// SPEC 04.9</span>
                            <p className="text-black text-xl font-black italic tracking-tighter uppercase leading-none">
                                MATERIAL<br />SYNTHESIS.
                            </p>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30 italic block">
                                // DEEP DIVE ARCHIVE
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none -indent-[0.05em]">
                                THE ART OF <br />PRECISION.
                            </h2>
                        </div>

                        <div className="space-y-8 max-w-lg">
                            <p className="text-white/50 text-base md:text-lg font-medium leading-relaxed italic border-l border-white/10 pl-8">
                                Engineering is more than just assembly. It's the calculated fusion of aerospace aesthetics with everyday urban utility.
                            </p>
                            <p className="text-white/30 text-sm leading-relaxed tracking-wide">
                                Every component of the Vanguard Series is stress-tested in high-density environments. We prioritize structural integrity over seasonal trends, ensuring each unit remains an asset in your deployment long after the drop.
                            </p>
                        </div>

                        <div className="pt-8">
                            <Button
                                as={Link}
                                to="/shop"
                                className="px-16 h-20 bg-white text-black hover:bg-zinc-200 transition-all duration-700 rounded-none italic font-black text-xs tracking-[0.3em] uppercase"
                            >
                                Explore Series
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EditorialShowcase;