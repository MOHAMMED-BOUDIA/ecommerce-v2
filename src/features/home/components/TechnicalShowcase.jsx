import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

/**
 * Technical Showcase Section
 * Focus on precision engineering with a technical schematic aesthetic.
 */
const TechnicalShowcase = () => {
    return (
        <section className="py-40 bg-zinc-950 relative overflow-hidden border-y border-white/5">
            {/* Background Blueprint Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
            />

            <div className="container-custom px-6 relative z-10">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-24">
                    {/* Visual Segment */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="aspect-square bg-[#0a0a0a] border border-white/10 p-8 relative group">
                            {/* Corner Markers */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500/50" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500/50" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500/50" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500/50" />

                            <img 
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" 
                                alt="Engineering Spec" 
                                className="w-full h-full object-contain grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                            />
                            
                            {/* Floating Tech Data */}
                            <div className="absolute top-10 right-10 text-right space-y-2 hidden md:block">
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block animate-pulse">// SYSTEM ACTIVE</span>
                                <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter block">LOAD SETTINGS [88.2]</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Narrative Segment */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="w-full lg:w-1/2 space-y-12"
                    >
                        <div className="space-y-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30 italic block">
                                // ARCHITECTURAL DEPLOYMENT
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none -indent-[0.05em]">
                                BUILT FOR <br />ELITE UTILITY.
                            </h2>
                        </div>

                        <div className="space-y-8 max-w-lg">
                            <p className="text-white/50 text-base md:text-lg font-medium leading-relaxed italic border-l border-emerald-500/30 pl-8">
                                We've re-engineered the standard toolkit into a modular ecosystem. 
                                High-tensile fibers meet ergonomic architecture.
                            </p>
                            <div className="grid grid-cols-2 gap-8 text-[11px] font-black text-white/40 uppercase tracking-widest italic">
                                <div>
                                    <span className="text-white block mb-2">// TERRAIN TIER</span>
                                    <span>All-Weather Reactive</span>
                                </div>
                                <div>
                                    <span className="text-white block mb-2">// CORE MASS</span>
                                    <span>Reduced 14% [Ultra-Lite]</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <Button
                                as={Link}
                                to="/shop"
                                className="px-16 h-20 bg-emerald-600 text-white hover:bg-emerald-500 transition-all duration-700 rounded-none italic font-black text-xs tracking-[0.3em] uppercase"
                            >
                                Secure Unit
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TechnicalShowcase;