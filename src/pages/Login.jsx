import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineLockClosed } from "react-icons/hi2";
import Button from "../components/ui/Button";

const Login = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-6 lg:px-8 pt-40 pb-20 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-slate-950 rounded-[2rem] mx-auto flex items-center justify-center text-emerald-500 shadow-2xl shadow-emerald-500/10 border border-white/5">
             <HiOutlineLockClosed size={32} />
          </div>
          <div className="space-y-2">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em]">Secure Gateway</span>
            <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Portal <span className="text-emerald-600">Access.</span>
            </h2>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-12"
        >
          <div className="bg-slate-50 py-12 px-10 rounded-[3rem] border border-slate-100 shadow-premium">
            <form className="space-y-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                  Registry Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="IDENTIFIER@NETWORK.IO"
                  className="block w-full px-8 py-5 bg-white border border-slate-200 focus:border-emerald-500 rounded-3xl transition-premium outline-none text-xs font-black uppercase tracking-widest placeholder:text-slate-200"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between ml-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Access Key
                  </label>
                  <Link to="/forgot-password" size="sm" className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-slate-950 transition-premium">
                    Lost Key?
                  </Link>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="block w-full px-8 py-5 bg-white border border-slate-200 focus:border-emerald-500 rounded-3xl transition-premium outline-none text-xs font-black uppercase tracking-widest placeholder:text-slate-200"
                />
              </div>

              <div className="flex items-center ml-4">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-emerald-500 focus:ring-emerald-500 border-slate-300 rounded-lg cursor-pointer transition-premium bg-white"
                />
                <label htmlFor="remember-me" className="ml-4 block text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:text-slate-900 transition-premium">
                  Persistent Link
                </label>
              </div>

              <Button type="submit" className="w-full h-20 rounded-[1.5rem] bg-slate-950 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950">
                Grant Access <HiOutlineArrowRight className="ml-3" />
              </Button>
            </form>

            <div className="mt-12 text-center space-y-6">
               <div className="relative">
                 <div className="absolute inset-0 flex items-center">
                   <div className="w-full border-t border-slate-200" />
                 </div>
                 <div className="relative flex justify-center text-xs uppercase">
                   <span className="px-6 bg-slate-50 text-slate-300 font-black tracking-[0.3em] text-[8px]">External Sync</span>
                 </div>
               </div>

               <button className="w-full py-5 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-4 hover:bg-emerald-50 transition-premium group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-premium">Sync with Cloud ID</span>
               </button>
            </div>
          </div>

          <p className="mt-10 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Unregistered Identity?{' '}
            <Link to="/register" className="text-emerald-500 hover:text-slate-950 transition-premium underline underline-offset-8 decoration-2 text-decoration-emerald-500">
              Apply for Membership
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-10 hidden lg:flex items-center gap-4 text-slate-300">
         <HiOutlineShieldCheck size={20} className="text-emerald-500" />
         <span className="text-[9px] font-black uppercase tracking-[0.4em]">AES-256 Encrypted Tunnel Active</span>
      </div>
    </div>
  );
};

export default Login;