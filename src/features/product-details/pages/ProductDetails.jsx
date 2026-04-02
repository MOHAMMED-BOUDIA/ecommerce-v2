import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineShoppingBag, HiOutlineHeart, HiOutlineShieldCheck, 
  HiOutlineTruck, HiOutlineArrowLeft, HiOutlineChevronRight,
  HiOutlinePlus, HiOutlineMinus, HiOutlineShare
} from 'react-icons/hi';
import { products } from '../../../data/products';
import Button from '../../../components/ui/Button';
import PriceTag from '../../../components/ui/PriceTag';
import RatingStars from '../../../components/ui/RatingStars';
import SectionTitle from '../../../components/ui/SectionTitle';

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!product) return (
    <div className="h-screen flex items-center justify-center">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="pb-32 pt-8">
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
         <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <HiOutlineChevronRight size={14} />
            <Link to="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
            <HiOutlineChevronRight size={14} />
            <span className="text-slate-900">{product.name}</span>
         </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Image Gallery */}
            <div className="space-y-6">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="aspect-square rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100"
               >
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover" 
                    alt={product.name} 
                  />
               </motion.div>
               <div className="grid grid-cols-4 gap-4">
                  {[product.image, ...Array(3).fill(product.image)].map((img, i) => (
                     <button 
                        key={i} 
                        onClick={() => setSelectedImage(i)}
                        className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-emerald-600 ring-4 ring-emerald-600/10' : 'border-transparent opacity-60 hover:opacity-100'}`}
                     >
                        <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                     </button>
                  ))}
               </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col">
               <div className="space-y-6 border-b border-slate-100 pb-10">
                  <div className="flex items-center justify-between">
                     <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                        {product.category}
                     </span>
                     <div className="flex items-center gap-4">
                        <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-rose-500 transition-colors">
                           <HiOutlineHeart size={20} />
                        </button>
                        <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-emerald-600 transition-colors">
                           <HiOutlineShare size={20} />
                        </button>
                     </div>
                  </div>

                  <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                     {product.name}
                  </h1>

                  <div className="flex items-center gap-6">
                     <PriceTag amount={product.price} oldAmount={product.oldPrice} size="xl" />
                     <div className="h-8 w-px bg-slate-100" />
                     <div className="flex items-center gap-3">
                        <RatingStars rating={product.rating} size="md" />
                        <span className="text-slate-400 font-bold text-sm">(128 Reviews)</span>
                     </div>
                  </div>

                  <p className="text-slate-500 text-lg font-medium leading-relaxed">
                     Designed for high-performance living. Features a lightweight construction with premium materials sourced globally for maximum durability and aesthetic appeal.
                  </p>
               </div>

               {/* Configuration */}
               <div className="py-10 space-y-10">
                  {/* Quantity */}
                  <div className="space-y-4">
                     <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Select Quantity</h4>
                     <div className="flex items-center gap-4">
                        <div className="inline-flex items-center bg-slate-50 rounded-2xl p-2 border border-slate-100">
                           <button 
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all"
                           >
                              <HiOutlineMinus size={18} />
                           </button>
                           <span className="w-16 text-center font-black text-xl text-slate-900">{quantity}</span>
                           <button 
                              onClick={() => setQuantity(quantity + 1)}
                              className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all"
                           >
                              <HiOutlinePlus size={18} />
                           </button>
                        </div>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Only {product.stock} units left</p>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                     <Button 
                        variant="primary" 
                        size="xl" 
                        icon={<HiOutlineShoppingBag />}
                        className="flex-1 h-20 rounded-[2rem] text-xl font-black"
                     >
                        Add to Cart  {(product.price * quantity).toFixed(2)} DH
                     </Button>
                  </div>
               </div>

               {/* Trust Badges */}
               <div className="grid grid-cols-2 gap-4 py-8 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                     <div className="text-emerald-600 bg-white p-2.5 rounded-xl shadow-sm"><HiOutlineTruck size={20} /></div>
                     <span className="text-[10px] sm:text-xs font-black text-slate-700 uppercase leading-none">Global Express Shipping</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                     <div className="text-emerald-600 bg-white p-2.5 rounded-xl shadow-sm"><HiOutlineShieldCheck size={20} /></div>
                     <span className="text-[10px] sm:text-xs font-black text-slate-700 uppercase leading-none">2-Year Limited Warranty</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Detailed Info Tabs */}
         <div className="mt-32">
            <div className="flex items-center justify-center gap-12 border-b border-slate-100 mb-16">
               {['description', 'specifications', 'reviews'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-6 text-xs font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                     {tab}
                     {activeTab === tab && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-full" />}
                  </button>
               ))}
            </div>

            <div className="max-w-4xl mx-auto min-h-[300px]">
               <AnimatePresence mode="wait">
                  {activeTab === 'description' && (
                     <motion.div 
                        key="desc" 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8 text-slate-500 font-medium text-lg leading-loose"
                     >
                        <p>Our {product.name} represents the pinnacle of modern design. Every stitch and curve has been meticulously optimized for both visual impact and functional longevity.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                           <div className="space-y-4">
                              <h5 className="text-slate-900 font-black uppercase text-xs tracking-widest">Key Features</h5>
                              <ul className="space-y-2 list-disc pl-4 text-sm">
                                 <li>Advanced ergonomic design for all-day comfort</li>
                                 <li>Weather-resistant premium outer shell</li>
                                 <li>Integrated smart compartment system</li>
                                 <li>Hand-finished detailing in Stockholm</li>
                              </ul>
                           </div>
                           <div className="space-y-4">
                              <h5 className="text-slate-900 font-black uppercase text-xs tracking-widest">Materials</h5>
                              <ul className="space-y-2 list-disc pl-4 text-sm">
                                 <li>100% Recycled Military Grade Polyamide</li>
                                 <li>Italian Full-Grain Vegetable Tanned Leather</li>
                                 <li>Aerospace Aluminum Hardware</li>
                              </ul>
                           </div>
                        </div>
                     </motion.div>
                  )}
                  {activeTab === 'specifications' && (
                     <motion.div 
                        key="specs" 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden"
                     >
                        {[
                           ['Weight', '1.2 kg'],
                           ['Dimensions', '45 x 30 x 15 cm'],
                           ['Volume', '20L'],
                           ['Warranty', '2 Years'],
                           ['Country of Origin', 'Sweden']
                        ].map(([k, v]) => (
                           <div key={k} className="flex justify-between p-6 bg-white">
                              <span className="font-bold text-slate-400 uppercase text-xs tracking-widest">{k}</span>
                              <span className="font-black text-slate-900">{v}</span>
                           </div>
                        ))}
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>

         {/* Related Products */}
         <div className="mt-32">
            <SectionTitle title="YOU MAY ALSO LIKE" subtitle="Recommended for you" align="center" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {products.slice(0, 4).map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="group">
                     <div className="aspect-square rounded-[2rem] bg-slate-50 mb-6 overflow-hidden">
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 duration-700" alt={p.name} />
                     </div>
                     <h4 className="font-black text-slate-900 uppercase tracking-tight group-hover:text-emerald-600 transition-colors truncate">{p.name}</h4>
                     <PriceTag amount={p.price} size="sm" />
                  </Link>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProductDetails;
