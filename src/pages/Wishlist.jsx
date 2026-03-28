import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import {
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineTrash,
  HiOutlineArrowRight,
  HiOutlineSparkles
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { addItem } from '../features/cart/cartSlice';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { useSEO } from '../hooks/useSEO';

const Wishlist = () => {
  useSEO({
    title: 'My Wishlist - VANGUARD',
    description: 'View your saved wishlist of premium tactical gear and equipment from VANGUARD.',
    keywords: 'wishlist, saved items, favorites, tactical gear',
    canonical: 'https://vanguard.store/wishlist',
  });
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const handleMoveToCart = (product) => {
    dispatch(addItem(product));
    dispatch(removeFromWishlist(product.id));
  };

  return (
    <div className="min-h-screen bg-white pt-40 pb-20 px-6 sm:px-8 relative overflow-hidden italic">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-emerald-500/[0.03] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center space-y-6"
        >
          <div className="inline-flex items-center justify-center gap-3 px-6 py-2 bg-slate-950 text-white rounded-full">
            <HiOutlineSparkles size={14} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Tactical Archives</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-8xl font-black text-slate-950 tracking-tighter uppercase leading-[0.8] italic">
              User <span className="text-emerald-500">Curation.</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.4em] max-w-md mx-auto leading-relaxed">
              PRE-SELECTED ASSETS PENDING DEPLOYMENT AUTHORIZATION.
            </p>
          </div>
        </motion.div>

        {wishlistItems && wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            <AnimatePresence mode="popLayout">
              {wishlistItems.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col h-full bg-slate-50 border border-slate-100 rounded-[3.5rem] p-4 transition-premium hover:shadow-2xl hover:shadow-slate-200"
                >
                  <div className="aspect-[4/5] overflow-hidden relative rounded-[2.5rem] bg-white group-hover:shadow-xl transition-premium">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-premium">
                      <button
                        onClick={() => dispatch(removeFromWishlist(product.id))}
                        className="w-12 h-12 bg-white text-rose-500 rounded-2xl flex items-center justify-center shadow-xl hover:bg-rose-500 hover:text-white transition-premium active:scale-95"
                      >
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>

                    <div className="absolute bottom-6 left-6">
                      <span className="px-4 py-1.5 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-between space-y-6">
                    <div>
                      <h3 className="text-xl font-black text-slate-950 tracking-tight uppercase leading-tight italic line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-2xl font-black text-emerald-500 italic tracking-tighter mt-4">
                        ${product.price}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleMoveToCart(product)}
                      className="w-full h-16 rounded-2xl bg-white text-slate-950 border-2 border-slate-100 hover:bg-slate-950 hover:text-white hover:border-slate-950 shadow-sm group/btn"
                    >
                      MOVE TO BAG <HiOutlineArrowRight className="ml-3 group-hover/btn:translate-x-2 transition-premium" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 flex flex-col items-center text-center space-y-8"
          >
            <div className="w-40 h-40 bg-slate-50 rounded-[4rem] flex items-center justify-center text-slate-200 relative">
              <HiOutlineHeart size={80} strokeWidth={1} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-dashed border-slate-100 rounded-full animate-[spin_20s_linear_infinite]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Curation Offline.</h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.5em]">LOCKED_ARCHIVE_EMPTY</p>
            </div>
            <Link to="/shop">
              <Button variant="primary" className="h-16 px-12 rounded-2xl bg-slate-950 text-white hover:bg-emerald-500 hover:text-slate-950">
                INITIATE SCAN <HiOutlineShoppingBag className="ml-3" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;