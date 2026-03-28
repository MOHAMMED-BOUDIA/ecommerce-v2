import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineUserPlus, HiOutlineIdentification, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineArrowRight } from "react-icons/hi2";
import Button from "../components/ui/Button";
import { useSEO } from "../hooks/useSEO";

const Register = () => {
  useSEO({
    title: 'Create Account - VANGUARD',
    description: 'Register for a new VANGUARD account to access exclusive products, save your wishlist, and manage orders.',
    keywords: 'register, sign up, create account, membership',
    canonical: 'https://vanguard.store/register',
  });
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-6 lg:px-8 pt-40 pb-20 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-40 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full translate-x-1/2" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="w-20 h-20 bg-emerald-500 rounded-[2.5rem] mx-auto flex items-center justify-center text-slate-950 shadow-2xl shadow-emerald-500/20 rotate-3 group hover:rotate-12 transition-premium">
            <HiOutlineUserPlus size={32} />
          </div>
          <div className="space-y-2">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em]">Membership Protocol</span>
            <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Apply for <span className="text-emerald-600">Circle.</span>
            </h2>
          </div>
          <p className="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
            Already verified?{' '}
            <Link to="/login" className="text-emerald-500 hover:text-slate-950 transition-premium underline underline-offset-4">
              Return to Portal
            </Link>
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-12 sm:mx-auto sm:w-full sm:max-w-xl relative z-10"
      >
        <div className="bg-slate-50 py-12 px-10 shadow-premium rounded-[3rem] border border-slate-100">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Registry Name</label>
              <div className="relative group">
                <HiOutlineIdentification size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-emerald-500 transition-premium" />
                <input
                  type="text"
                  required
                  placeholder="IDENTITY_01"
                  className="block w-full pl-14 pr-8 py-5 bg-white border border-slate-200 focus:border-emerald-500 rounded-[1.5rem] transition-premium outline-none text-[10px] font-black uppercase tracking-widest"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Comms Identifier</label>
              <div className="relative group">
                <HiOutlineEnvelope size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-emerald-500 transition-premium" />
                <input
                  type="email"
                  required
                  placeholder="ID@STORAGE.IO"
                  className="block w-full pl-14 pr-8 py-5 bg-white border border-slate-200 focus:border-emerald-500 rounded-[1.5rem] transition-premium outline-none text-[10px] font-black uppercase tracking-widest"
                />
              </div>
            </div>

            <div className="space-y-4 md:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Access Key Generation</label>
              <div className="relative group">
                <HiOutlineLockClosed size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-emerald-500 transition-premium" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="block w-full pl-14 pr-8 py-5 bg-white border border-slate-200 focus:border-emerald-500 rounded-[1.5rem] transition-premium outline-none text-[10px] font-black uppercase tracking-widest"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex items-start px-4">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-5 w-5 mt-1 text-emerald-500 focus:ring-emerald-500 border-slate-300 rounded-lg cursor-pointer bg-white"
              />
              <label htmlFor="terms" className="ml-5 block text-[9px] font-black text-slate-400 uppercase tracking-widest cursor-pointer leading-loose">
                I acknowledge the <span className="text-slate-900 underline decoration-2 decoration-emerald-500/30 underline-offset-4">Terms of Engagement</span> and authorize biometric background synchronization.
              </label>
            </div>

            <div className="md:col-span-2 pt-4">
              <Button type="submit" className="w-full h-20 rounded-[2rem] bg-slate-950 text-white hover:bg-emerald-500 hover:text-slate-950 shadow-xl shadow-slate-950/20">
                Initiate Deployment <HiOutlineArrowRight className="ml-3" />
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;