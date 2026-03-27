import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowRight, HiOutlineShieldCheck } from 'react-icons/hi';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
      <motion.div 
         initial={{ opacity: 0, scale: 0.98 }}
         animate={{ opacity: 1, scale: 1 }}
         className="max-w-[480px] w-full bg-white rounded-[3rem] p-10 sm:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center"
      >
         <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-10 shadow-lg shadow-emerald-500/20 transform -rotate-12">
            <HiOutlineShieldCheck size={32} />
         </div>

         <div className="space-y-6 mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">Account Access.</h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
               Authentication for authorized high-performance personnel only.
            </p>
         </div>

         <form className="w-full space-y-6">
            <Input 
               placeholder="Access Email" 
               icon={<HiOutlineMail />} 
               className="h-16 rounded-2xl px-8"
               value={formData.email}
               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input 
               type="password"
               placeholder="Access Token / Password" 
               icon={<HiOutlineLockClosed />} 
               className="h-16 rounded-2xl px-8"
               value={formData.password}
               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <div className="flex justify-end pt-2">
               <button type="button" className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-500 transition-colors">Forgot Access?</button>
            </div>

            <Button variant="primary" size="xl" className="w-full h-20 rounded-2xl text-xl font-black shadow-xl shadow-emerald-500/10" icon={<HiOutlineArrowRight />}>
               Initialize Access
            </Button>
         </form>

         <div className="mt-16 pt-10 border-t border-slate-100 w-full flex flex-col items-center gap-6">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">New Arrival?</p>
            <Link to="/register">
               <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 hover:border-slate-900 transition-colors">
                  Generate Member ID
               </Button>
            </Link>
         </div>
      </motion.div>
    </div>
  );
};

export default Login;
