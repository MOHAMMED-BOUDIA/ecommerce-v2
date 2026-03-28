import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineArrowLongRight,
  HiOutlineFire,
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import clsx from "clsx";

const TRENDING_QUERIES = [
  "Noise Cancelling",
  "MacBook Pro M3",
  "Diamond Rings",
  "Leather Briefcase",
  "Silk Midi Dress",
];

const PremiumSearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("recent_searches");
      if (saved) setRecentSearches(JSON.parse(saved));
      setTimeout(() => inputRef.current?.focus(), 150);
      setActiveIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = products
        .filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setResults(filtered);
      setActiveIndex(-1);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < (query ? results.length : 4) - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        const list = query ? results : products.filter(p => p.isFeatured).slice(0, 4);
        const selected = list[activeIndex];
        navigate(`/product/${selected.slug}`);
        onClose();
      } else {
        handleSearch(query);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    const updatedRecent = [
      searchQuery,
      ...recentSearches.filter((s) => s !== searchQuery),
    ].slice(0, 5);
    
    setRecentSearches(updatedRecent);
    localStorage.setItem("recent_searches", JSON.stringify(updatedRecent));
    
    navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  const removeRecent = (e, item) => {
    e.stopPropagation();
    const updated = recentSearches.filter((s) => s !== item);
    setRecentSearches(updated);
    localStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex flex-col"
        >
          {/* Top Navigation Bar */}
          <div className="w-full border-b border-white/5 bg-black/40">
            <div className="container-custom py-6 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                    Search Intelligence
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors"
                aria-label="Close search"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Close ESC</span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <HiOutlineXMark size={20} />
                </div>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-none">
            <div className="container-custom py-12 lg:py-20">
              {/* Intelligent Search Input */}
              <div className="relative mb-24 max-w-5xl mx-auto lg:mx-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(query);
                  }}
                  className="relative group"
                >
                  <HiOutlineMagnifyingGlass 
                    className={clsx(
                      "absolute left-0 top-1/2 -translate-y-1/2 text-4xl lg:text-5xl transition-colors duration-500",
                      query ? "text-emerald-500" : "text-white/10"
                    )} 
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search premium products..."
                    className="w-full bg-transparent border-none pl-16 lg:pl-24 py-6 text-4xl lg:text-7xl font-light text-white placeholder:text-white/5 outline-none focus:ring-0 transition-all font-sans"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10">
                    <motion.div 
                      className="h-[2px] bg-emerald-500" 
                      initial={{ width: 0 }}
                      animate={{ width: query ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </form>
                <div className="mt-6 flex items-center gap-4 text-white/20">
                  <span className="text-[10px] font-medium uppercase tracking-widest">
                    {query ? `Press Enter to search all results for "${query}"` : "Start typing to see real-time suggestions"}
                  </span>
                </div>
              </div>

              {/* Exploration Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                {/* Side Discovery Column */}
                <div className="lg:col-span-4 space-y-16">
                  {/* Recent Activity */}
                  {recentSearches.length > 0 && (
                    <section>
                      <header className="flex items-center gap-3 mb-8">
                        <HiOutlineClock className="text-emerald-500" size={18} />
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                          Recently Viewed
                        </h3>
                      </header>
                      <div className="flex flex-col gap-3">
                        {recentSearches.map((item) => (
                          <div
                            key={item}
                            onClick={() => handleSearch(item)}
                            className="group flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/[0.03] cursor-pointer transition-all border border-transparent hover:border-white/5"
                          >
                            <span className="text-sm text-white/50 group-hover:text-white transition-colors">{item}</span>
                            <button 
                              onClick={(e) => removeRecent(e, item)}
                              className="text-white/10 hover:text-red-400 p-1 transition-colors"
                            >
                              <HiOutlineXMark size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Curated Trends */}
                  <section>
                    <header className="flex items-center gap-3 mb-8">
                      <HiOutlineFire className="text-orange-500" size={18} />
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                        Popular Keywords
                      </h3>
                    </header>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING_QUERIES.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleSearch(item)}
                          className="px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all duration-300"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* Elite Collections */}
                  <section>
                    <header className="flex items-center gap-3 mb-8">
                      <HiOutlineTag className="text-emerald-500" size={18} />
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                        Shop by Category
                      </h3>
                    </header>
                    <div className="grid grid-cols-1 gap-3">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${cat.slug}`}
                          onClick={onClose}
                          className="group flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl hover:bg-white/[0.06] transition-all border border-white/5"
                        >
                          <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest text-white">{cat.name}</span>
                            <span className="text-[9px] text-white/30 uppercase mt-1 tracking-wider">{cat.description}</span>
                          </div>
                          <HiOutlineArrowLongRight className="text-white/10 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" size={20} />
                        </Link>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Primary Results Column */}
                <div className="lg:col-span-8">
                  <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      {query ? <HiOutlineMagnifyingGlass className="text-emerald-500" /> : <HiOutlineSparkles className="text-emerald-500" />}
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                        {query ? `Search Results [${results.length}]` : "Curated Recommendations"}
                      </h3>
                    </div>
                  </header>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {(query ? results : products.filter(p => p.isFeatured).slice(0, 4)).map((product, idx) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        onClick={onClose}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={clsx(
                          "group relative flex items-center gap-8 p-5 rounded-3xl border transition-all duration-500 overflow-hidden",
                          activeIndex === idx 
                          ? "bg-white/[0.06] border-white/10 translate-x-3" 
                          : "bg-white/[0.02] border-white/5"
                        )}
                      >
                        {/* Hover Gradient Effect */}
                        <div className={clsx(
                          "absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/[0.02] to-emerald-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                          activeIndex === idx && "opacity-100"
                        )} />
                        
                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0 relative z-10 transition-transform duration-700 group-hover:scale-95">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                          />
                        </div>

                        <div className="relative z-10 flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/80">
                              {product.category}
                            </span>
                            {product.isNew && (
                              <span className="w-1 h-1 rounded-full bg-emerald-500" />
                            )}
                            {product.isNew && (
                              <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">New Arrival</span>
                            )}
                          </div>
                          
                          <h4 className="text-lg lg:text-xl font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-1 mb-2">
                            {product.name}
                          </h4>
                          
                          <div className="flex items-center gap-4">
                            <span className="text-xl font-bold text-white tracking-tight">
                              {product.price.toLocaleString()} <span className="text-xs font-normal text-white/40 ml-1 uppercase">DH</span>
                            </span>
                            <div className="h-4 w-[1px] bg-white/10" />
                            <div className="flex items-center gap-1 text-emerald-500/60">
                              <span className="text-[10px] font-bold whitespace-nowrap uppercase tracking-widest group-hover:text-emerald-400">View Product</span>
                              <HiOutlineArrowLongRight className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>

                        {/* Visual Index */}
                        <div className="absolute top-6 right-8 text-[40px] font-black text-white/[0.02] italic hidden lg:block group-hover:text-emerald-500/5 transition-colors">
                          0{idx + 1}
                        </div>
                      </Link>
                    ))}

                    {query && results.length === 0 && (
                      <div className="py-20 flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
                          <HiOutlineMagnifyingGlass className="text-white/10" size={32} />
                        </div>
                        <h4 className="text-xl text-white font-medium mb-2">No matches found for \"\"${query}\"\"</h4>
                        <p className="text-white/40 text-sm max-w-xs">Double check your spelling or try searching for a category like \"\"Electronics\"\".</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumSearchOverlay;
