import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  HiOutlineShieldCheck, 
  HiOutlineCreditCard, 
  HiOutlineMapPin, 
  HiOutlineTruck,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineLockClosed,
  HiOutlineCpuChip
} from 'react-icons/hi2';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';
import { useSEO } from '../../../hooks/useSEO';

const Checkout = () => {
  useSEO({
    title: 'Secure Checkout - VANGUARD',
    description: 'Complete your purchase with our secure checkout process. VANGUARD premium tactical gear delivery.',
    keywords: 'checkout, payment, secure, purchase, order',
    canonical: 'https://vanguard.store/checkout',
  });
  const { items } = useSelector((state) => state.cart);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 3000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20 px-6 text-center italic">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-12 max-w-lg"
        >
          <div className="w-32 h-32 bg-emerald-500 text-slate-950 rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20 rotate-12">
            <HiOutlineCheckCircle size={64} />
          </div>
          <div className="space-y-4">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em]">Transmission Successful</span>
            <h1 className="text-6xl font-black text-slate-950 tracking-tighter uppercase leading-none">
              Deployment <span className="text-emerald-500">Confirmed.</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest leading-relaxed">
              Your assets have been allocated and are pending immediate dispatch to the designated drop zone.
            </p>
          </div>
          <Link to="/shop">
            <Button className="h-20 px-12 rounded-[2rem] bg-slate-950 text-white hover:bg-emerald-500 hover:text-slate-950 shadow-xl">
              RETURN TO COMMAND <HiOutlineArrowRight className="ml-3" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-20 px-6 sm:px-8 italic text-slate-950">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em]">Transaction Protocol</span>
            <h1 className="text-8xl font-black text-slate-950 uppercase tracking-tighter leading-[0.8]">
              Final <span className="text-emerald-500">Authorization.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 px-8 py-4 rounded-3xl border border-slate-100">
            <HiOutlineLockClosed size={24} className="text-emerald-500" />
            <div className="text-left">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Security Layer</p>
              <p className="text-[12px] font-black text-slate-950 uppercase">AES-256 ENCRYPTED</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 space-y-12">
            {/* Step Indicators */}
            <div className="flex items-center gap-8 mb-16">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${step >= s ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-300'}`}>
                    {s}
                  </div>
                  <div className={`h-[2px] w-12 rounded-full ${step > s ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <div className="space-y-8">
                    <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                      <HiOutlineMapPin className="text-emerald-500" /> Drop Zone Coordinates
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Identity</label>
                        <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-16 px-6 focus:border-emerald-500 outline-none transition-premium font-black uppercase text-[10px] tracking-widest" placeholder="ALEX KIRA" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Comms Link</label>
                        <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-16 px-6 focus:border-emerald-500 outline-none transition-premium font-black uppercase text-[10px] tracking-widest" placeholder="ID@STORAGE.IO" />
                      </div>
                      <div className="md:col-span-2 space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Sector Address</label>
                        <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-16 px-6 focus:border-emerald-500 outline-none transition-premium font-black uppercase text-[10px] tracking-widest" placeholder="NEON DISTRICT, BLOCK 42" />
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => setStep(2)} className="h-20 px-12 rounded-[2rem] bg-slate-950 text-white hover:bg-emerald-500 hover:text-slate-950 shadow-xl">
                    PROCEED TO GATEWAY <HiOutlineArrowRight className="ml-3" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <div className="space-y-8">
                    <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                      <HiOutlineCreditCard className="text-emerald-500" /> Financial Clearance
                    </h3>
                    <div className="bg-slate-950 text-white p-10 rounded-[3rem] space-y-12 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="flex justify-between items-start">
                         <HiOutlineCpuChip size={48} className="text-emerald-500" />
                         <span className="text-[10px] font-black tracking-[0.3em] opacity-50 uppercase">Vanguard Titanium Card</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[9px] font-black tracking-widest opacity-40 uppercase">Card Identifier</p>
                        <input className="bg-transparent border-none text-3xl font-black w-full outline-none uppercase tracking-tighter" placeholder="XXXX XXXX XXXX XXXX" />
                      </div>
                      <div className="flex gap-10">
                        <div className="flex-1 space-y-2">
                           <p className="text-[9px] font-black tracking-widest opacity-40 uppercase">Expiration</p>
                           <input className="bg-transparent border-none text-xl font-black w-full outline-none uppercase" placeholder="MM/YY" />
                        </div>
                        <div className="w-32 space-y-2">
                           <p className="text-[9px] font-black tracking-widest opacity-40 uppercase">Auth Code</p>
                           <input className="bg-transparent border-none text-xl font-black w-full outline-none uppercase" placeholder="CVC" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={() => setStep(1)} variant="secondary" className="h-20 px-10 rounded-[2rem] border-2 border-slate-100 hover:border-slate-950">BACK</Button>
                    <Button onClick={handleProcess} className="flex-1 h-20 rounded-[2rem] bg-slate-950 text-white hover:bg-emerald-500 hover:text-slate-950 shadow-xl overflow-hidden relative group">
                      <AnimatePresence mode="wait">
                        {isProcessing ? (
                          <motion.div 
                            key="loading"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-4"
                          >
                             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             SYNCING DATA...
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="idle"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-4"
                          >
                            AUTHORIZE TRANSACTION <HiOutlineShieldCheck size={24} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-40 bg-slate-50 rounded-[3rem] p-10 border border-slate-100 space-y-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Allocation Manifest</h4>
              
              <div className="max-h-[300px] overflow-y-auto pr-4 space-y-6 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="w-20 h-20 bg-white rounded-2xl p-4 border border-slate-100 flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[12px] font-black uppercase tracking-tight text-slate-950 truncate italic leading-none">{item.title}</h5>
                      <p className="text-[10px] font-black text-slate-400 mt-2 italic">QTY: {item.quantity} × ${item.price}</p>
                    </div>
                    <span className="text-sm font-black text-slate-950 italic">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="h-[1px] bg-slate-200 w-full" />

              <div className="space-y-6">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-widest">Base Subtotal</span>
                  <span className="text-lg font-black italic text-slate-950">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-widest">Logistic Fee</span>
                  <span className="text-lg font-black italic text-slate-950">{shipping === 0 ? "EXEMPT" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Grand Total</span>
                    <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Taxes Included in Calculation</p>
                  </div>
                  <span className="text-5xl font-black italic text-slate-950 tracking-tighter leading-[0.8]">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50 flex items-center gap-4">
                <HiOutlineTruck size={24} className="text-emerald-500" />
                <p className="text-[9px] font-black uppercase tracking-widest text-emerald-800 leading-relaxed">
                  Priority deployment active. Dispatch estimated within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;