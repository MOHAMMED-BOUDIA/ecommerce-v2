import React, { useState, useEffect, memo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineMagnifyingGlass,
  HiOutlineBars3BottomRight,
  HiOutlineXMark,
  HiOutlineCubeTransparent,
  HiOutlineHeart
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import clsx from "clsx";
import PremiumSearchOverlay from "../ui/PremiumSearchOverlay";

const NAV_LINKS = [
  { name: "Shop All", path: "/shop" },
  { name: "New Arrivals", path: "/new-arrivals" },
  { name: "Tactical Gears", path: "/tactical-gears" },
  { name: "The Lab", path: "/the-lab" },
];

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const { items } = useSelector((state) => state.cart || { items: [] });

  const cartCount = items ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  // Handle internal scroll resets for non-route links if needed
  const handleNavLinkClick = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner - Fixed Height to prevent CLS */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-slate-950 text-white flex items-center overflow-hidden border-b border-white/5 z-[60]" aria-hidden="true">
        <div className="flex whitespace-nowrap gap-20 text-[11px] font-black uppercase tracking-[0.4em] opacity-80 animate-marquee">
          <span>Free Global Deployment on orders over $500</span>
          <span>// System Update: New Tactical Modules Released</span>
          <span>// Archive Drop 08: Now Live</span>
          <span>Free Global Deployment on orders over $500</span>
          <span>// System Update: New Tactical Modules Released</span>
        </div>
      </div>

      <header
        className={clsx(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "top-0" : "top-10"
        )}
      >
        <nav className="container-custom py-4 min-h-[90px]" aria-label="Main Navigation">
          <div className={clsx(
            "relative flex items-center justify-between px-8 py-4 transition-all duration-500 rounded-full mx-auto min-h-[74px]",
            isScrolled
              ? "bg-slate-950/90 backdrop-blur-3xl border border-white/10 shadow-xl max-w-full"
              : "bg-slate-950/40 backdrop-blur-xl border border-white/5 shadow-none max-w-[1400px]"
          )}>

            <Link to="/" className="flex items-center gap-4 group" aria-label="Vanguard Home">
              <div className="relative w-11 h-11">
                <div className="w-11 h-11 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                  <HiOutlineCubeTransparent size={26} strokeWidth={2} className="relative z-10" aria-hidden="true" />
                </div>
                <div className="absolute -inset-1 bg-emerald-500/20 blur-md rounded-xl group-hover:bg-emerald-500/40 transition-all duration-500" />
              </div>
              <span className="text-2xl font-black text-white uppercase italic tracking-[-0.05em] leading-none hidden sm:flex items-center min-w-[120px]">
                VANGUARD<span className="text-emerald-500 ml-0.5 animate-pulse text-3xl">.</span>
              </span>
            </Link>


            <ul className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => handleNavLinkClick(link.path)}
                    className={({ isActive }) => clsx(
                        "text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 flex items-center gap-2 relative group",
                        isActive ? "text-emerald-400" : "text-white/70 hover:text-white"
                      )
                    }
                  >
                    {link.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-500 group-hover:w-full" />
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <HiOutlineMagnifyingGlass size={20} />
              </button>

              <Link to="/profile" onClick={(e) => handleNavLinkClick("/profile", e)} aria-label="Profile" className="w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <HiOutlineUser size={20} />
              </Link>

              <Link
                to="/cart"
                onClick={() => handleNavLinkClick("/cart")}
                aria-label="Cart"
                className="relative w-11 h-11 rounded-full flex items-center justify-center bg-emerald-500 text-slate-950 hover:bg-white transition-all duration-300 shadow-lg shadow-emerald-500/20 group"
              >
                <HiOutlineShoppingBag size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-950 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-emerald-500">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
                className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                {isOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3BottomRight size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Menu"
          className="fixed inset-0 z-[100] bg-slate-950 flex flex-col p-10 lg:hidden"
        >
          <div className="flex justify-between items-center mb-20">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950" aria-hidden="true">
              <HiOutlineCubeTransparent size={28} />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Menu"
              className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white"
            >
              <HiOutlineXMark size={32} />
            </button>
          </div>

          <nav className="flex flex-col gap-8" aria-label="Mobile Navigation">
            {NAV_LINKS.map((i) => (
              <div key={i.name}>
                <Link
                  to={i.path}
                  onClick={() => handleNavLinkClick(i.path)}
                  className="text-6xl font-black text-white uppercase italic tracking-tighter hover:text-emerald-400 transition-premium"
                >
                  {i.name}
                </Link>
              </div>
            ))}
          </nav>

          <div className="mt-auto grid grid-cols-2 gap-4">
            <Link to="/profile" className="p-8 bg-white/5 rounded-3xl text-white font-black uppercase text-[10px] tracking-widest flex items-center justify-between group hover:bg-emerald-500 hover:text-slate-950 transition-premium">
              Account <HiOutlineUser size={20} />
            </Link>
            <Link to="/wishlist" className="p-8 bg-white/5 rounded-3xl text-white font-black uppercase text-[10px] tracking-widest flex items-center justify-between group hover:bg-emerald-500 hover:text-slate-950 transition-premium">
              Wishlist <HiOutlineHeart size={20} />
            </Link>
          </div>
        </div>
      )}

      <PremiumSearchOverlay 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
    </>
  );
});

export default Navbar;
