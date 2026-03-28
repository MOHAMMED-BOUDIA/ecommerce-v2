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

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = () => {
    setProducts(productDataService.getAll());
  };

  const loadCategories = () => {
    setCategories(categoryDataService.getAll());
  };

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
      
      // Force reload of products from localStorage
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

  const stats = useMemo(() => {
    const allProducts = productDataService.getAll();
    return {
      total: allProducts.length,
      lowStock: productDataService.getLowStockProducts().length,
      outOfStock: productDataService.getOutOfStockProducts().length,
    };
  }, [products]);

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tight mb-2">
            Products
          </h1>
          <p className="text-slate-500 font-semibold">
            Manage {stats.total} products
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-600 transition-colors"
        >
          <HiOutlinePlus size={20} />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <p className="text-sm text-slate-500 font-semibold mb-2">Total Products</p>
          <p className="text-3xl font-black text-slate-950">{stats.total}</p>
        </div>
        <div className="bg-white border border-emerald-200 rounded-lg p-6 flex items-start gap-3">
          <HiOutlineExclamationTriangle className="text-amber-500 flex-shrink-0" size={24} />
          <div>
            <p className="text-sm text-slate-500 font-semibold mb-2">Low Stock</p>
            <p className="text-3xl font-black text-amber-600">{stats.lowStock}</p>
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-lg p-6 flex items-start gap-3">
          <HiOutlineCheckCircle className="text-red-500 flex-shrink-0" size={24} />
          <div>
            <p className="text-sm text-slate-500 font-semibold mb-2">Out of Stock</p>
            <p className="text-3xl font-black text-red-600">{stats.outOfStock}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <HiOutlineMagnifyingGlass className="inline mr-2" size={16} />
              Search Products
            </label>
            <input
              type="text"
              placeholder="Search by name, brand, or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <HiOutlineFunnel className="inline mr-2" size={16} />
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full md:w-48 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-48 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="stock-desc">Most Stock</option>
              <option value="stock-asc">Low Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-slate-200 rounded-lg overflow-hidden"
      >
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 font-semibold mb-2">No products found</p>
            <p className="text-sm text-slate-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-slate-700 text-sm">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left font-bold text-slate-700 text-sm">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right font-bold text-slate-700 text-sm">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right font-bold text-slate-700 text-sm">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-center font-bold text-slate-700 text-sm">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-center font-bold text-slate-700 text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.tr
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name || product.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-950 truncate">
                              {product.name || product.title}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-bold text-slate-950">
                          PKR{product.price?.toLocaleString()}
                        </div>
                        {product.discount > 0 && (
                          <div className="text-xs text-emerald-600 font-semibold">
                            -{product.discount}%
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.stock === 0
                              ? 'bg-red-100 text-red-700'
                              : product.stock < 20
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-sm font-bold text-slate-950">
                            ★ {product.rating || 0}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({product.reviews || 0})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <HiOutlinePencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
