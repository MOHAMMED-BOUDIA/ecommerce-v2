import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineAdjustments, HiOutlineScale, HiOutlineViewGrid, 
  HiOutlineViewList, HiOutlineSearch, HiOutlineX, HiOutlineShoppingBag 
} from 'react-icons/hi';
import SectionTitle from '../../../components/ui/SectionTitle';
import RatingStars from '../../../components/ui/RatingStars';
import PriceTag from '../../../components/ui/PriceTag';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import EmptyState from '../../../components/ui/EmptyState';
import { products, categories } from '../../../data/products';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return b.isNew - a.isNew;
        return a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1;
      });
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-16">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
         <div>
            <SectionTitle title="THE SHOP." subtitle="Refinement defined" align="left" className="mb-0" />
            <p className="text-slate-500 font-medium text-lg mt-4 max-w-xl">
               Discover our permanent collection of high-performance goods and essential lifestyle objects.
            </p>
         </div>
         <div className="flex flex-wrap items-center gap-4">
            <div className="w-full sm:w-80">
               <Input placeholder="Search collection..." icon={<HiOutlineSearch />} className="rounded-2xl" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Button variant="outline" className="lg:hidden h-14 w-14 p-0 rounded-2xl border-slate-200" onClick={() => setShowFilters(true)}>
               <HiOutlineAdjustments size={24} />
            </Button>
         </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-16">
         <aside className="hidden lg:block w-72 flex-shrink-0 space-y-12">
            <div className="space-y-6">
               <h4 className="text-xs font-black text-slate-950 uppercase tracking-[0.3em]">Categories</h4>
               <div className="flex flex-col gap-2">
                  <button onClick={() => setSelectedCategory('All Products')} className={`text-left font-black py-2 px-4 rounded-xl transition-all duration-300 ${selectedCategory === 'All Products' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}>All Products</button>
                  {categories.map(cat => (
                     <button key={cat.id} onClick={() => setSelectedCategory(cat.name)} className={`text-left font-bold py-2 px-4 rounded-xl transition-all duration-300 ${selectedCategory === cat.name ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}>{cat.name}</button>
                  ))}
               </div>
            </div>
            <div className="space-y-4">
               <h4 className="text-xs font-black text-slate-950 uppercase tracking-[0.3em]">Max Price: ${priceRange[1]}</h4>
               <input type="range" min="0" max="2000" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none" />
               <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest"><span>$0</span><span>$2,000</span></div>
            </div>
            <div className="space-y-6">
               <h4 className="text-xs font-black text-slate-950 uppercase tracking-[0.3em]">Sort By</h4>
               <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 outline-none">
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest Drops</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
               </select>
            </div>
         </aside>
         <main className="flex-1">
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
               <p className="text-slate-400 font-bold text-sm tracking-tight uppercase">Showing <span className="text-slate-950">{filteredProducts.length}</span> results</p>
               <div className="flex items-center gap-4">
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-slate-950' : 'text-slate-400 hover:text-slate-600'}`}><HiOutlineViewGrid size={22} /></button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-slate-950' : 'text-slate-400 hover:text-slate-600'}`}><HiOutlineViewList size={22} /></button>
               </div>
            </div>
            <AnimatePresence mode="wait">
               {filteredProducts.length > 0 ? (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-12" : "flex flex-col gap-8"}>
                     {filteredProducts.map((product) => (
                        <motion.div key={product.id} layout whileHover={{ y: -8 }} className={`group relative bg-white border border-slate-100 rounded-[3rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}`}>
                           <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-1/3' : 'aspect-square'} bg-slate-50`}>
                              <img src={product.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={product.name} />
                              <div className="absolute top-6 left-6 flex flex-col gap-2">
                                 {product.isNew && <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-lg shadow-lg">NEW DROP</span>}
                                 {product.discount > 0 && <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black rounded-lg shadow-lg">-{product.discount}%</span>}
                              </div>
                           </div>
                           <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
                              <div className="space-y-4">
                                 <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">{product.category}</span>
                                    <RatingStars rating={product.rating} showText={false} size="sm" />
                                 </div>
                                 <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter group-hover:text-emerald-600 transition-colors uppercase">{product.name}</h3>
                                 <PriceTag amount={product.price} oldAmount={product.oldPrice} size="lg" />
                                 {viewMode === 'list' && <p className="text-slate-500 font-medium line-clamp-2 pt-2">Our signature {product.name} follows a philosophy of minimalism and extreme performance.</p>}
                              </div>
                              <div className="flex items-center gap-4 pt-8 shrink-0">
                                 <Button variant="primary" icon={<HiOutlineShoppingBag />} className="flex-1 h-14 rounded-2xl">Add to Cart</Button>
                                 <Button variant="outline" className="h-14 w-14 p-0 rounded-2xl border-slate-100 hover:border-emerald-600 transition-colors"><HiOutlineSearch size={20} className="text-slate-400 group-hover:text-emerald-600" /></Button>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </motion.div>
               ) : (
                  <EmptyState title="Nothing Found" subtitle="We couldn't find any products matching your selection." actionText="Clear filters" onAction={() => { setSelectedCategory('All Products'); setSearchTerm(''); setPriceRange([0, 2000]); }} />
               )}
            </AnimatePresence>
         </main>
      </div>
      <AnimatePresence>
         {showFilters && (
            <>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[100]" />
               <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[101] shadow-2xl p-10 overflow-y-auto">
                  <div className="flex items-center justify-between mb-12">
                     <h2 className="text-3xl font-black tracking-tighter">FILTER</h2>
                     <button onClick={() => setShowFilters(false)} className="p-3 bg-slate-50 rounded-2xl text-slate-400"><HiOutlineX size={24} /></button>
                  </div>
                  <div className="space-y-16">
                     <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em]">Select Category</h4>
                        <div className="grid grid-cols-2 gap-3">
                           {['All Products', ...categories.map(c => c.name)].map((cat, i) => <button key={i} onClick={() => setSelectedCategory(cat)} className={`py-4 px-2 rounded-2xl font-bold transition-all ${selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-500'}`}>{cat}</button>)}
                        </div>
                     </div>
                     <Button variant="primary" className="w-full h-16 rounded-2xl text-lg font-black" onClick={() => setShowFilters(false)}>Show Results</Button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
