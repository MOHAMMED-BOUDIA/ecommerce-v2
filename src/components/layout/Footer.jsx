import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineArrowRight,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineTruck,
} from "react-icons/hi2";
import {
  FaInstagram,
  FaTwitter,
  FaDiscord,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Global Archive", path: "/shop" },
      { name: "New Deployments", path: "/shop" },
      { name: "Tactical Loadout", path: "/shop" },
      { name: "Apparel Protocol", path: "/shop" },
    ],
    intel: [
      { name: "Mission Log", path: "/" },
      { name: "Recruitment", path: "/" },
      { name: "Maintenance", path: "/" },
      { name: "The Lab", path: "/" },
    ],
    deployment: [
      { name: "Transit Policy", path: "/" },
      { name: "Return Protocol", path: "/" },
      { name: "Secure Gateway", path: "/" },
      { name: "Terms of Engagement", path: "/" },
    ],
  };

  const socialLinks = [
    { Icon: FaInstagram, path: "#", label: "Instagram" },
    { Icon: FaTwitter, path: "#", label: "Twitter" },
    { Icon: FaDiscord, path: "#", label: "Discord" },
    { Icon: FaGithub, path: "#", label: "Github" },
  ];

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-4 group w-fit">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-emerald-500/20">
                <HiOutlineGlobeAlt size={32} />
              </div>
              <span className="text-3xl font-black uppercase italic tracking-tighter">
                Vanguard<span className="text-emerald-500">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm italic">
              Pioneering the intersection of high-performance technical gear and
              urban aesthetic. Every deployment is a statement of intent.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, path, label }, i) => (
                <a
                  key={i}
                  href={path}
                  aria-label={label}
                  className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8 underline underline-offset-8 decoration-white/10">
                Archive
              </h4>
              <ul className="space-y-4">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8 underline underline-offset-8 decoration-white/10">
                Intel
              </h4>
              <ul className="space-y-4">
                {footerLinks.intel.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8 underline underline-offset-8 decoration-white/10">
                Protocol
              </h4>
              <ul className="space-y-4">
                {footerLinks.deployment.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comms Link */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-4">
              Comms Link
            </h4>
            <div className="space-y-6">
              <p className="text-slate-400 text-xs font-medium italic leading-relaxed">
                Join the encrypted frequency for priority deployment updates and
                exclusive archives.
              </p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="ID@NETWORK.IO"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-emerald-500 outline-none transition-all font-black hover:bg-white/[0.05]"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-emerald-500 text-slate-950 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all duration-300 flex items-center gap-2 group/btn">
                  Sync
                  <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Credentials */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest">
              <HiOutlineShieldCheck size={14} className="text-emerald-500" />{" "}
              AES-256 Encrypted
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest">
              <HiOutlineTruck size={14} className="text-emerald-500" /> Global
              Logistic Protocol
            </div>
          </div>

          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.4em] order-3 md:order-2">
            &copy; {currentYear} Vanguard Lab. Terminal v4.0.2
          </p>

          <div className="flex items-center gap-6 order-2 md:order-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-500 cursor-help transition-colors">
              HELP@VANGUARD.IO
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
