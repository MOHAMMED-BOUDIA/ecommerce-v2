import React from "react";
import { Link } from "react-router-dom";import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineArrowRight,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineTruck
} from "react-icons/hi2";
import { 
  FaInstagram, 
  FaTwitter, 
  FaDiscord, 
  FaGithub 
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Global Archive", path: "/shop" },
      { name: "New Deployments", path: "/shop?sort=newest" },
      { name: "Tactical Loadout", path: "/shop?category=electronics" },
      { name: "Apparel Protocol", path: "/shop?category=clothing" },
    ],
    intel: [
      { name: "Mission Log", path: "/about" },
      { name: "Recruitment", path: "/careers" },
      { name: "Maintenance", path: "/support" },
      { name: "The Lab", path: "/lab" },
    ],
    deployment: [
      { name: "Transit Policy", path: "/shipping" },
      { name: "Return Protocol", path: "/returns" },
      { name: "Secure Gateway", path: "/security" },
      { name: "Terms of Engagement", path: "/terms" },
    ]
  };

  return (
    <footer className="bg-slate-950 text-white pt-32 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 group-hover:rotate-12 transition-premium shadow-lg shadow-emerald-500/30">
                <HiOutlineGlobeAlt size={28} />
              </div>
              <span className="text-3xl font-black uppercase italic tracking-tighter">
                Vanguard<span className="text-emerald-500">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-loose max-w-sm italic">
              Pioneering the intersection of high-performance technical gear and urban aesthetic. Every deployment is a statement of intent.
            </p>
            <div className="flex items-center gap-4">
              {[FaInstagram, FaTwitter, FaDiscord, FaGithub].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-slate-950 transition-premium">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-10">Archive</h4>
              <ul className="space-y-6">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-10">Intel</h4>
              <ul className="space-y-6">
                {footerLinks.intel.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-10">Protocol</h4>
              <ul className="space-y-6">
                {footerLinks.deployment.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comms Link */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Comms Link</h4>
            <div className="space-y-6">
              <p className="text-slate-400 text-xs font-medium italic">Join the encrypted frequency for priority deployment updates.</p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="ID@NETWORK.IO" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all font-black"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-emerald-500 text-slate-950 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors">
                  Sync
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Credentials */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 text-slate-500 text-[9px] font-black uppercase tracking-widest">
              <HiOutlineShieldCheck size={16} className="text-emerald-500" /> AES-256 Encrypted
            </div>
            <div className="flex items-center gap-3 text-slate-500 text-[9px] font-black uppercase tracking-widest">
              <HiOutlineTruck size={16} className="text-emerald-500" /> Global Logistics
            </div>
          </div>
          
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.4em]">
            &copy; {currentYear} Vanguard Research Laboratory. All Rights Reserved.
          </p>
          <div className="flex items-center gap-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">HELP@KIRASTORE.COM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
