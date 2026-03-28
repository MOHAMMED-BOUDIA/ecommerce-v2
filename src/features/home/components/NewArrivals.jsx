import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const products = [
    {
        id: 1,
        name: "ARCHIVE SHELL",
        price: "450.00 DH",
        category: "DEPLOYMENT 01",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "MODULAR KINETIC",
        price: "320.00 DH",
        category: "DEPLOYMENT 02",
        image: "https://images.unsplash.com/photo-1514332130164-2795c697089b?q=80&w=2070&auto=format&fit=crop"
    }
];

const NewArrivals = () => {
    return (
        <section className="py-16 md:py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden">
            <div className="container-custom px-4 md:px-6 relative">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-24 gap-6 md:gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="space-y-6"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40 block italic">
                            // NEW DEPLOYMENTS
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-white italic uppercase tracking-tighter leading-tight md:leading-none -indent-[0.05em]">
                            THE <br />NEW<br />PROTO.
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                    >
                        <Button
                            as={Link}
                            to="/shop"
                            variant="white"
                            className="px-6 md:px-16 h-12 md:h-20 bg-white text-black hover:bg-[#e2e2e2] transition-all duration-700 rounded-none italic font-black text-[9px] md:text-xs tracking-widest uppercase"
                        >
                            View All Proto
                        </Button>
                    </motion.div>
                </div>

                {/* Vertical Text Side Decoration */}
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 origin-right -rotate-90">
                    <span className="text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-black italic text-white/5 tracking-tighter uppercase whitespace-nowrap leading-none">
                        VANGUARD 2026
                    </span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 xl:gap-24 relative z-10 lg:pr-8 xl:pr-32">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 1 }}
                            className="group cursor-none"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                                />
                                {/* Micro Details */}
                                <div className="absolute top-8 left-8 flex flex-col items-start gap-4">
                                     <span className="text-[10px] bg-white text-black px-4 py-1 font-black italic uppercase tracking-widest">
                                        RESTRICTED
                                     </span>
                                     <span className="text-[9px] text-white/60 font-black uppercase tracking-[0.4em]">
                                        // UNIT {index + 124}
                                     </span>
                                </div>
                            </div>
                            
                            <div className="mt-10 flex items-start justify-between">
                                <div className="space-y-4">
                                    <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                                        {product.name}
                                    </h3>
                                    <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em] block italic leading-none">
                                        {product.category}
                                    </span>
                                </div>
                                <span className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">
                                    {product.price}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;