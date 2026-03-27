import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineShoppingBag, 
  HiOutlineStar, 
  HiOutlineAdjustmentsHorizontal,
  HiOutlineChevronDown,
  HiOutlineXMark,
  HiOutlineSquares2X2,
  HiOutlineQueueList,
  HiOutlineEye,
  HiOutlineFire
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Pagination from "../components/ui/Pagination";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // 1. Core Data Retrieval Pipeline
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        // Logging specific item as requested for verification
        console.log("Archive Payload Sample:", data[0]);
      })
      .catch((err) => {
        console.error("Archive Retrieval Failure:", err);
        setLoading(false);
      });
  }, []);

  const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Reset to page 1 on category change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen pt-40 pb-20">
      <div className="container-custom">
        {/* 2. DYNAMIC HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="space-y-4">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em]">Inventory System</span>
            <h1 className="text-8xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">
              The <span className="text-emerald-600">Archive.</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex bg-slate-100 p-1.5 rounded-full">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-premium ${viewMode === "grid" ? "bg-white shadow-sm text-slate-950" : "text-slate-400"}`}
                >
                  <HiOutlineSquares2X2 size={20} />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-premium ${viewMode === "list" ? "bg-white shadow-sm text-slate-950" : "text-slate-400"}`}
                >
                  <HiOutlineQueueList size={20} />
                </button>
             </div>
             <Button variant="secondary" className="rounded-full px-10 h-14 bg-slate-950 text-white">
                Refine Intel <HiOutlineAdjustmentsHorizontal size={18} className="ml-3" />
             </Button>
          </div>
        </header>

        {/* 3. CATEGORY SELECTOR */}
        <div className="flex flex-wrap gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-premium border-2 ${
                activeCategory === cat 
                  ? "bg-emerald-500 border-emerald-500 text-slate-950" 
                  : "bg-transparent border-slate-100 text-slate-400 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4. PRODUCT GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-6">
                <div className="aspect-[3/4] bg-slate-100 rounded-[3rem]" />
                <div className="h-6 bg-slate-100 w-2/3 rounded-full mx-auto" />
                <div className="h-4 bg-slate-100 w-1/3 rounded-full mx-auto" />
              </div>
            ))}
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
                  <div className={`relative overflow-hidden bg-slate-50 rounded-[3rem] shadow-premium transition-premium group-hover:shadow-emerald-200/50 ${viewMode === "grid" ? "aspect-[3/4] mb-8" : "w-64 h-80 flex-shrink-0"}`}>
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-contain p-12 transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlays */}
                    <div className="absolute inset-x-8 bottom-8 flex gap-3 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-premium">
                       <Button className="flex-1 h-14 rounded-2xl bg-slate-950 text-white shadow-xl">
                          <HiOutlineShoppingBag size={20} />
                       </Button>
                       <Link to={`/product/${product.id}`} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-950 shadow-xl hover:bg-emerald-500 transition-premium">
                          <HiOutlineEye size={20} />
                       </Link>
                    </div>

                    {product.rating.rate > 4.5 && (
                      <div className="absolute top-8 left-8">
                         <span className="px-4 py-2 bg-slate-950 text-white text-[9px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2">
                           <HiOutlineFire size={14} className="text-orange-500" /> High Demand
                         </span>
                      </div>
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
                    <h3 className="text-3xl font-black text-slate-900 leading-none uppercase italic tracking-tighter truncate transition-premium group-hover:text-emerald-600">
                      {product.title}
                    </h3>
                    <p className="text-2xl font-black text-slate-400 italic tracking-tighter leading-none">
                      ${product.price}
                    </p>
                    {viewMode === "list" && (
                       <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xl opacity-60">
                          {product.description}
                       </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* 5. PAGINATION SYSTEM */}
        {!loading && filteredProducts.length > itemsPerPage && (
          <div className="mt-20 pt-20 border-t border-slate-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Displaying Items {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} / Total {filteredProducts.length}
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

export default Shop;
