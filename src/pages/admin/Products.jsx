import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlinePhoto,
  HiStar,
} from 'react-icons/hi2';
import { productDataService, categoryDataService } from '../../services/productDataService';
import ProductForm from '../../features/admin/components/ProductForm';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  const loadProducts = () => {
    setProducts(productDataService.getAll());
  };

  const loadCategories = () => {
    setCategories(categoryDataService.getAll());
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    let results = productDataService.getAll();

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      results = results.filter(p =>
        (p.name || p.title || '').toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q)
      );
    }

    if (filterCategory) {
      results = results.filter(p => p.category === filterCategory);
    }

    results = productDataService.sort(results, sortBy);
    return results;
  }, [searchTerm, filterCategory, sortBy]);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    try {
      if (editingProduct && editingProduct.id) {
        const result = productDataService.update(editingProduct.id, formData);
        if (!result) {
          alert('Failed to update product');
          return;
        }
      } else {
        productDataService.add(formData);
      }

      setTimeout(() => {
        loadProducts();
        setIsFormOpen(false);
        setEditingProduct(null);
      }, 100);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error saving product: ' + error.message);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productDataService.delete(id);
      loadProducts();
    }
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true,
    }));
  };

  const stats = useMemo(() => {
    const allProducts = productDataService.getAll();
    return {
      total: allProducts.length,
      lowStock: productDataService.getLowStockProducts().length,
      outOfStock: productDataService.getOutOfStockProducts().length,
    };
  }, []);

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tight mb-2">
            Products
          </h1>
          <p className="text-slate-500 font-semibold">
            Manage {stats.total} products across your catalog
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-black uppercase italic tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
        >
          <HiOutlinePlus size={20} />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-colors">
          <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-3">
            Total Products
          </p>
          <p className="text-4xl font-black text-slate-950">{stats.total}</p>
        </div>
        <div className="bg-white border border-amber-200 rounded-2xl p-6 hover:border-amber-300 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-black text-amber-600 uppercase tracking-widest mb-3">
                Low Stock
              </p>
              <p className="text-4xl font-black text-amber-600">{stats.lowStock}</p>
            </div>
            <HiOutlineExclamationTriangle className="text-amber-500 flex-shrink-0 mt-1" size={24} />
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-2xl p-6 hover:border-red-300 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-3">
                Out of Stock
              </p>
              <p className="text-4xl font-black text-red-600">{stats.outOfStock}</p>
            </div>
            <HiOutlineCheckCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
              <HiOutlineMagnifyingGlass className="inline mr-2 text-emerald-500" size={14} />
              Search Products
            </label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search by name, brand, or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 group-hover:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
              <HiOutlineFunnel className="inline mr-2 text-emerald-500" size={14} />
              Category
            </label>
            <div className="relative group">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full md:w-64 appearance-none bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 cursor-pointer group-hover:bg-white"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-emerald-500 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
              Sort By
            </label>
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-64 appearance-none bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 cursor-pointer group-hover:bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="stock-desc">Most Stock</option>
                <option value="stock-asc">Low Stock</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-emerald-500 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
      >
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center">
            <HiOutlinePhoto className="inline mb-4 text-slate-300" size={48} />
            <p className="text-slate-500 font-black text-lg mb-2">No products found</p>
            <p className="text-sm text-slate-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left font-black text-slate-700 text-xs uppercase tracking-widest">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left font-black text-slate-700 text-xs uppercase tracking-widest">
                    SKU
                  </th>
                  <th className="px-6 py-4 text-left font-black text-slate-700 text-xs uppercase tracking-widest">
                    Category
                  </th>
                  <th className="px-6 py-4 text-right font-black text-slate-700 text-xs uppercase tracking-widest">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center font-black text-slate-700 text-xs uppercase tracking-widest">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-center font-black text-slate-700 text-xs uppercase tracking-widest">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-center font-black text-slate-700 text-xs uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.tr
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="hover:bg-slate-50/50 transition-colors duration-200"
                    >
                      {/* Product Name & Image */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            {!imageErrors[product.id] && product.image ? (
                              <img
                                src={product.image}
                                alt={product.name || product.title}
                                onError={() => handleImageError(product.id)}
                                className="w-14 h-14 rounded-lg object-cover border border-slate-200 bg-slate-100"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-slate-100 border border-slate-200">
                                <HiOutlinePhoto className="text-slate-400" size={24} />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-black text-slate-950 truncate text-sm italic">
                              {product.name || product.title}
                            </p>
                            <p className="text-xs text-slate-500 font-semibold mt-1">
                              {product.brand && `${product.brand}`}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-6 py-5">
                        <p className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg w-fit">
                          {product.sku || 'N/A'}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5">
                        <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-black uppercase tracking-widest whitespace-nowrap">
                          {product.category || 'Uncategorized'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5 text-right">
                        <div className="font-black text-slate-950 text-sm">
                          {product.price?.toLocaleString()} DH
                        </div>
                        {product.discount > 0 && (
                          <div className="text-xs text-emerald-600 font-bold mt-1 flex items-center justify-end gap-1">
                            <span>−{product.discount}%</span>
                          </div>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-5">
                        <div className="text-center">
                          <span
                            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest inline-block ${
                              product.stock === 0
                                ? 'bg-red-100 text-red-700'
                                : product.stock < 20
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {product.stock}
                          </span>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-1.5">
                          <HiStar className="text-amber-400" size={16} />
                          <span className="text-sm font-black text-slate-950">
                            {(product.rating || 0).toFixed(1)}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">
                            ({product.reviews || 0})
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-black"
                            title="Edit product"
                          >
                            <HiOutlinePencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-black"
                            title="Delete product"
                          >
                            <HiOutlineTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
