import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HiOutlineTrash, HiOutlineShoppingBag, HiOutlineArrowLeft, 
  HiOutlineShieldCheck, HiOutlineTruck, HiOutlineMinus, HiOutlinePlus 
} from 'react-icons/hi';
import Button from '../../../components/ui/Button';
import PriceTag from '../../../components/ui/PriceTag';
import EmptyState from '../../../components/ui/EmptyState';
import { products } from '../../../data/products';

const Cart = () => {
  // Temporary state for UI demonstration
  const [cartItems, setCartItems] = useState([
     { ...products[0], quantity: 1 },
     { ...products[2], quantity: 2 },
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-16 bg-slate-950 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Left: Cart Items */}
        <div className="flex-1 space-y-12">
           <div className="flex items-end justify-between border-b border-white/10 pb-12">
              <h1 className="text-5xl font-black text-white tracking-tighter leading-none uppercase">Your Bag.</h1>
              <p className="text-white/40 font-bold text-sm tracking-widest uppercase">{cartItems.length} Items</p>
           </div>

           <AnimatePresence mode="popLayout">
              {cartItems.length > 0 ? (
                 <div className="space-y-10">
                    {cartItems.map((item) => (
                       <motion.div 
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex flex-col sm:flex-row items-center gap-10 group"
                       >
                          <div className="w-full sm:w-48 aspect-square rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                             <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.name} />
                          </div>
                          
                          <div className="flex-1 w-full space-y-6">
                             <div className="flex items-start justify-between gap-4">
                                <div>
                                   <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{item.category}</p>
                                   <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">{item.name}</h3>
                                   <p className="text-white/40 font-bold text-sm mt-1 uppercase tracking-widest">In Stock  Stockholm</p>
                                </div>
                                <button 
                                   onClick={() => removeItem(item.id)}
                                   className="p-3 bg-white/5 rounded-2xl text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 border border-white/10"
                                >
                                   <HiOutlineTrash size={20} />
                                </button>
                             </div>

                             <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div className="inline-flex items-center bg-white/5 rounded-2xl p-1.5 border border-white/10">
                                   <button 
                                      onClick={() => updateQuantity(item.id, -1)}
                                      className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-emerald-500 hover:bg-white/10 rounded-xl transition-all"
                                   >
                                      <HiOutlineMinus size={16} />
                                   </button>
                                   <span className="w-12 text-center font-black text-lg text-white">{item.quantity}</span>
                                   <button 
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-emerald-500 hover:bg-white/10 rounded-xl transition-all"
                                   >
                                      <HiOutlinePlus size={16} />
                                   </button>
                                </div>
                                <PriceTag amount={item.price * item.quantity} size="lg" className="font-black text-white" />
                             </div>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              ) : (
                 <EmptyState 
                    title="Your bag is empty" 
                    subtitle="Explore our new arrivals and find something extraordinary."
                    actionText="Continue Shopping"
                    onAction={() => window.location.href = '/shop'}
                 />
              )}
           </AnimatePresence>

           {cartItems.length > 0 && (
              <Link to="/shop" className="inline-flex items-center gap-2 text-white/40 hover:text-emerald-500 font-black text-xs uppercase tracking-widest transition-colors group py-8 border-t border-white/10">
                 <HiOutlineArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                 Back to Collection
              </Link>
           )}
        </div>

        {/* Right: Summary Card */}
        {cartItems.length > 0 && (
           <aside className="lg:w-[450px]">
              <div className="bg-slate-950 rounded-[3rem] p-10 sm:p-12 text-white sticky top-32 shadow-2xl shadow-slate-900/40 overflow-hidden">
                 <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                 
                 <h2 className="text-3xl font-black tracking-tighter uppercase mb-12 relative z-10">Order Summary.</h2>
                 
                 <div className="space-y-8 relative z-10">
                    <div className="flex justify-between items-center text-white/40 font-bold uppercase tracking-widest text-xs">
                       <span>Subtotal</span>
                       <span className="text-white text-lg">{subtotal.toFixed(2)} DH</span>
                    </div>
                    <div className="flex justify-between items-center text-white/40 font-bold uppercase tracking-widest text-xs">
                       <span>Shipping Est.</span>
                       <span className="text-white text-lg">{shipping === 0 ? "FREE" : `${shipping.toFixed(2)} DH`}</span>
                    </div>
                    <div className="flex justify-between items-center text-white/40 font-bold uppercase tracking-widest text-xs">
                       <span>Tax (8%)</span>
                       <span className="text-white text-lg">{tax.toFixed(2)} DH</span>
                    </div>
                    
                    <div className="h-px bg-white/10 my-10" />
                    
                    <div className="flex justify-between items-end">
                       <span className="text-white/40 font-black uppercase text-xs tracking-widest pb-1">Total Due</span>
                       <span className="text-4xl font-black text-emerald-400 tracking-tighter leading-none">{total.toFixed(2)} DH</span>
                    </div>

                    <div className="pt-10 space-y-4">
                       <Link to="/checkout" className="block w-full">
                          <Button variant="primary" size="xl" className="w-full h-20 rounded-2xl text-xl font-black bg-emerald-500 hover:bg-emerald-400 shadow-xl shadow-emerald-500/20">
                             Secure Checkout
                          </Button>
                       </Link>
                       <div className="flex items-center justify-center gap-8 py-6 opacity-30">
                          <HiOutlineShieldCheck size={24} />
                          <HiOutlineTruck size={24} />
                       </div>
                    </div>
                 </div>
              </div>
           </aside>
        )}
      </div>
    </div>
  );
};

export default Cart;
