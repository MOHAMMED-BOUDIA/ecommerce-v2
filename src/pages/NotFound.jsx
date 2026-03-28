import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowSmallLeft, HiOutlineShieldExclamation, HiOutlineCommandLine } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import { useSEO } from '../hooks/useSEO';

const NotFound = () => {
  useSEO({
    title: '404 - Page Not Found - VANGUARD',
    description: 'The page you are looking for does not exist. Return to VANGUARD homepage.',
    keywords: '404, not found, error page',
    canonical: 'https://vanguard.store/404',
    status: 404,
  });
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden italic text-slate-950">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      
      <div className="relative z-10 text-center max-w-2xl space-y-12">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="space-y-6"
        >
          <div className="w-24 h-24 bg-rose-500 rounded-[2rem] mx-auto flex items-center justify-center text-slate-950 shadow-2xl shadow-rose-500/20 rotate-45 group hover:rotate-90 transition-premium">
            <HiOutlineShieldExclamation size={48} className="-rotate-45 group-hover:-rotate-90 transition-premium" />
          </div>
          <div className="space-y-2">
            <span className="text-rose-600 text-[10px] font-black uppercase tracking-[0.5em]">System Constraint Error</span>
            <h1 className="text-9xl font-black text-slate-950 tracking-tighter uppercase leading-[0.7]">
              404.
            </h1>
          </div>
        </motion.div>

        <div className="space-y-6">
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            Vector <span className="text-rose-600">Untraceable.</span>
          </h2>
          <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
            THE REQUESTED COORDINATES DO NOT EXIST WITHIN THE VANGUARD ARCHIVE DIRECTORY.
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 font-mono text-left space-y-2 relative group overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <HiOutlineCommandLine size={40} />
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Diagnostic Console</p>
           </div>
           <p className="text-[10px] text-slate-600 uppercase tracking-tight font-black leading-relaxed">
             &gt; status: null_pointer_exception<br />
             &gt; location: unknown_realm<br />
             &gt; action: return_to_base_station
           </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/">
            <Button className="h-16 px-10 rounded-2xl bg-slate-950 text-white hover:bg-emerald-500 hover:text-slate-950 shadow-xl flex items-center gap-3">
              <HiOutlineArrowSmallLeft size={20} />
              REDEPLOY CORE
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary" className="h-16 px-10 rounded-2xl border-2 border-slate-100 hover:border-slate-950">
              BROWSE ARCHIVES
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Large Decorative 404 in BG */}
      <h1 className="absolute -bottom-20 -left-20 text-[30rem] font-black text-slate-50/50 leading-none select-none -z-0 pointer-events-none">404</h1>
    </div>
  );
};

export default NotFound;