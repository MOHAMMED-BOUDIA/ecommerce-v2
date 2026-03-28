import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { 
  HiOutlineTrash, 
  HiOutlinePlus, 
  HiOutlineMinus, 
  HiOutlineArrowRight,
  HiOutlineShoppingBag,
  HiOutlineShieldCheck
} from "react-icons/hi2";
import { removeItem, updateQuantity } from "../features/cart/cartSlice";
import Button from "../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useSEO } from "../hooks/useSEO";

const Cart = () => {
  useSEO({
    title: 'Shopping Cart - VANGUARD',
    description: 'Review and manage your shopping cart at VANGUARD. Proceed to checkout to complete your purchase of premium tactical gear.',
    keywords: 'shopping cart, checkout, purchase, tactical gear',
    canonical: 'https://vanguard.store/cart',
  });
  const { items } = useSelector((state) => state.cart || { items: [] });
  const dispatch = useDispatch();

  const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center container-custom">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-10"
        >
          <div className="w-32 h-32 rounded-[3rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto">
            <HiOutlineShoppingBag size={64} />
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-slate-950 uppercase italic tracking-tighter">Archive Empty.</h1>
            <p className="text-slate-400 font-medium italic">No tactical gear detected in your current loadout.</p>
          </div>
          <Button as={Link} to="/shop" variant="primary" className="rounded-full px-12 h-16 bg-slate-950 text-white">
            Return to Inventory
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 bg-white">
      <div className="container-custom">
        <header className="mb-20 space-y-4">
          <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em]">Logistics Protocol</span>
          <h1 className="text-8xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">
            Current <span className="text-emerald-600">Loadout.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row gap-10 pb-12 border-b border-slate-100 group"
                >
                  <div className="w-full sm:w-64 aspect-square bg-slate-50 rounded-[2.5rem] overflow-hidden p-10 border border-transparent group-hover:border-emerald-500/20 transition-premium flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"; }}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                           <span className="text-emerald-600 text-[9px] font-black uppercase tracking-widest">{item.category}</span>
                           <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{item.title}</h3>
                        </div>
                        <button 
                          onClick={() => dispatch(removeItem(item.id))}
                          className="w-12 h-12 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-premium"
                        >
                          <HiOutlineTrash size={20} />
                        </button>
                      </div>
                      <p className="text-2xl font-black text-slate-400 italic">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-10 mt-8">
                       <div className="flex items-center bg-slate-100 rounded-2xl p-2 h-16">
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                            className="w-12 h-full flex items-center justify-center text-slate-400 hover:text-slate-950"
                          >
                            <HiOutlineMinus size={16} /> 
                          </button>
                          <span className="w-12 text-center text-lg font-black text-slate-900">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="w-12 h-full flex items-center justify-center text-slate-400 hover:text-emerald-600"
                          >
                            <HiOutlinePlus size={16} />
                          </button>
                       </div>
                       <span className="text-xl font-black text-slate-900 italic tracking-tight">Total: ${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-4">
             <div className="sticky top-40 bg-slate-950 rounded-[3rem] p-10 text-white space-y-10 shadow-elite">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Deployment Summary</h4>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-[10px] font-black uppercase tracking-widest">Subtotal</span>
                    <span className="text-lg font-black italic text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-[10px] font-black uppercase tracking-widest">Global Transit</span>
                    <span className="text-lg font-black italic text-white">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="h-[1px] bg-white/10 w-full" />
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Order Total</span>
                    <span className="text-5xl font-black italic text-white tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button as={Link} to="/checkout" variant="primary" className="w-full rounded-[1.5rem] h-20 bg-emerald-500 text-slate-950 hover:bg-white flex items-center justify-center gap-3">
                    Confirm Deployment <HiOutlineArrowRight size={20} />
                  </Button>
                  <p className="text-[9px] text-center text-slate-500 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <HiOutlineShieldCheck size={14} className="text-emerald-500" /> Secure AES-256 Protocol
                  </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
