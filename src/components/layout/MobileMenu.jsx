export { default } from "./Navbar";
import React from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineCreditCard,
  HiOutlineCubeTransparent
} from "react-icons/hi2";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Vanguard Hub",
      links: [
        { label: "Tactical Gears", path: "/shop" },
        { label: "New Arrivals", path: "/new-arrivals" },
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
    <footer className="bg-black border-t border-white/5 pt-12 pb-6 relative overflow-hidden font-sans">
      {/* Refined Ambience */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-emerald-500/[0.03] to-transparent pointer-events-none" />
      
      <div className="container-custom max-w-7xl relative z-10 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-10">
          
          {/* Brand and News Section */}
          <div className="max-w-xs space-y-6">
            <Link to="/" className="flex items-center gap-4 group w-fit" aria-label="Vanguard Home">
              <div className="relative w-11 h-11 shrink-0">
                <div className="w-11 h-11 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                  <HiOutlineCubeTransparent size={26} strokeWidth={2} className="relative z-10" aria-hidden="true" />
                </div>
                <div className="absolute -inset-1 bg-emerald-500/20 blur-md rounded-xl group-hover:bg-emerald-500/40 transition-all duration-500" />
              </div>
              <span className="text-2xl font-black text-white uppercase italic tracking-[-0.05em] leading-none flex items-center">
                VANGUARD<span className="text-emerald-500 ml-0.5 animate-pulse text-3xl">.</span>
              </span>
            </Link>
            
            <p className="text-white/30 text-[11px] leading-relaxed uppercase tracking-widest pl-1">
              High-performance gear engineered for the modern operative.
            </p>

            <div className="relative group max-w-[240px]">
              <input 
                type="email" 
                placeholder="DEPLOY@VANGUARD.IO" 
                className="w-full bg-white/[0.02] border-b border-white/10 py-2 pr-10 text-[10px] text-white placeholder:text-white/10 focus:border-emerald-500/50 transition-all outline-none uppercase font-black tracking-widest"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 hover:text-emerald-500 transition-colors">
                <HiOutlineArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Optimized Links Matrix */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 lg:ml-12 pt-2">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        to={link.path} 
                        className="text-[11px] text-white/40 hover:text-emerald-500 transition-colors uppercase tracking-widest font-medium"
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
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 opacity-30 grayscale">
            <div className="flex items-center gap-2 text-[8px] font-bold text-white uppercase tracking-widest">
              <HiOutlineShieldCheck size={12} /> Encrypted
            </div>
            <div className="flex items-center gap-2 text-[8px] font-bold text-white uppercase tracking-widest">
              <HiOutlineGlobeAlt size={12} /> Global
            </div>
            <div className="flex items-center gap-2 text-[8px] font-bold text-white uppercase tracking-widest">
              <HiOutlineCreditCard size={12} /> DH Secure
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-white/10">
              <a href="#" className="hover:text-emerald-500 transition-all"><FaFacebookF size={12} /></a>
              <a href="#" className="hover:text-emerald-500 transition-all"><FaTwitter size={12} /></a>
              <a href="#" className="hover:text-emerald-500 transition-all"><FaInstagram size={12} /></a>
            </div>
            <p className="text-[8px] text-white/10 uppercase tracking-[0.4em] font-black italic whitespace-nowrap">
              &copy; {currentYear} Vanguard Research Group
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;