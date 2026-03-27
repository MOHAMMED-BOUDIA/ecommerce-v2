import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineUserCircle, 
  HiOutlineShoppingBag, 
  HiOutlineHeart, 
  HiOutlineMapPin, 
  HiOutlineArrowRightOnRectangle,
  HiOutlineChevronRight,
  HiOutlineCpuChip,
  HiOutlineShieldCheck
} from 'react-icons/hi2';
import Button from '../components/ui/Button';

const Profile = () => {
  const stats = [
    { label: 'Deployment History', value: '12', icon: HiOutlineShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Tactical Wishlist', value: '24', icon: HiOutlineHeart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { label: 'System Credits', value: '$450', icon: HiOutlineCpuChip, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  const menuItems = [
    { label: 'Order Archives', icon: HiOutlineShoppingBag, subtitle: 'RESTORE PREVIOUS DEPLOYMENTS' },
    { label: 'Drop Zones', icon: HiOutlineMapPin, subtitle: 'MANAGE SHIPPING COORDINATES' },
    { label: 'Wishlist Protocol', icon: HiOutlineHeart, subtitle: 'LOCKED TACTICAL ASSETS' },
    { label: 'Security Override', icon: HiOutlineShieldCheck, subtitle: 'UPDATE ACCESS CREDENTIALS' },
  ];

  return (
    <div className="min-h-screen bg-white pt-40 pb-20 px-6 sm:px-8 relative overflow-hidden text-slate-950 italic">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-12 mb-20 border-b border-slate-100 pb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="w-48 h-48 rounded-[3rem] bg-slate-100 p-2 rotate-3 hover:rotate-0 transition-premium shadow-2xl shadow-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-[2.5rem]"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-emerald-500 text-slate-950 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
              <HiOutlineShieldCheck size={24} />
            </div>
          </motion.div>

          <div className="flex-1 text-center lg:text-left space-y-6">
            <div>
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Verified Operative</span>
              <h1 className="text-7xl font-black text-slate-950 tracking-tighter uppercase leading-[0.8] mb-4">
                Alex <span className="text-emerald-500">Kira.</span>
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-full border border-slate-200">UID: VG-2024-0X99</span>
                <span className="text-slate-300 font-black italic tracking-widest text-[10px] uppercase">alex.kira@vanguard.io</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button className="h-14 px-8 rounded-2xl bg-slate-950 text-white hover:bg-emerald-500 hover:text-slate-950 text-[10px]">
                CONFIGURE CORE
              </Button>
              <Button variant="secondary" className="h-14 px-8 rounded-2xl border-2 border-slate-100 hover:border-rose-500 hover:bg-rose-50 text-rose-500 flex items-center gap-3 text-[10px]">
                <HiOutlineArrowRightOnRectangle size={18} />
                TERMINATE SESSION
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-50/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-slate-100 group transition-premium"
            >
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-premium`}>
                <stat.icon size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-950 tracking-tighter italic">{stat.value}</span>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">+12% UNIT</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-950 rounded-[3.5rem] p-4 lg:p-8 shadow-3xl shadow-slate-900/20 overflow-hidden relative">
          {/* Subtle glow effect */}
          <div className="absolute top-0 right-0 w-[500px] h-full bg-emerald-500/5 blur-[100px] -translate-y-1/2 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            {menuItems.map((item, index) => (
              <button 
                key={item.label}
                className="w-full p-8 flex items-center justify-between hover:bg-white/5 bg-white/[0.02] border border-white/5 rounded-[2.5rem] transition-premium group"
              >
                <div className="flex items-center gap-6 text-left">
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-premium">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-black text-white uppercase tracking-tighter mb-1 italic leading-none">{item.label}</h3>
                    <p className="text-[9px] text-slate-500 font-black tracking-[0.2em] uppercase leading-none">{item.subtitle}</p>
                  </div>
                </div>
                <HiOutlineChevronRight className="text-slate-700 group-hover:text-emerald-500 group-hover:translate-x-2 transition-premium" size={24} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;