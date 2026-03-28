import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineShoppingBag, 
  HiOutlineHeart, 
  HiHeart,
  HiOutlineShare,
  HiOutlineArrowRight,
  HiOutlineCheckBadge,
  HiOutlineCube,
  HiOutlineArrowLeft,
  HiOutlineBolt,
  HiOutlineMinus,
  HiOutlinePlus
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { addItem, toggleCart } from "../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";
import Button from "../components/ui/Button";
import { toast } from "react-hot-toast";
import { useSEO } from "../hooks/useSEO";
import { productDataService } from "../services/productDataService";

const ProductDetail = () => {
  const { slug, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const dispatch = useDispatch();
  
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false;

  useSEO({
    title: product ? `${product.title} - VANGUARD` : 'Product Details - VANGUARD',
    description: product ? (product.description || `${product.title} - Premium tactical gear at VANGUARD`) : 'View product details and specifications',
    keywords: product ? `${product.title}, tactical, equipment, ${product.category}` : 'product, details, tactical',
    ogTitle: product ? `${product.title} - VANGUARD` : 'VANGUARD Product',
    ogDescription: product ? (product.description || product.title) : 'Premium tactical product',
    canonical: `https://vanguard.store/product/${slug || id}`,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setNotFound(false);
    setQuantity(1);
    
    let foundProduct = null;
    
    try {
      if (slug) {
        foundProduct = productDataService.getBySlug(slug);
      }
      
      if (!foundProduct && id) {
        foundProduct = productDataService.getById(id);
      }

      if (foundProduct) {
        setProduct(foundProduct);
        setNotFound(false);
        
        const allInCategory = productDataService.getByCategory(foundProduct.category);
        setRelatedProducts(allInCategory.filter(p => p.id !== foundProduct.id).slice(0, 4));
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error("Archive Retrieval Failure:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [slug, id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({ ...product, quantity }));
      dispatch(toggleCart());
      toast.success(`${quantity}x ${product.title} deployed to loadout`, {
        icon: <HiOutlineBolt className="text-emerald-500" />,
      });
    }
  };

  const handleQuantityChange = (type) => {
    if (type === 'inc') setQuantity(prev => prev + 1);
    else if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Subject removed from Archive");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Synchronized with Wishlist Archives");
    }
  };

  const handleShare = async () => {
    if (!product) return;
    const shareData = {
      title: 'VANGUARD - Tactical Equipment',
      text: `Check out the ${product.title} at VANGUARD.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Intel Location Copied to Clipboard");
      }
    } catch (err) {
      console.error("Comms Failure:", err);
    }
  };

  if (loading) {
     return (
       <div className="min-h-screen pt-40 flex items-center justify-center bg-white">
          <div className="space-y-8 text-center animate-pulse">
             <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 mx-auto" />
             <div className="h-4 bg-slate-100 w-40 rounded-full mx-auto" />
             <div className="h-10 bg-slate-100 w-80 rounded-full mx-auto" />
          </div>
       </div>
     );
  }

  if (notFound || !product) {
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
        <Link to="/shop" className="inline-flex items-center gap-2 md:gap-4 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-400 hover:text-emerald-600 transition-premium mb-12 md:mb-20 group">
          <HiOutlineArrowLeft size={14} className="md:w-[16px] md:h-[16px] group-hover:-translate-x-2 transition-transform" />
          Return to Archive
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
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
                PKR {product.price?.toLocaleString()}
              </p>
            </div>

            <div className="space-y-6 md:space-y-8 bg-slate-50 p-6 md:p-8 lg:p-10 rounded-lg md:rounded-[2.5rem] border border-slate-100">
               <div className="space-y-3 md:space-y-4">
                 <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-900 border-b border-slate-200 pb-3 md:pb-4">Specifications</h4>
                 <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium italic">
                   {product.fullDescription || product.description || product.shortDescription}
                 </p>
               </div>
               
               <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 bg-white rounded-lg md:rounded-2xl border border-slate-100 space-y-2">
                     <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-400">Rating System</span>
                     <p className="font-black text-slate-900 uppercase italic tracking-tighter text-base md:text-lg">
                       {(product.rating?.rate || product.rating || 0).toFixed(1)} / 5.0
                     </p>
                  </div>
                  <div className="p-3 md:p-4 bg-white rounded-lg md:rounded-2xl border border-slate-100 space-y-2">
                     <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-400">Units Tracked</span>
                     <p className="font-black text-slate-900 uppercase italic tracking-tighter text-base md:text-lg">
                       {(product.rating?.count || product.reviews || 0)} Samples
                     </p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-5 md:gap-6">
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Unit Allocation:</span>
                <div className="flex items-center border border-slate-200 rounded-2xl p-1 bg-white shadow-sm overflow-hidden">
                  <button 
                    onClick={() => handleQuantityChange('dec')}
                    className="w-12 h-12 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-30"
                    disabled={quantity <= 1}
                  >
                    <HiOutlineMinus size={16} />
                  </button>
                  <span className="w-12 text-center font-black text-slate-900 tabular-nums">
                    {quantity.toString().padStart(2, '0')}
                  </span>
                  <button 
                    onClick={() => handleQuantityChange('inc')}
                    className="w-12 h-12 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    <HiOutlinePlus size={16} />
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full h-20 rounded-[2rem] bg-emerald-500 text-slate-950 font-black uppercase italic tracking-tighter text-xl hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-4 group transition-all duration-500"
              >
                Deploy to Loadout <HiOutlineShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                 <button 
                  onClick={handleWishlistToggle}
                  className={`h-16 rounded-2xl border border-slate-200 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-premium ${
                    isInWishlist 
                      ? "bg-rose-50 text-rose-600 border-rose-100" 
                      : "text-slate-900 hover:bg-slate-50"
                  }`}
                 >
                   {isInWishlist ? "Archived" : "Archive"} 
                   {isInWishlist ? <HiHeart size={20} className="text-rose-600" /> : <HiOutlineHeart size={20} />}
                 </button>
                 <button 
                   onClick={handleShare}
                   className="h-16 rounded-2xl border border-slate-200 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-premium"
                 >
                   Comms Share <HiOutlineShare size={18} />
                 </button>
              </div>
            </div>

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

        {relatedProducts.length > 0 && (
          <div className="mt-24 md:mt-40">
            <div className="flex items-end justify-between mb-12 border-b border-slate-200 pb-8">
               <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Cross-Reference Intel</span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tighter">Related Archive Subjects</h2>
               </div>
               <Link to="/shop" className="hidden md:flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-premium">
                  View Full Archive <HiOutlineArrowRight size={16} />
               </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
               {relatedProducts.map(item => (
                 <Link 
                   key={item.id} 
                   to={`/product/${item.slug || item.id}`}
                   className="group space-y-6"
                 >
                   <div className="aspect-[4/5] bg-slate-50 rounded-[2rem] p-8 border border-slate-100 flex items-center justify-center overflow-hidden transition-premium group-hover:border-emerald-100 group-hover:shadow-2xl group-hover:shadow-emerald-500/5">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                      />
                   </div>
                   <div className="space-y-3 px-2">
                     <div className="flex items-center gap-3">
                       <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{item.category}</span>
                       <div className="h-1 w-1 rounded-full bg-slate-200" />
                       <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">Verified</span>
                     </div>
                     <h3 className="font-black text-slate-950 uppercase italic tracking-tighter text-lg leading-tight line-clamp-2">
                       {item.title}
                     </h3>
                     <p className="font-black text-slate-400 tabular-nums">PKR {item.price?.toLocaleString()}</p>
                   </div>
                 </Link>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;