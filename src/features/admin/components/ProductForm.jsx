import React, { useState, useMemo, useCallback } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import ImageUpload from './ImageUpload';
import { categoryDataService } from '../../../services/productDataService';

const ProductForm = ({ product = null, onSubmit, onCancel }) => {
  const categories = useMemo(() => categoryDataService.getAll(), []);
  const [formData, setFormData] = useState(() => ({
    title: product ? (product.title || product.name || '').toString() : '',
    name: product ? (product.name || product.title || '').toString() : '',
    brand: product ? (product.brand || '').toString() : '',
    category: product ? (product.category || 'Electronics').toString() : 'Electronics',
    subcategory: product ? (product.subcategory || '').toString() : '',
    price: product?.price ? parseFloat(product.price).toString() : '',
    oldPrice: product?.oldPrice ? parseFloat(product.oldPrice).toString() : '',
    discount: product?.discount ? parseFloat(product.discount).toString() : '',
    stock: product?.stock !== undefined ? parseInt(product.stock).toString() : '',
    sku: product ? (product.sku || '').toString() : '',
    shortDescription: product ? (product.shortDescription || '').toString() : '',
    fullDescription: product ? (product.fullDescription || '').toString() : '',
    rating: product?.rating ? parseFloat(product.rating).toString() : '',
    reviews: product?.reviews ? parseInt(product.reviews).toString() : '',
    tags: product && Array.isArray(product.tags) ? product.tags.join(', ') : '',
    image: product ? (product.image || '').toString() : '',
    isFeatured: product ? Boolean(product.isFeatured) : false,
    isNew: product ? Boolean(product.isNew) : false,
    isBestSeller: product ? Boolean(product.isBestSeller) : false,
  }));
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (!formData) return;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageSelect = useCallback((imageData) => {
    setFormData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        image: imageData || '',
      };
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) return;
    setIsLoading(true);

    try {
      // Validation
      if (!formData.title?.trim()) {
        alert('Please enter a product title');
        setIsLoading(false);
        return;
      }

      if (!formData.price || parseFloat(formData.price) <= 0) {
        alert('Please enter a valid price');
        setIsLoading(false);
        return;
      }

      const submitData = {
        ...formData,
        title: formData.title.trim(),
        name: (formData.name?.trim() || formData.title.trim()),
        brand: formData.brand.trim(),
        category: formData.category,
        subcategory: formData.subcategory.trim(),
        price: parseFloat(formData.price.toString().replace(/[^0-9.-]/g, '')),
        oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice.toString().replace(/[^0-9.-]/g, '')) : parseFloat(formData.price.toString().replace(/[^0-9.-]/g, '')),
        discount: formData.discount ? parseFloat(formData.discount.toString().replace(/[^0-9.-]/g, '')) : 0,
        stock: formData.stock ? parseInt(formData.stock.toString()) : 0,
        sku: formData.sku.trim(),
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim(),
        rating: formData.rating ? parseFloat(formData.rating.toString()) : 0,
        reviews: formData.reviews ? parseInt(formData.reviews.toString()) : 0,
        tags: formData.tags
          .split(',')
          .map(t => t.trim())
          .filter(t => t && t.length > 0),
        image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        isFeatured: Boolean(formData.isFeatured),
        isNew: Boolean(formData.isNew),
        isBestSeller: Boolean(formData.isBestSeller),
      };

      onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error saving product: ' + error.message);
      setIsLoading(false);
    }
  };

  if (!formData) {
    return (
      <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-900 font-bold">Initializing Form...</p>
        </div>
      </div>
    );
  }

  const categoryNames = categories.map(c => c.name);

  return (
    <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-black text-slate-950">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onCancel}
            type="button"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <HiOutlineXMark size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary Columns */}
            <div className="md:col-span-2 space-y-8">
              {/* Basic Details */}
              <section>
                <h3 className="text-lg font-bold text-slate-950 mb-4 border-b pb-2">Basic Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Product Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      >
                        {categoryNames.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pricing & Stock */}
              <section>
                <h3 className="text-lg font-bold text-slate-950 mb-4 border-b pb-2">Pricing & Inventory</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Price (PKR) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Old Price</label>
                    <input
                      type="number"
                      name="oldPrice"
                      value={formData.oldPrice}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Stock Level *</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Descriptions */}
              <section>
                <h3 className="text-lg font-bold text-slate-950 mb-4 border-b pb-2">Descriptions</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Short Description</label>
                    <textarea
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg resize-none text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Description</label>
                    <textarea
                      name="fullDescription"
                      value={formData.fullDescription}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg resize-none text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Image Upload */}
              <section>
                <h3 className="text-lg font-bold text-slate-950 mb-4 border-b pb-2">Product Image</h3>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <ImageUpload
                    onImageSelect={handleImageSelect}
                    currentImage={formData.image}
                  />
                </div>
              </section>

              {/* Status Flags */}
              <section>
                <h3 className="text-lg font-bold text-slate-950 mb-4 border-b pb-2">Visibility & Status</h3>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                  {['isFeatured', 'isNew', 'isBestSeller'].map(flag => (
                    <label key={flag} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name={flag}
                        checked={formData[flag]}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-slate-300 text-emerald-500 accent-emerald-500"
                      />
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-950 transition-colors uppercase tracking-wider">
                        {flag.replace('is', '').replace(/([A-Z])/g, ' ').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Meta Tags */}
              <section>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tags (Comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="electronic, mobile, new"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </section>
            </div>
          </div>

          {/* Form Actions */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 -mx-6 -mb-6 flex justify-end gap-3 z-10">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                product ? 'Update Product' : 'Create Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
