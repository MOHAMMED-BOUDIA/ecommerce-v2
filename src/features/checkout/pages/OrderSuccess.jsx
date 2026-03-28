import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineCheckCircle, HiOutlineArrowRight } from 'react-icons/hi2';
import Button from '../../../components/ui/Button';
import { useSEO } from '../../../hooks/useSEO';

const OrderSuccess = () => {
  useSEO({
    title: 'Order Confirmed - VANGUARD',
    description: 'Your order has been successfully placed. Thank you for shopping at VANGUARD premium tactical gear store.',
    keywords: 'order success, confirmation, thank you, order placed',
    canonical: 'https://vanguard.store/order-success',
  });

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-40 pb-20 relative overflow-hidden italic text-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      
      <div className="relative z-10 text-center max-w-2xl space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="w-24 h-24 bg-emerald-500 rounded-[2rem] mx-auto flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20">
            <HiOutlineCheckCircle size={48} />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase">
              Order <span className="text-emerald-500">Confirmed</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Thank you for your purchase at VANGUARD. Your premium tactical gear will arrive shortly.
            </p>
          </div>

          <div className="space-y-3 text-left bg-slate-50 p-6 rounded-[2rem] border border-slate-200">
            <h3 className="font-black text-slate-900 uppercase text-sm">Order Details</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>✓ Order placed successfully</p>
              <p>✓ Confirmation email sent</p>
              <p>✓ Tracking information available</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link to="/shop" className="flex-1">
              <Button 
                variant="secondary"
                className="w-full"
              >
                <span>Continue Shopping</span>
                <HiOutlineArrowRight />
              </Button>
            </Link>
            <Link to="/profile" className="flex-1">
              <Button className="w-full">
                <span>View Orders</span>
                <HiOutlineArrowRight />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
