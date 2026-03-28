import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineCheckCircle } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const Returns = () => {
  useSEO({
    title: 'Return Standard - VANGUARD',
    description: 'VANGUARD Return Standard - Easy, hassle-free returns and exchanges for all tactical gear.',
    keywords: 'returns, refunds, exchanges, return policy',
    canonical: 'https://vanguard.store/returns',
  });

  const [activeTab, setActiveTab] = useState('policy');

  const returnSteps = [
    {
      step: '01',
      title: 'Initiate Return',
      description: 'Contact our support team or initiate a return through your account dashboard within 30 days of purchase.',
    },
    {
      step: '02',
      title: 'Receive Label',
      description: 'We provide a prepaid return shipping label. Pack your item securely in its original condition.',
    },
    {
      step: '03',
      title: 'Ship Back',
      description: 'Use the provided label to ship the item back to us. Track your package for peace of mind.',
    },
    {
      step: '04',
      title: 'Refund Issued',
      description: 'Once received and inspected, your refund is processed within 5-7 business days.',
    },
  ];

  const conditions = [
    'Items must be unworn and in original condition',
    'All tags and packaging must be intact',
    'Return initiated within 30 days of purchase',
    'Item must not show signs of use or wear',
    'Original receipt or order confirmation required',
  ];

  const exclusions = [
    'Custom or made-to-order items',
    'Items purchased on final sale or clearance',
    'Damaged items due to customer negligence',
    'Items returned without original packaging',
    'Used tactical gear or equipment',
  ];

  return (
    <div className="min-h-screen bg-white pt-40 pb-20 px-6 sm:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-emerald-500/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <HiOutlineArrowLeft size={32} className="text-emerald-500 rotate-180" />
          </div>
          <div className="space-y-3">
            <h1 className="text-6xl md:text-7xl font-black text-slate-950 uppercase italic tracking-tighter">
              Return <span className="text-emerald-500">Standard</span>
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Simple, transparent return and exchange policy. Your satisfaction is guaranteed.
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
              Last Updated: March 2026
            </p>
          </div>
        </motion.div>

        <div className="flex gap-4 mb-12 border-b border-slate-200">
          {[
            { id: 'policy', label: 'Return Policy' },
            { id: 'process', label: 'Return Process' },
            { id: 'conditions', label: 'Conditions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-black text-[10px] uppercase tracking-widest transition-all duration-300 border-b-2 ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-500'
                  : 'border-transparent text-slate-500 hover:text-slate-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'policy' && (
            <div className="space-y-8">
              <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                <h2 className="text-2xl font-black text-slate-950 uppercase italic mb-4 tracking-tight">
                  30-Day Return Guarantee
                </h2>
                <p className="text-slate-700 leading-relaxed font-medium">
                  At VANGUARD, we stand behind every product. If you're not completely satisfied with your purchase, we offer hassle-free returns within 30 days of delivery. Whether you need an exchange, refund, or just want to ship back an item, we've got you covered.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 bg-emerge-50 rounded-2xl border border-emerald-200">
                  <h3 className="text-lg font-black text-slate-950 uppercase italic mb-3 tracking-tight">
                    ✓ Full Refund
                  </h3>
                  <p className="text-slate-700 font-medium">
                    Get a full refund to your original payment method within 7 business days of return inspection.
                  </p>
                </div>
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <h3 className="text-lg font-black text-slate-950 uppercase italic mb-3 tracking-tight">
                    ✓ Free Exchanges
                  </h3>
                  <p className="text-slate-700 font-medium">
                    Exchange for a different size, color, or item at no additional cost. We cover return shipping.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {returnSteps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 bg-slate-50 rounded-2xl border border-slate-200 relative"
                  >
                    <div className="absolute -top-6 -left-6 w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black text-lg">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-black text-slate-950 uppercase italic mb-3 tracking-tight mt-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-700 font-medium">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'conditions' && (
            <div className="space-y-8">
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200">
                <h2 className="text-2xl font-black text-slate-950 uppercase italic mb-6 tracking-tight">
                  Return Conditions
                </h2>
                <ul className="space-y-3">
                  {conditions.map((condition, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <HiOutlineCheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
                      <span className="text-slate-700 font-medium">{condition}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                <h2 className="text-2xl font-black text-slate-950 uppercase italic mb-6 tracking-tight">
                  Non-Returnable Items
                </h2>
                <ul className="space-y-3">
                  {exclusions.map((exclusion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex-shrink-0 mt-1" />
                      <span className="text-slate-700 font-medium">{exclusion}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 bg-slate-950 rounded-2xl border border-slate-800 text-white"
        >
          <h3 className="text-xl font-black uppercase italic mb-3 tracking-tight">Need Return Support?</h3>
          <p className="text-white/70 mb-6">
            Our expert support team is standing by to help with any return, exchange, or refund questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:returns@vanguard.store"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all duration-300"
            >
              Contact Support Team
            </a>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-emerald-500 text-emerald-500 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-500/10 transition-all duration-300"
            >
              Browse Tactical Gear
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Returns;
