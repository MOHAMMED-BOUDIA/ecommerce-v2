import React, { useState, useEffect, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineShoppingBag, 
  HiOutlineStar, 
  HiOutlineAdjustmentsHorizontal,
  HiOutlineSquares2X2,
  HiOutlineQueueList,
  HiOutlineEye,
  HiOutlineFire
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/cart/cartSlice";
import Button from "./Button";
import Pagination from "./Pagination";

// Optimized Image for Collection (CLS reduction)
const CollectionImage = memo(({ src, alt, viewMode }) => (
  <div 
    className={`relative overflow-hidden bg-slate-50 rounded-[3rem] shadow-premium transition-premium group-hover:shadow-emerald-200/50 ${viewMode === "grid" ? "aspect-[3/4] mb-8" : "w-64 h-80 flex-shrink-0"}`}
    style={{ contain: 'paint' }}
  >
    <img 
      src={src} 
      alt={alt} 
      loading="lazy"
      decoding="async"
      onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"; }}
      className="w-full h-full object-contain p-12 transition-transform duration-1000 group-hover:scale-110 will-change-transform"
    />
  </div>
));
CollectionImage.displayName = 'CollectionImage';

const CollectionTemplate = ({
  config,
  products,
  loading,
  emptyMessage = "No active intel found for these parameters."
}) => {
  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  
  const dispatch = useDispatch();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const categories = useMemo(() => ["all", "electronics", "jewelery", "men's clothing", "women's clothing"], []);

  const displayedProducts = useMemo(() => {
    let filtered = activeCategory === "all" 
      ? [...products] 
      : products.filter(p => p.category === activeCategory);

    if (sortBy === "price-asc") {
      filtered.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "price-desc") {
      filtered.sort((a,b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "rating") {
      filtered.sort((a,b) => parseFloat(b.rating?.rate || 0) - parseFloat(a.rating?.rate || 0));
    } else if (sortBy === "newest") {
      filtered.sort((a,b) => (b.newArrival === a.newArrival ? 0 : b.newArrival ? 1 : -1));
    }
    return filtered;
  }, [products, activeCategory, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, sortBy]);

  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = useMemo(() => 
    displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct),
    [displayedProducts, indexOfFirstProduct, indexOfLastProduct]
  );

  const handleSortToggle = () => {
    if (sortBy === "newest") setSortBy("price-asc");
    else if (sortBy === "price-asc") setSortBy("price-desc");
    else if (sortBy === "price-desc") setSortBy("rating");
    else setSortBy("newest");
  };

  const getSortLabel = () => {
    if (sortBy === "newest") return "Sort: Newest";
    if (sortBy === "price-asc") return "Price: Low to High";
    if (sortBy === "price-desc") return "Price: High to Low";
    if (sortBy === "rating") return "Top Rated Selects";
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen pt-40 pb-20 transition-colors duration-500">
      <div className="container-custom">
        <header className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="space-y-4">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em]">
              {config.subtitle}
            </span>
            <h1 className="text-6xl md:text-8xl flex flex-wrap gap-4 font-black text-slate-950 uppercase italic tracking-tighter leading-none">
              {config.title} <span className="text-emerald-600">{config.highlight}</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex bg-slate-100 p-1.5 rounded-full" role="group" aria-label="View Mode Toggle">
                <button 
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  aria-pressed={viewMode === "grid"}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-premium ${viewMode === "grid" ? "bg-white shadow-sm text-slate-950" : "text-slate-400"}`}
                >
                  <HiOutlineSquares2X2 size={20} aria-hidden="true" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  aria-label="List View"
                  aria-pressed={viewMode === "list"}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-premium ${viewMode === "list" ? "bg-white shadow-sm text-slate-950" : "text-slate-400"}`}
                >
                  <HiOutlineQueueList size={20} aria-hidden="true" />
                </button>
             </div>
             <Button onClick={handleSortToggle} variant="secondary" className="rounded-full px-10 h-14 bg-slate-950 text-white min-w-[200px]" aria-label={`Current sorting: ${getSortLabel()}. Click to change.`}>
                {getSortLabel()} <HiOutlineAdjustmentsHorizontal size={18} className="ml-3" aria-hidden="true" />
             </Button>
          </div>
        </header>

        <nav className="flex flex-wrap gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar" aria-label="Product Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-premium border-2 ${
                activeCategory === cat 
                  ? "bg-slate-950 border-slate-950 text-white"
                  : "bg-transparent border-slate-100 text-slate-400 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-6">
                <div className="aspect-[3/4] bg-slate-100 rounded-[3rem]" />
                <div className="h-6 bg-slate-100 w-2/3 rounded-full mx-auto" />
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-lg font-medium italic">
            {emptyMessage}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12" 
                : "flex flex-col gap-8"
              }
            >
              {currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`group relative ${viewMode === "list" ? "flex items-center gap-12 border-b border-slate-100 pb-12" : ""}`}
                >
                  <CollectionImage src={product.image} alt={product.title} viewMode={viewMode} />
                    
                  <div className={`absolute inset-x-8 bottom-8 flex gap-3 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-premium z-10 ${viewMode === 'list' ? 'hidden' : ''}`}>
                       <button 
                         onClick={(e) => {
                           e.preventDefault();
                           dispatch(addItem(product));
                         }}
                         aria-label={`Acquire ${product.title}`}
                         className="flex-1 h-14 rounded-2xl bg-slate-950 text-white font-black uppercase tracking-wider text-[10px] hover:bg-emerald-500 hover:text-slate-950 transition-premium shadow-xl flex items-center justify-center gap-2"
                       >
                          <HiOutlineShoppingBag size={20} aria-hidden="true" />
                          <span className={`${viewMode === "grid" ? "hidden lg:inline-block" : "inline-block"}`}>Acquire</span>
                       </button>
                       <Link to={`/product/${product.id}`} aria-label={`View details for ${product.title}`} className="w-14 h-14 bg-white text-slate-950 hover:bg-slate-200 rounded-2xl flex items-center justify-center shadow-xl transition-premium">
                          <HiOutlineEye size={20} aria-hidden="true" />
                       </Link>
                  </div>

                  {/* DYNAMIC BADGES STANDARDIZED TO THEME */}
                  <div className="absolute top-8 left-8 right-8 flex justify-between pointer-events-none z-10">
                    {product.badge === "New" && (
                       <span className="px-3 py-1 bg-emerald-500 text-slate-950 shadow-emerald-500/20 text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-lg">
                         {product.badge}
                       </span>
                    )}
                    {product.badge === "Lab Edition" && (
                       <span className="px-3 py-1 bg-slate-950 text-white text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-lg ml-auto">
                         {product.badge}
                       </span>
                    )}
                    {product.badge === "Hot" && (
                       <span className="px-3 py-1 bg-slate-950 text-white text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 ml-auto">
                         <HiOutlineFire size={12} className="text-orange-500" /> Hot
                       </span>
                    )}
                  </div>

                  <div className={`space-y-4 ${viewMode === "grid" ? "text-center px-4" : "flex-1"}`}>
                    <div className={`flex items-center gap-4 text-slate-400 ${viewMode === "grid" ? "justify-center" : ""}`}>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">{product.category}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-200" />
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <HiOutlineStar size={14} className="fill-current" />
                        <span className="text-[10px] font-black">{product.rating.rate}</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-950 leading-none uppercase italic tracking-tighter truncate transition-premium group-hover:text-emerald-600">
                      {product.title}
                    </h3>
                    <p className="text-2xl font-black text-slate-400 italic tracking-tighter leading-none">
                      {product.price} DH
                    </p>
                    {viewMode === "list" && (
                       <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xl opacity-80">
                          {product.shortDescription} {product.description}
                       </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* PAGINATION */}
        {!loading && displayedProducts.length > itemsPerPage && (
          <div className="mt-20 pt-20 border-t border-slate-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Displaying Items {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, displayedProducts.length)} / Total {displayedProducts.length}
              </span>
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionTemplate;
