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
  const { items: wishlistItems } = useSelector((state) => state.wishlist || { items: [] });

  const cartCount = items ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const wishlistCount = wishlistItems ? wishlistItems.length : 0;

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
      <div className="fixed top-0 left-0 right-0 h-8 md:h-10 bg-slate-950 text-white flex items-center overflow-hidden border-b border-white/5 z-[60]" aria-hidden="true">
        <div className="flex whitespace-nowrap gap-12 md:gap-20 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] opacity-80 animate-marquee">
          <span>Free Global Deployment on orders over 500 DH</span>
          <span>// System Update: New Tactical Modules Released</span>
          <span>// Archive Drop 08: Now Live</span>
          <span>Free Global Deployment on orders over 500 DH</span>
          <span>// System Update: New Tactical Modules Released</span>
        </div>
      </div>

      <header
        className={clsx(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "top-0 md:top-0" : "top-8 md:top-10"
        )}
      >
        <nav className="w-full py-2 md:py-4 px-3 sm:px-4 md:px-6" aria-label="Main Navigation">
          <div className={clsx(
            "relative flex items-center justify-between px-2.5 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4 transition-all duration-500 rounded-full mx-auto min-h-auto md:min-h-[74px] max-w-full md:max-w-[1400px]",
            isScrolled
              ? "bg-slate-950/90 backdrop-blur-3xl border border-white/10 shadow-xl"
              : "bg-slate-950/40 backdrop-blur-xl border border-white/5 shadow-none md:mx-auto"
          )}>

            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-4 group flex-shrink-0" aria-label="Vanguard Home">
              <div className="relative w-7 sm:w-8 md:w-11 h-7 sm:h-8 md:h-11 flex-shrink-0">
                <div className="w-full h-full rounded-lg md:rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                  <HiOutlineCubeTransparent size={16} strokeWidth={2} className="relative z-10 sm:w-[18px] sm:h-[18px] md:w-[26px] md:h-[26px]" aria-hidden="true" />
                </div>
                <div className="absolute -inset-1 bg-emerald-500/20 blur-md rounded-lg md:rounded-xl group-hover:bg-emerald-500/40 transition-all duration-500" />
              </div>
              <span className="text-sm sm:text-base md:text-2xl font-black text-white uppercase italic tracking-[-0.05em] leading-none hidden sm:flex items-center min-w-fit">
                VANGUARD<span className="text-emerald-500 ml-0.5 animate-pulse text-base sm:text-xl md:text-3xl">.</span>
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

            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="w-8 sm:w-9 md:w-11 h-8 sm:h-9 md:h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <HiOutlineMagnifyingGlass size={16} className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]" />
              </button>

              <Link to="/profile" onClick={(e) => handleNavLinkClick("/profile", e)} aria-label="Profile" className="w-8 sm:w-9 md:w-11 h-8 sm:h-9 md:h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <HiOutlineUser size={16} className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]" />
              </Link>

              <Link
                to="/wishlist"
                onClick={() => handleNavLinkClick("/wishlist")}
                aria-label="Wishlist"
                className="relative w-8 sm:w-9 md:w-11 h-8 sm:h-9 md:h-11 rounded-full flex items-center justify-center text-white/70 hover:text-emerald-400 hover:bg-white/10 transition-all duration-300 group"
              >
                <HiOutlineHeart size={16} strokeWidth={2} className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px] group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 md:w-5 h-4 md:h-5 bg-emerald-500 text-slate-950 text-[7px] md:text-[9px] font-black flex items-center justify-center rounded-full border border-white/20">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                onClick={() => handleNavLinkClick("/cart")}
                aria-label="Cart"
                className="relative w-8 sm:w-9 md:w-11 h-8 sm:h-9 md:h-11 rounded-full flex items-center justify-center bg-emerald-500 text-slate-950 hover:bg-white transition-all duration-300 shadow-lg shadow-emerald-500/20 group"
              >
                <HiOutlineShoppingBag size={16} strokeWidth={2.5} className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 md:w-5 h-4 md:h-5 bg-slate-950 text-white text-[7px] md:text-[9px] font-black flex items-center justify-center rounded-full border-2 border-emerald-500">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
                className="lg:hidden w-8 sm:w-9 md:w-11 h-8 sm:h-9 md:h-11 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                {isOpen ? <HiOutlineXMark size={18} className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]" /> : <HiOutlineBars3BottomRight size={18} className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]" />}
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
          className="fixed inset-0 z-[100] bg-slate-950 flex flex-col lg:hidden"
          style={{ top: isScrolled ? '56px' : '88px' }}
        >
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="p-3 sm:p-4 md:p-8 flex flex-col h-full">
              {/* Header - Logo & Close Button */}
              <div className="flex justify-between items-center mb-6 sm:mb-8 md:mb-12 flex-shrink-0">
                <div className="w-8 sm:w-9 md:w-11 h-8 sm:h-9 md:h-11 rounded-lg md:rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 flex-shrink-0 shadow-lg shadow-emerald-500/30" aria-hidden="true">
                  <HiOutlineCubeTransparent size={18} className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]" strokeWidth={2.5} />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Menu"
                  className="w-9 sm:w-10 md:w-11 h-9 sm:h-10 md:h-11 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 active:scale-95"
                >
                  <HiOutlineXMark size={20} className="sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px]" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-3 sm:gap-4 md:gap-6 flex-grow" aria-label="Mobile Navigation">
                {NAV_LINKS.map((i) => (
                  <Link
                    key={i.name}
                    to={i.path}
                    onClick={() => handleNavLinkClick(i.path)}
                    className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-tight hover:text-emerald-400 transition-colors duration-300 active:scale-95 pb-2.5 sm:pb-3 md:pb-4 border-b border-white/5 hover:border-emerald-400/30"
                  >
                    {i.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Action Cards - Always Visible */}
            <div className="flex-shrink-0 mt-auto p-3 sm:p-4 md:p-8 pt-4 sm:pt-6 md:pt-8 border-t border-white/5">
            </div>
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
