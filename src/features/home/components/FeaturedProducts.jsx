import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi2';

const MOCK_PRODUCTS = [
  { id: 1, title: 'SYNTHETIC OVERCOAT B-1', price: 890, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop', category: 'Outerwear' },
  { id: 2, title: 'MODULAR CARGO PANT v2', price: 450, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1974&auto=format&fit=crop', category: 'Trousers' },
  { id: 3, title: 'NEURAL LINK SENSOR HUB', price: 1200, image: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1965&auto=format&fit=crop', category: 'Hardware' },
  { id: 4, title: 'BASE LAYER COMPRESSION', price: 180, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop', category: 'Apparel' }
];

/**
 * Editorial Product Card
 * Minimal, high-fashion layout, secondary image interactions.
 */
const EditorialProductCard = ({ product, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    className="group"
  >
    <Link to={`/product/${product.id}`} className="block space-y-6">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f0f0f0]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Interaction Overlays */}
        <div className="absolute top-6 right-6 flex flex-col gap-3">
           <button className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-none flex items-center justify-center text-white opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hover:bg-white hover:text-black">
              <HiOutlineHeart size={18} />
           </button>
           <button className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-none flex items-center justify-center text-white opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hover:bg-white hover:text-black">
              <HiOutlineShoppingBag size={18} />
           </button>
        </div>

        <div className="absolute inset-0 border border-transparent group-hover:border-black/5 transition-all pointer-events-none" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">
            {product.category}
          </span>
          <span className="text-sm font-black italic tracking-tighter">
            ${product.price}
          </span>
        </div>
        <h3 className="text-lg font-black uppercase italic tracking-tighter leading-tight group-hover:underline underline-offset-8 transition-all">
          {product.title}
        </h3>
      </div>
    </Link>
  </motion.div>
);

const FeaturedProducts = () => {
  return (
    <section className="bg-white py-40">
      <div className="container-custom px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
          <div className="space-y-6 max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-black/30">
              Selection: Curated
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.85]">
              ESSENTIAL <br />
              <span className="text-black/20">DEPLOYMENTS.</span>
            </h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] pb-2 border-b-2 border-black/5 hover:border-black transition-all">
            Full Archive <HiOutlineArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {MOCK_PRODUCTS.map((product, i) => (
            <EditorialProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
