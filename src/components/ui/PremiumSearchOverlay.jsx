import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineArrowUpRight,
  HiOutlineFire,
  HiOutlineClock,
  HiOutlineTag,
} from "react-icons/hi2";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import clsx from "clsx";

const TRENDING_QUERIES = [
  "Tactical Wear",
  "Cyber Deck",
  "Modular Vest",
  "Exoskeleton",
  "Neural Link",
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
      setTimeout(() => inputRef.current?.focus(), 100);
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
        .slice(0, 4);
      setResults(filtered);
      setActiveIndex(-1);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const selected = results[activeIndex];
      navigate(`/product/${selected.slug}`);
      onClose();
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
          className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-2xl flex flex-col"
        >
          {/* Header */}
          <div className="container-custom py-10 flex justify-between items-center bg-slate-950/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <HiOutlineMagnifyingGlass size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/50">
                Quantum Search v2.0
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-emerald-500 hover:text-slate-950 transition-premium group"
            >
              <HiOutlineXMark size={24} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none pb-20">
            <div className="container-custom py-10">
              {/* Search Input Area */}
              <div className="relative mb-20 max-w-5xl mx-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(query);
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="ENTER QUERY_ "
                    className="w-full bg-transparent border-b-2 border-white/5 py-8 text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter placeholder:text-white/5 outline-none focus:border-emerald-500 transition-premium"
                  />
                  <div className="absolute right-4 bottom-8 flex items-center gap-4 pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
                    <span className="text-[10px] font-mono text-white tracking-widest uppercase">press enter to execute</span>
                  </div>
                </form>
              </div>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
                {/* Left Column: Contextual Data */}
                <div className="lg:col-span-4 space-y-12">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <section>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6 flex items-center gap-3">
                         <HiOutlineClock size={14} /> Recent Protocols
                      </h3>
                      <div className="flex flex-col gap-2">
                        {recentSearches.map((item) => (
                          <div
                            key={item}
                            onClick={() => handleSearch(item)}
                            className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-emerald-500/10 cursor-pointer border border-transparent hover:border-emerald-500/20 transition-premium"
                          >
                            <span className="text-white/60 group-hover:text-emerald-400 font-bold uppercase transition-colors italic">{item}</span>
                            <button 
                              onClick={(e) => removeRecent(e, item)}
                              className="text-white/20 hover:text-white p-1"
                            >
                              <HiOutlineXMark size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Trending */}
                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6 flex items-center gap-3">
                       <HiOutlineFire size={14} className="text-orange-500" /> Trending Flux
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING_QUERIES.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleSearch(item)}
                          className="px-5 py-2.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/60 hover:bg-white hover:text-slate-950 transition-premium"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* Categories */}
                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6 flex items-center gap-3">
                       <HiOutlineTag size={14} /> Node Categories
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.slice(0, 4).map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${cat.id}`}
                          onClick={onClose}
                          className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-emerald-500 group transition-premium border border-transparent hover:border-emerald-500/40"
                        >
                          <span className="text-xs font-black uppercase tracking-widest text-white group-hover:text-slate-950">{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right Column: Live Results */}
                <div className="lg:col-span-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6 px-4">
                    {query ? `Detected Modules [${results.length}]` : "Featured Tech"}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(query ? results : products.filter(p => p.isFeatured).slice(0, 4)).map((product, idx) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        onClick={onClose}
                        onMouseEnter={() => query && setActiveIndex(idx)}
                        className={clsx(
                          "group relative flex items-center gap-6 p-4 rounded-3xl border transition-premium overflow-hidden",
                          query && activeIndex === idx 
                          ? "bg-white/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]" 
                          : "bg-white/5 border-white/5"
                        )}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[80px] group-hover:bg-emerald-500/20 transition-premium" />
                        
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shrink-0 relative z-10">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                          />
                        </div>

                        <div className="relative z-10 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500/70 py-1 px-2 bg-emerald-500/10 rounded">
                              {product.category}
                            </span>
                          </div>
                          <h4 className="text-white font-black uppercase italic tracking-tighter group-hover:text-emerald-400 transition-colors mb-2">
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-black text-white/90 font-mono italic">
                              ${product.price}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-emerald-500 group-hover:text-slate-950 transition-premium">
                              <HiOutlineArrowUpRight size={16} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}

                    {query && results.length === 0 && (
                      <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-6">
                          <HiOutlineMagnifyingGlass size={40} />
                        </div>
                        <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px]">Zero matches found in database</p>
                      </div>
                    )}
                  </div>

                  {query && results.length > 0 && (
                    <button
                      onClick={() => handleSearch(query)}
                      className="w-full mt-8 p-6 bg-emerald-500 text-slate-950 font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-premium flex items-center justify-center gap-3"
                    >
                      View All Results <HiOutlineArrowUpRight size={20} />
                    </button>
                  )}
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