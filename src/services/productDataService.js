import { products as initialProducts } from '../data/products';
import { categories as initialCategories } from '../data/categories';

const PRODUCTS_STORAGE_KEY = 'vanguard_products';
const CATEGORIES_STORAGE_KEY = 'vanguard_categories';

const getStoredProducts = () => {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialProducts;
  } catch (error) {
    console.error('Error reading products from storage:', error);
    return initialProducts;
  }
};

const getStoredCategories = () => {
  try {
    const stored = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialCategories;
  } catch (error) {
    console.error('Error reading categories from storage:', error);
    return initialCategories;
  }
};

const saveProducts = (products) => {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products to storage:', error);
  }
};

const saveCategories = (categories) => {
  try {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories to storage:', error);
  }
};

// ===== PRODUCTS SERVICE =====
export const productDataService = {
  getAll: () => {
    return getStoredProducts();
  },

  getById: (id) => {
    return productDataService.getAll().find(p => p.id === parseInt(id));
  },

  getBySlug: (slug) => {
    return productDataService.getAll().find(p => p.slug === slug);
  },

  getByCategory: (category) => {
    return productDataService.getAll().filter(p => p.category?.toLowerCase() === category?.toLowerCase());
  },

  add: (product) => {
    const allProducts = productDataService.getAll();
    const newId = Math.max(...allProducts.map(p => p.id || 0), 0) + 1;
    const slug = (product.title || product.name || 'product')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const newProduct = {
      id: newId,
      name: product.name || product.title,
      title: product.title || product.name,
      slug: slug,
      brand: product.brand || '',
      category: product.category || 'Electronics',
      subcategory: product.subcategory || '',
      price: parseFloat(product.price) || 0,
      oldPrice: parseFloat(product.oldPrice) || parseFloat(product.price) || 0,
      discount: product.discount || 0,
      stock: parseInt(product.stock) || 0,
      sku: product.sku || `SKU-${newId}`,
      shortDescription: product.shortDescription || '',
      fullDescription: product.fullDescription || '',
      rating: parseFloat(product.rating) || 0,
      reviews: parseInt(product.reviews) || 0,
      tags: product.tags || [],
      image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      gallery: product.gallery || [product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
      isFeatured: product.isFeatured || false,
      isNew: product.isNew || false,
      isBestSeller: product.isBestSeller || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    allProducts.push(newProduct);
    saveProducts(allProducts);
    return newProduct;
  },

  update: (id, updates) => {
    const allProducts = productDataService.getAll();
    const index = allProducts.findIndex(p => p.id === parseInt(id));
    
    if (index !== -1) {
      const updatedProduct = {
        ...allProducts[index],
        ...updates,
        id: allProducts[index].id,
        name: updates.name || updates.title || allProducts[index].name,
        title: updates.title || updates.name || allProducts[index].title,
        price: parseFloat(updates.price) !== undefined ? parseFloat(updates.price) : allProducts[index].price,
        oldPrice: parseFloat(updates.oldPrice) !== undefined ? parseFloat(updates.oldPrice) : allProducts[index].oldPrice,
        discount: parseFloat(updates.discount) !== undefined ? parseFloat(updates.discount) : (allProducts[index].discount || 0),
        stock: parseInt(updates.stock) !== undefined ? parseInt(updates.stock) : allProducts[index].stock,
        rating: parseFloat(updates.rating) !== undefined ? parseFloat(updates.rating) : (allProducts[index].rating || 0),
        reviews: parseInt(updates.reviews) !== undefined ? parseInt(updates.reviews) : (allProducts[index].reviews || 0),
        tags: Array.isArray(updates.tags) ? updates.tags : (allProducts[index].tags || []),
        updatedAt: new Date().toISOString(),
      };

      if (updates.title || updates.name) {
        const titleStr = updates.title || updates.name;
        updatedProduct.slug = titleStr
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }

      allProducts[index] = updatedProduct;
      saveProducts(allProducts);
      return updatedProduct;
    }

    return null;
  },

  delete: (id) => {
    const allProducts = productDataService.getAll();
    const filtered = allProducts.filter(p => p.id !== parseInt(id));
    saveProducts(filtered);
    return true;
  },

  search: (query, filters = {}) => {
    let results = productDataService.getAll();

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(p => {
        const title = (p.title || p.name || '').toLowerCase();
        const brand = (p.brand || '').toLowerCase();
        const category = (p.category || '').toLowerCase();
        return title.includes(q) || brand.includes(q) || category.includes(q);
      });
    }

    if (filters.category) {
      results = results.filter(p => p.category === filters.category);
    }

    if (filters.brand) {
      results = results.filter(p => p.brand === filters.brand);
    }

    return results;
  },

  sort: (products, sortBy = 'newest') => {
    const sorted = [...products];
    switch (sortBy) {
      case 'newest':
        return sorted.reverse();
      case 'oldest':
        return sorted;
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'stock-desc':
        return sorted.sort((a, b) => (b.stock || 0) - (a.stock || 0));
      case 'stock-asc':
        return sorted.sort((a, b) => (a.stock || 0) - (b.stock || 0));
      default:
        return sorted;
    }
  },

  getCategories: () => {
    const all = productDataService.getAll();
    const cats = new Set(all.map(p => p.category));
    return Array.from(cats).sort();
  },

  getBrands: () => {
    const all = productDataService.getAll();
    const brands = new Set(all.map(p => p.brand).filter(Boolean));
    return Array.from(brands).sort();
  },

  getTotalCount: () => productDataService.getAll().length,

  getTotalValue: () => {
    return productDataService.getAll().reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
  },

  getLowStockProducts: (threshold = 20) => {
    return productDataService.getAll().filter(p => (p.stock || 0) < threshold && (p.stock || 0) > 0);
  },

  getOutOfStockProducts: () => {
    return productDataService.getAll().filter(p => (p.stock || 0) === 0);
  },
};

// ===== CATEGORIES SERVICE =====
export const categoryDataService = {
  getAll: () => {
    return getStoredCategories();
  },

  getById: (id) => {
    return categoryDataService.getAll().find(c => c.id === parseInt(id));
  },

  getBySlug: (slug) => {
    return categoryDataService.getAll().find(c => c.slug === slug);
  },

  add: (categoryData) => {
    const categories = getStoredCategories();
    const newId = Math.max(...categories.map(c => c.id || 0), 0) + 1;
    
    const newCategory = {
      id: newId,
      name: categoryData.name,
      slug: categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      image: categoryData.image || 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80',
      description: categoryData.description || '',
    };
    
    categories.push(newCategory);
    saveCategories(categories);
    return newCategory;
  },

  update: (id, updates) => {
    const categories = getStoredCategories();
    const index = categories.findIndex(c => c.id === parseInt(id));
    
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates, id: categories[index].id };
      saveCategories(categories);
      return categories[index];
    }
    return null;
  },

  delete: (id) => {
    const categories = getStoredCategories();
    const filtered = categories.filter(c => c.id !== parseInt(id));
    saveCategories(filtered);
    return true;
  },

  getWithProducts: () => {
    const categories = getStoredCategories();
    const products = getStoredProducts();
    
    return categories.map(cat => ({
      ...cat,
      productCount: products.filter(p => p.category === cat.name).length,
      products: products.filter(p => p.category === cat.name),
    }));
  },

  getProductsByCategory: (categoryName) => {
    const products = getStoredProducts();
    return products.filter(p => p.category === categoryName);
  },
};

export default {
  products: productDataService,
  categories: categoryDataService,
};
