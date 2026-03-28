import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineShoppingBag, 
  HiOutlineHeart, 
  HiOutlineShare,
  HiOutlineArrowRight,
  HiOutlineCheckBadge,
  HiOutlineCube,
  HiOutlineArrowLeft,
  HiOutlineBolt
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import Button from "../components/ui/Button";
import { toast } from "react-hot-toast";
import { useSEO } from "../hooks/useSEO";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useSEO({
    title: product ? `${product.title} - VANGUARD` : 'Product Details - VANGUARD',
    description: product ? (product.description || `${product.title} - Premium tactical gear at VANGUARD`) : 'View product details and specifications',
    keywords: product ? `${product.title}, tactical, equipment, ${product.category}` : 'product, details, tactical',
    ogTitle: product ? `${product.title} - VANGUARD` : 'VANGUARD Product',
    ogDescription: product ? (product.description || product.title) : 'Premium tactical product',
    canonical: `https://vanguard.store/product/${slug}`,
  });

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Archive Retrieval Failure:", err);
        setLoading(false);
      });
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));
      toast.success(`${product.title} deployed to loadout`, {
        icon: <HiOutlineBolt className="text-emerald-500" />,
      });
    }
  };

  if (loading) {
     return (
       <div className="min-h-screen pt-40 flex items-center justify-center">
          <div className="space-y-8 text-center animate-pulse">
             <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 mx-auto" />
             <div className="h-4 bg-slate-100 w-40 rounded-full mx-auto" />
             <div className="h-10 bg-slate-100 w-80 rounded-full mx-auto" />
          </div>
       </div>
     );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-40 text-center container-custom">
        <h1 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter mb-8">Subject Not Found.</h1>
        <Button as={Link} to="/shop">Return to Archive</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-16 md:pb-20 bg-white">
      <div className="container-custom px-4 md:px-6">
        {/* Navigation Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-2 md:gap-4 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-400 hover:text-emerald-600 transition-premium mb-12 md:mb-20 group">
          <HiOutlineArrowLeft size={14} className="md:w-[16px] md:h-[16px] group-hover:-translate-x-2 transition-transform" />
          Return to Archive
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
          {/* Visual Module */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="aspect-square bg-slate-50 rounded-2xl md:rounded-[4rem] p-8 md:p-12 lg:p-24 border border-slate-100 flex items-center justify-center relative overflow-hidden group"
             >
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110" 
                />
                
                <div className="absolute top-4 md:top-8 lg:top-12 left-4 md:left-8 lg:left-12 flex flex-col gap-2 md:gap-3 lg:gap-4">
                   <div className="px-3 md:px-6 py-1.5 md:py-3 bg-slate-950 text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-lg md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-lg">
                      <HiOutlineCube size={12} className="md:w-[14px] md:h-[14px] text-emerald-500" /> Subject ID: #{product.id}
                   </div>
                   <div className="px-3 md:px-6 py-1.5 md:py-3 bg-white text-slate-950 border border-slate-200 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-lg md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-lg">
                      <HiOutlineCheckBadge size={12} className="md:w-[14px] md:h-[14px] text-emerald-500" /> Lab Verified
                   </div>
                </div>
             </motion.div>
          </div>

          {/* Intel Module */}
          <div className="lg:col-span-5 space-y-8 md:space-y-12 sticky top-32 md:top-40">
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-emerald-600 text-[8px] md:text-[10px]">
                <span className="font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">{product.category}</span>
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                <span className="font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">Inventory Status: Optimal</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-950 leading-tight md:leading-none uppercase italic tracking-tighter">
                {product.title}
              </h1>
              <p className="text-3xl md:text-4xl font-black text-slate-400 italic tracking-tighter leading-none">
                ${product.price}
              </p>
            </div>

            <div className="space-y-6 md:space-y-8 bg-slate-50 p-6 md:p-8 lg:p-10 rounded-lg md:rounded-[2.5rem] border border-slate-100">
               <div className="space-y-3 md:space-y-4">
                 <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-900 border-b border-slate-200 pb-3 md:pb-4">Specifications</h4>
                 <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium italic">
                   {product.description}
                 </p>
               </div>
               
               <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 bg-white rounded-lg md:rounded-2xl border border-slate-100 space-y-2">
                     <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-400">Rating System</span>
                     <p className="font-black text-slate-900 uppercase italic tracking-tighter text-base md:text-lg">{product.rating.rate} / 5.0</p>
                  </div>
                  <div className="p-3 md:p-4 bg-white rounded-lg md:rounded-2xl border border-slate-100 space-y-2">
                     <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-400">Units Tracked</span>
                     <p className="font-black text-slate-900 uppercase italic tracking-tighter text-base md:text-lg">{product.rating.count} Samples</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <Button 
                onClick={handleAddToCart}
                className="w-full h-20 rounded-[2rem] bg-slate-950 text-white hover:bg-emerald-600 shadow-xl shadow-slate-950/10 flex items-center justify-center gap-4 group"
              >
                Deploy to Loadout <HiOutlineShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                 <button 
                  onClick={() => {
                    dispatch(addToWishlist(product));
                    toast.success("Synchronized with Wishlist Archives");
                  }}
                  className="h-16 rounded-2xl border border-slate-200 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-premium"
                 >
                   Archive <HiOutlineHeart size={20} />
                 </button>
                 <button className="h-16 rounded-2xl border border-slate-200 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-premium">
                   Comms Share <HiOutlineShare size={18} />
                 </button>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="pt-10 border-t border-slate-100 flex items-center gap-8">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[9px] font-black uppercase text-slate-400 overflow-hidden">
                       <img src={`https://i.pravatar.cc/150?u=${i}`} alt="verified researcher" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[7px] font-black uppercase text-slate-950">
                    +1.2k
                  </div>
               </div>
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Researchers have verified this subject.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
