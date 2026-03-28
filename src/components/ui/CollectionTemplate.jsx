import React, { useEffect, useMemo, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineEye,
  HiOutlineFire,
  HiOutlineQueueList,
  HiOutlineShoppingBag,
  HiOutlineSquares2X2,
  HiOutlineStar,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/formatPrice";
import Button from "./Button";
import Pagination from "./Pagination";

const CollectionImage = memo(({ src, alt, viewMode }) => (
  <div
    className={`relative overflow-hidden rounded-[2.25rem] border border-slate-100 bg-slate-100 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-500 group-hover:border-emerald-100 group-hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] ${
      viewMode === "grid" ? "aspect-square" : "h-full min-h-[280px] w-full lg:min-h-[340px] lg:w-[42%]"
    }`}
    style={{ contain: "paint" }}
  >
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.16)_30%,rgba(15,23,42,0.05)_100%)] opacity-90" />
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80";
      }}
      className="relative z-10 h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.06] will-change-transform"
    />
  </div>
));
CollectionImage.displayName = "CollectionImage";

const formatCategoryLabel = (category) => {
  if (category === "all") return "All Items";
  if (category === "jewelery") return "Jewelry";
  if (category === "men's clothing") return "Men's Clothing";
  if (category === "women's clothing") return "Women's Clothing";
  return category ? category.charAt(0).toUpperCase() + category.slice(1) : "Archive";
};

const CollectionTemplate = ({
  config,
  products,
  loading,
  emptyMessage = "No active intel found for these parameters.",
}) => {
  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const itemsPerPage = 8;

  const categories = useMemo(() => ["all", "electronics", "jewelery", "men's clothing", "women's clothing"], []);

  const displayedProducts = useMemo(() => {
    let filteredProducts =
      activeCategory === "all"
        ? [...products]
        : products.filter((product) => product.category === activeCategory);

    if (sortBy === "price-asc") {
      filteredProducts.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price));
    } else if (sortBy === "price-desc") {
      filteredProducts.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price));
    } else if (sortBy === "rating") {
      filteredProducts.sort(
        (a, b) => Number.parseFloat(b.rating?.rate || 0) - Number.parseFloat(a.rating?.rate || 0)
      );
    } else if (sortBy === "newest") {
      filteredProducts.sort((a, b) => (b.newArrival === a.newArrival ? 0 : b.newArrival ? 1 : -1));
    }

    return filteredProducts;
  }, [products, activeCategory, sortBy]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCurrentPage(1);
  }, [activeCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(displayedProducts.length / itemsPerPage));
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = useMemo(
    () => displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct),
    [displayedProducts, indexOfFirstProduct, indexOfLastProduct]
  );

  const handleSortToggle = () => {
    if (sortBy === "newest") setSortBy("price-asc");
    else if (sortBy === "price-asc") setSortBy("price-desc");
    else if (sortBy === "price-desc") setSortBy("rating");
    else setSortBy("newest");
  };

  const getSortLabel = () => {
    if (sortBy === "newest") return "Newest";
    if (sortBy === "price-asc") return "Price: Low to High";
    if (sortBy === "price-desc") return "Price: High to Low";
    if (sortBy === "rating") return "Top Rated";
    return "Newest";
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visibleCount = displayedProducts.length;
  const pageStart = visibleCount === 0 ? 0 : indexOfFirstProduct + 1;
  const pageEnd = Math.min(indexOfLastProduct, visibleCount);
  const avgRating = products.length > 0 
    ? (products.reduce((sum, p) => sum + (Number.parseFloat(p.rating?.rate || 0)), 0) / products.length).toFixed(1)
    : "0";

  return (
    <div className="min-h-screen bg-white pt-32 md:pt-40 pb-16 md:pb-24 transition-colors duration-500">
      <div className="container-custom px-4 md:px-6">
        <header className="grid gap-6 md:gap-10 border-b border-slate-200 pb-8 md:pb-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
          <div className="space-y-4 md:space-y-5 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/8 px-3 md:px-4 py-1.5 md:py-2 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.45em] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.85)] flex-shrink-0" />
              {config.subtitle}
            </span>
            <h1 className="flex flex-wrap gap-2 md:gap-4 text-4xl md:text-6xl lg:text-8xl font-black leading-tight md:leading-none tracking-tighter text-slate-950 uppercase italic">
              {config.title} <span className="text-emerald-600">{config.highlight}</span>
            </h1>
            <p className="max-w-2xl text-xs md:text-sm lg:text-base leading-relaxed text-slate-600">
              Curated premium collection with exceptional variety, realistic product data, and premium styling for the discerning customer.
            </p>
          </div>

          <div className="hidden md:grid gap-4 sm:grid-cols-3">
            {[
              { label: "Total", value: String(products.length).padStart(2, "0"), suffix: "Products" },
              { label: "Avg Rating", value: avgRating, suffix: "Stars" },
              { label: "Display", value: viewMode === "grid" ? "Grid" : "List", suffix: "Mode" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/50 px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="text-[8px] font-black uppercase tracking-[0.45em] text-slate-400">{stat.label}</div>
                <div className="mt-3 flex items-end gap-2">
                  <div className="text-2xl font-black uppercase italic tracking-tighter text-slate-950">{stat.value}</div>
                  <div className="pb-1 text-[9px] font-black uppercase tracking-[0.35em] text-slate-400">{stat.suffix}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </header>

        <div className="mt-6 md:mt-8 rounded-lg md:rounded-[2rem] border border-slate-200 bg-slate-50/85 p-3 md:p-5 shadow-[0_16px_55px_rgba(15,23,42,0.05)] backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:gap-5 lg:flex-row lg:items-center lg:justify-between">
            <nav className="flex flex-wrap gap-2 md:gap-3 overflow-x-auto pb-2 no-scrollbar" aria-label="Product Categories">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                const categoryCount = category === "all" ? products.length : products.filter((product) => product.category === category).length;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-[10px] font-black uppercase tracking-[0.35em] transition-all duration-300 ${
                      isActive
                        ? "border-slate-950 bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                        : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-700"
                    }`}
                  >
                    <span>{formatCategoryLabel(category)}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[9px] tracking-[0.2em] ${
                        isActive ? "bg-white/10 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {categoryCount}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="flex flex-col gap-2 md:gap-3 sm:flex-row sm:items-center sm:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-slate-200 bg-white p-1 md:p-1.5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] backdrop-blur-xs"
                role="group"
                aria-label="View Mode Toggle"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  aria-pressed={viewMode === "grid"}
                  className={`flex h-8 md:h-11 w-8 md:w-11 items-center justify-center rounded-full transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-slate-950 text-white shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
                      : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  }`}
                  title="Grid view"
                >
                  <HiOutlineSquares2X2 size={16} className="md:w-[18px] md:h-[18px]" aria-hidden="true" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("list")}
                  aria-label="List View"
                  aria-pressed={viewMode === "list"}
                  className={`flex h-8 md:h-11 w-8 md:w-11 items-center justify-center rounded-full transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-slate-950 text-white shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
                      : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  }`}
                  title="List view"
                >
                  <HiOutlineQueueList size={16} className="md:w-[18px] md:h-[18px]" aria-hidden="true" />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="inline-flex items-center gap-1 md:gap-1.5 rounded-full border border-slate-200 bg-gradient-to-r from-white to-slate-50/80 px-1 md:px-1.5 py-1 md:py-1.5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] backdrop-blur-xs"
              >
                <div className="px-2 md:px-3 py-1 md:py-2 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500">Sort:</div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortToggle}
                  className="group inline-flex h-8 md:h-11 items-center gap-1.5 md:gap-2 rounded-full border border-slate-300 bg-slate-950 px-2.5 md:px-4 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-white transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500 hover:text-slate-950 hover:shadow-[0_10px_28px_rgba(16,185,129,0.15)]"
                  aria-label={`Current sorting: ${getSortLabel()}. Click to change.`}
                  title="Click to cycle through sorting options"
                >
                  <HiOutlineAdjustmentsHorizontal
                    size={12}
                    className="md:w-[15px] md:h-[15px] transition-transform duration-300 group-hover:rotate-12"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline">{getSortLabel()}</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-5 rounded-[2.5rem] border border-slate-100 bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.04)] animate-pulse">
                <div className="aspect-[4/5] rounded-[2rem] bg-slate-100" />
                <div className="space-y-3 p-2">
                  <div className="h-3 w-24 rounded-full bg-slate-100" />
                  <div className="h-7 w-4/5 rounded-full bg-slate-100" />
                  <div className="h-3 w-full rounded-full bg-slate-100" />
                  <div className="h-3 w-3/4 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="mt-16 rounded-[2rem] border border-dashed border-slate-200 bg-slate-50/70 px-8 py-20 text-center text-base font-medium italic text-slate-400">
            {emptyMessage}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className={
                viewMode === "grid"
                  ? "mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-10"
                  : "mt-12 flex flex-col gap-8"
              }
            >
              {currentProducts.map((product) => {
                const categoryLabel = formatCategoryLabel(product.category);
                const ratingValue = Number.parseFloat(product.rating?.rate || 0).toFixed(1);
                const reviewCount = product.rating?.count || 0;
                const formattedPrice = formatPrice(product.price);
                const description = product.shortDescription || product.description;
                const detailSlug = product.slug || product.id;

                return (
                  <motion.article
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    whileHover={{ y: -10 }}
                    className={`group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition-all duration-500 hover:border-emerald-200 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)] hover:bg-slate-50/50 ${
                      viewMode === "list" ? "lg:flex lg:items-stretch" : ""
                    }`}
                  >
                    <div className={`relative ${viewMode === "list" ? "lg:w-[42%]" : ""}`}>
                      <CollectionImage src={product.image} alt={product.name || product.title} viewMode={viewMode} />
                      
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
                        {product.badge && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`rounded-full px-3 py-1 text-[8px] font-black uppercase tracking-[0.35em] shadow-[0_8px_20px_rgba(0,0,0,0.25)] backdrop-blur-sm ${
                              product.badge === "New"
                                ? "bg-emerald-500 text-slate-950"
                                : product.badge === "Lab Edition"
                                  ? "bg-slate-950 text-emerald-400"
                                  : "bg-white/95 text-slate-950"
                            }`}
                          >
                            {product.badge === "Hot" ? (
                              <span className="inline-flex items-center gap-1.5">
                                <HiOutlineFire size={11} className="text-orange-500" /> Hot
                              </span>
                            ) : (
                              product.badge
                            )}
                          </motion.span>
                        )}
                        <span className="rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-[8px] font-black uppercase tracking-[0.35em] text-white/90 backdrop-blur-md">
                          {categoryLabel}
                        </span>
                      </div>

                      <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/95 px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.35em] text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.15)] backdrop-blur-md">
                        <span className="inline-flex items-center gap-2">
                          <HiOutlineStar size={13} className="fill-emerald-500 text-emerald-500" />
                          <span className="text-emerald-600">{ratingValue}</span>
                        </span>
                      </div>
                    </div>

                    <div className={`flex flex-1 flex-col justify-between p-4 md:p-5 ${viewMode === "list" ? "lg:p-6" : ""}`}>
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-1.5 text-[7px] font-black uppercase tracking-[0.3em] text-slate-500">
                          <span className="rounded-full bg-slate-100 px-2 py-0.5">
                            {categoryLabel}
                          </span>
                          {product.collection && (
                            <>
                              <span className="h-px w-1 bg-slate-300" />
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600">
                                {product.collection}
                              </span>
                            </>
                          )}
                        </div>

                        <h3 className="line-clamp-2 text-lg font-black leading-tight tracking-tighter text-slate-950 uppercase italic transition-colors duration-300 group-hover:text-emerald-600">
                          {product.name || product.title}
                        </h3>

                        <p className="line-clamp-2 text-xs leading-snug text-slate-600">
                          {description}
                        </p>
                      </div>

                      <div className="mt-3 space-y-3 border-t border-slate-100 pt-3">
                        <div className="flex items-end justify-between gap-2 text-xs">
                          <div className="space-y-0.5">
                            <div className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-400">Price</div>
                            <div className="font-black text-slate-950">
                              {formattedPrice} <span className="text-slate-500">DH</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <HiOutlineStar size={11} className="fill-emerald-500 text-emerald-500" />
                            <span className="font-black text-emerald-600">{ratingValue}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(addItem(product));
                            }}
                            aria-label={`Acquire ${product.name || product.title}`}
                            className="flex-1 inline-flex h-9 items-center justify-center gap-1 rounded-full border border-slate-950 bg-slate-950 px-3 text-[8px] font-black uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500 hover:text-slate-950"
                          >
                            <HiOutlineShoppingBag size={13} aria-hidden="true" />
                            Buy
                          </motion.button>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1"
                          >
                            <Link
                              to={`/product/${detailSlug}`}
                              aria-label={`View details for ${product.name || product.title}`}
                              className="inline-flex w-full h-9 items-center justify-center gap-1 rounded-full border border-emerald-200 bg-emerald-50/50 px-3 text-[8px] font-black uppercase tracking-[0.25em] text-emerald-700 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-100 hover:text-emerald-900"
                            >
                              <HiOutlineEye size={13} aria-hidden="true" />
                              View
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && displayedProducts.length > itemsPerPage && (
          <div className="mt-20 rounded-[2rem] border border-slate-200 bg-slate-50/80 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="text-[9px] font-black uppercase tracking-[0.45em] text-slate-400">
                  Showing {pageStart}-{pageEnd} of {visibleCount}
                </div>
                <div className="text-sm font-medium italic leading-relaxed text-slate-500">
                  Filtered by {formatCategoryLabel(activeCategory)} with {getSortLabel().toLowerCase()} ordering.
                </div>
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionTemplate;

