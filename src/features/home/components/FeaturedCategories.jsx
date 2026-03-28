import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    name: 'Hardware',
    slug: 'electronics',
    count: '042',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Apparel',
    slug: 'clothing',
    count: '118',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop'
  },
  { 
    name: 'Tactical',
    slug: 'accessories',
    count: '067',
    image: 'https://images.unsplash.com/photo-1584380931214-dbb5e7836894?q=80&w=2070&auto=format&fit=crop'
  }
];

/**
 * Editorial Category Strip
 * Minimal blocks, large counts, high-end photography.
 */
const FeaturedCategories = () => {
  return (
    <section className="bg-white py-16 md:py-24 lg:py-40">
      <div className="container-custom px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
            >
              <Link to={`/shop?category=${cat.slug}`} className="group block relative overflow-hidden aspect-[4/5] bg-slate-100">
                {/* Visual */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-10 flex flex-col justify-between border border-transparent group-hover:border-black/5 transition-all">       
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 group-hover:text-black transition-colors">
                      {cat.count}
                    </span>
                    <div className="w-8 h-[1px] bg-black/10 group-hover:w-12 group-hover:bg-black transition-all duration-500" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter text-black leading-none">
                      {cat.name}
                    </h3>
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-black/0 group-hover:text-black transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      Explore Series
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;