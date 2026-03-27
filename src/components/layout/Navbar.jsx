import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineMagnifyingGlass,
  HiOutlineBars3BottomRight,
  HiOutlineXMark,
  HiOutlineArrowRight,
  HiOutlineCubeTransparent
} from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../features/cart/cartSlice";
import clsx from "clsx";
import PremiumSearchOverlay from "../ui/PremiumSearchOverlay";

const NAV_LINKS = [
  { name: "Shop All", path: "/shop" },
  { name: "New Arrivals", path: "/new-arrivals" },
  { name: "Tactical Gears", path: "/tactical-gears" },
  { name: "The Lab", path: "/the-lab" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const { items } = useSelector((state) => state.cart || { items: [] });
  const dispatch = useDispatch();
  const location = useLocation();

  const cartCount = items ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-10 bg-slate-950 text-white flex items-center overflow-hidden border-b border-white/5 z-[60]">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-20 text-[9px] font-black uppercase tracking-[0.4em] opacity-80"
        >
          <span>Free Global Deployment on orders over $500</span>
          <span>// System Update: New Tactical Modules Released</span>
          <span>// Archive Drop 08: Now Live</span>
          <span>Free Global Deployment on orders over $500</span>
          <span>// System Update: New Tactical Modules Released</span>
        </motion.div>
      </div>

      <header
        className={clsx(
          "fixed left-0 right-0 z-50 transition-premium",
          isScrolled ? "top-0" : "top-10"
        )}
      >
        <nav className="container-custom py-4">
          <div className={clsx(
            "relative flex items-center justify-between px-8 py-4 transition-premium rounded-full mx-auto",
            isScrolled
              ? "bg-slate-950/90 backdrop-blur-3xl border border-white/10 shadow-elite max-w-full"
              : "bg-slate-950/40 backdrop-blur-xl border border-white/5 shadow-none max-w-[1400px]"
          )}>

            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:shadow-emerald-500/40 relative z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                  <HiOutlineCubeTransparent size={26} strokeWidth={2} className="relative z-10" />
                </div>
                <div className="absolute -inset-1 bg-emerald-500/20 blur-md rounded-xl group-hover:bg-emerald-500/40 transition-premium" />
              </div>
              <span className="text-2xl font-black text-white uppercase italic tracking-[-0.05em] leading-none hidden sm:flex items-center">
                VANGUARD<span className="text-emerald-500 ml-0.5 animate-pulse text-3xl">.</span>
              </span>
            </Link>


            <ul className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => clsx(
                        "text-[10px] font-black uppercase tracking-[0.3em] transition-premium flex items-center gap-2 relative group",
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
                className="w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-premium"
              >
                <HiOutlineMagnifyingGlass size={20} />
              </button>

              <Link to="/profile" className="w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-premium">
                <HiOutlineUser size={20} />
              </Link>

              <Link
                to="/cart"
                className="relative w-11 h-11 rounded-full flex items-center justify-center bg-emerald-500 text-slate-950 hover:bg-white transition-premium shadow-lg shadow-emerald-500/20 group"
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
                className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-premium"
              >
                {isOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3BottomRight size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950">
                <HiOutlineCubeTransparent size={28} />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white"
              >
                <HiOutlineXMark size={32} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-6xl font-black text-white uppercase italic tracking-tighter hover:text-emerald-400 transition-premium"
                  >
                    {link.name}
                  </Link>
                </motion.div>
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
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <PremiumSearchOverlay 
          isOpen={searchOpen} 
          onClose={() => setSearchOpen(false)} 
        />
      </AnimatePresence>
    </>
  );
};

export default Navbar;
