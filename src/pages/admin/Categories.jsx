import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // motion is used in animations below
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineXMark,
  HiOutlineShoppingBag,
  HiOutlinePhoto,
} from 'react-icons/hi2';
import { categoryDataService, productDataService } from '../../services/productDataService';
import ProductForm from '../../features/admin/components/ProductForm';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [productImageErrors, setProductImageErrors] = useState({});

  const loadCategories = () => {
    const allCats = categoryDataService.getAll();
    const withCounts = allCats.map(cat => ({
      ...cat,
      productCount: productDataService.getByCategory(cat.name).length,
    }));
    setCategories(withCounts);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingId(category.id);
      setFormData({ 
        name: category.name, 
        description: category.description,
        image: category.image || '',
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      categoryDataService.update(editingId, formData);
    } else {
      categoryDataService.add(formData);
    }

    loadCategories();
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      categoryDataService.delete(id);
      loadCategories();
      setSelectedCategory(null);
    }
  };

  const getProductsByCategory = (categoryName) => {
    return productDataService.getByCategory(categoryName);
  };

  const handleEditProductFromCategory = (product) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };

  const handleProductFormSubmit = (formData) => {
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

      // Force reload of categories to update product counts
      setTimeout(() => {
        loadCategories();
        setIsProductFormOpen(false);
        setEditingProduct(null);
      }, 100);
    } catch (error) {
      console.error('Error submitting product form:', error);
      alert('Error saving product: ' + error.message);
    }
  };

  const handleProductFormCancel = () => {
    setIsProductFormOpen(false);
    setEditingProduct(null);
  };

  const handleCategoryImageError = (categoryId) => {
    setImageErrors(prev => ({
      ...prev,
      [categoryId]: true,
    }));
  };

  const handleProductImageError = (productId) => {
    setProductImageErrors(prev => ({
      ...prev,
      [productId]: true,
    }));
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tight mb-2">
            Categories
          </h1>
          <p className="text-slate-500 font-semibold">
            Manage product categories ({categories.length})
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-600 transition-colors"
        >
          <HiOutlinePlus size={20} />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedCategory(selectedCategory?.id === category.id ? null : category)}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="mb-4">
                <div className="w-full h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-slate-200">
                  {!imageErrors[category.id] && category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      onError={() => handleCategoryImageError(category.id)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <HiOutlinePhoto className="text-slate-400" size={32} />
                      <span className="text-xs text-slate-400 font-medium">No image</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-black text-slate-950 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {category.description}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-4 p-2 bg-emerald-50 rounded-lg">
                <HiOutlineShoppingBag size={16} className="text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">
                  {category.productCount} Products
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(category);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold"
                >
                  <HiOutlinePencil size={16} />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(category.id);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold"
                >
                  <HiOutlineTrash size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Category Products Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-950">
                  {selectedCategory.name} Products
                </h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <HiOutlineXMark size={24} />
                </button>
              </div>

              <div className="p-6">
                {getProductsByCategory(selectedCategory.name).length === 0 ? (
                  <p className="text-center text-slate-500 py-8">
                    No products in this category yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {getProductsByCategory(selectedCategory.name).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleEditProductFromCategory(product)}
                        className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-emerald-400 transition-all cursor-pointer group"
                      >
                        <div className="w-16 h-16 bg-slate-100 rounded flex items-center justify-center flex-shrink-0 border border-slate-200">
                          {!productImageErrors[product.id] && product.image ? (
                            <img
                              src={product.image}
                              alt={product.name || product.title}
                              onError={() => handleProductImageError(product.id)}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <HiOutlinePhoto className="text-slate-400" size={24} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-950 truncate group-hover:text-emerald-600 transition-colors">
                            {product.name || product.title}
                          </h4>
                          <p className="text-sm text-slate-500">
                            PKR {product.price?.toLocaleString()} 
                            {product.stock > 0 ? ` • ${product.stock} in stock` : ' • Out of stock'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-950">
                            ★ {product.rating || 0}
                          </p>
                          <p className="text-xs text-slate-500">
                            {product.reviews || 0} reviews
                          </p>
                        </div>
                        <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <HiOutlinePencil size={18} className="text-emerald-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full"
            >
              <div className="border-b border-slate-200 p-6 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-950">
                  {editingId ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <HiOutlineXMark size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter category name"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter category description"
                    rows="3"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img 
                        src={formData.image} 
                        alt="Category preview"
                        className="h-20 rounded border border-slate-200 object-cover"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    {editingId ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Form Modal */}
      <AnimatePresence>
        {isProductFormOpen && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleProductFormSubmit}
            onCancel={handleProductFormCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCategories;
