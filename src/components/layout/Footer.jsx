import React from "react";
import { Link } from "react-router-dom";
import { 
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineCreditCard,
  HiOutlineCubeTransparent
} from "react-icons/hi2";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Vanguard Hub",
      links: [
        { label: "Home Base", path: "/" },
        { label: "New Arrivals", path: "/new-arrivals" },
        { label: "Tactical Gears", path: "/tactical-gears" },
        
        { label: "The Lab", path: "/the-lab" },
      ],
    },
    {
      title: "Navigation",
      links: [
        
        { label: "Account Console", path: "/profile" },
        { label: "Wishlist Vault", path: "/wishlist" },
        { label: "Authentication", path: "/login" },
      ],
    },
    {
      title: "Protocols",
      links: [
        { label: "Privacy Crypt", path: "/privacy" },
        { label: "Cookie Policy", path: "/cookies" },
        { label: "Return Standard", path: "/returns" },
      ],
    },
  ];

  return (
    <footer className="bg-black border-t border-white/5 pt-12 md:pt-20 pb-6 md:pb-8 relative overflow-hidden font-sans">
      {/* Refined Ambience */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[150px] bg-gradient-to-t from-emerald-500/[0.03] to-transparent pointer-events-none" />
      
      <div className="container-custom max-w-7xl relative z-10 px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-10 mb-8 md:mb-10">
          
          {/* Brand and News Section */}
          <div className="max-w-xs space-y-4 md:space-y-6">
            <Link to="/" className="flex items-center gap-3 md:gap-4 group w-fit" aria-label="Vanguard Home">
              <div className="relative w-9 md:w-11 h-9 md:h-11 flex-shrink-0">
                <div className="w-full h-full rounded-lg md:rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                  <HiOutlineCubeTransparent size={18} strokeWidth={2} className="relative z-10 md:w-[26px] md:h-[26px]" aria-hidden="true" />
                </div>
                <div className="absolute -inset-1 bg-emerald-500/20 blur-md rounded-lg md:rounded-xl group-hover:bg-emerald-500/40 transition-all duration-500" />
              </div>
              <span className="text-base md:text-2xl font-black text-white uppercase italic tracking-[-0.05em] leading-none hidden sm:flex items-center min-w-fit md:min-w-[120px]">
                VANGUARD<span className="text-emerald-500 ml-0.5 animate-pulse text-lg md:text-3xl">.</span>
              </span>
            </Link>
            
            <p className="text-white/30 text-[9px] md:text-[11px] leading-relaxed uppercase tracking-widest pl-1">
              High-performance gear engineered for the modern operative.
            </p>

            <div className="relative group max-w-[240px]">
              <input 
                type="email" 
                placeholder="DEPLOY@VANGUARD.IO" 
                className="w-full bg-white/[0.02] border-b border-white/10 py-2 pr-8 md:pr-10 text-[8px] md:text-[10px] text-white placeholder:text-white/10 focus:border-emerald-500/50 transition-all outline-none uppercase font-black tracking-widest"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 hover:text-emerald-500 transition-colors">
                <HiOutlineArrowRight size={12} className="md:w-[14px] md:h-[14px]" />
              </button>
            </div>
          </div>

          {/* Optimized Links Matrix */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 lg:ml-8 pt-0 md:pt-2">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-[7px] md:text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-3 md:mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2 md:space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        to={link.path} 
                        className="text-[9px] md:text-[11px] text-white/40 hover:text-emerald-500 transition-colors uppercase tracking-widest font-medium"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Streamlined Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 opacity-30 grayscale text-[7px] md:text-[8px]">
            <div className="flex items-center gap-1.5 md:gap-2 font-bold text-white uppercase tracking-widest">
              <HiOutlineShieldCheck size={10} className="md:w-[12px] md:h-[12px] flex-shrink-0" /> Encrypted
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 font-bold text-white uppercase tracking-widest">
              <HiOutlineGlobeAlt size={10} className="md:w-[12px] md:h-[12px] flex-shrink-0" /> Global
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 font-bold text-white uppercase tracking-widest">
              <HiOutlineCreditCard size={10} className="md:w-[12px] md:h-[12px] flex-shrink-0" /> DH Secure
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 w-full sm:w-auto">
            <div className="flex items-center gap-3 md:gap-4 text-white/10">
              <a href="#" className="hover:text-emerald-500 transition-all p-1"><FaFacebookF size={10} className="md:w-[12px] md:h-[12px]" /></a>
              <a href="#" className="hover:text-emerald-500 transition-all p-1"><FaTwitter size={10} className="md:w-[12px] md:h-[12px]" /></a>
              <a href="#" className="hover:text-emerald-500 transition-all p-1"><FaInstagram size={10} className="md:w-[12px] md:h-[12px]" /></a>
            </div>
            <p className="text-[7px] md:text-[8px] text-white/10 uppercase tracking-[0.3em] md:tracking-[0.4em] font-black italic whitespace-nowrap">
              &copy; {currentYear} Vanguard
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
