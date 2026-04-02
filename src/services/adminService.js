import { products as initialProducts } from '../data/products';
import { categories as initialCategories } from '../data/categories';
import { productDataService, categoryDataService } from './productDataService';

// ===== PRODUCTS - Now using productDataService as source of truth =====
export const adminProductService = {
  getAll: () => productDataService.getAll(),
  getById: (id) => productDataService.getById(id),
  add: (product) => productDataService.add(product),
  update: (id, updates) => productDataService.update(id, updates),
  delete: (id) => productDataService.delete(id),
  getTotalCount: () => productDataService.getTotalCount(),
  getTotalRevenue: () => productDataService.getTotalValue(),
  getTotalValue: () => productDataService.getTotalValue(),
  getLowStockProducts: () => productDataService.getLowStockProducts(),
  getOutOfStockProducts: () => productDataService.getOutOfStockProducts(),
};

// ===== CATEGORIES =====
export const adminCategoryService = {
  getAll: () => categoryDataService.getAll(),
  getById: (id) => categoryDataService.getById(id),
  add: (category) => categoryDataService.add(category),
  update: (id, updates) => categoryDataService.update(id, updates),
  delete: (id) => categoryDataService.delete(id),
};

// ===== ORDERS - Real data from orderService =====
export const adminOrderService = {
  getAll: () => {
    try {
      const { orderService } = require('../features/orders/orderService');
      return orderService.getAll();
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  getTotalCount: () => adminOrderService.getAll().length,
  
  getTotalRevenue: () => {
    return adminOrderService.getAll().reduce((sum, order) => sum + (order.total || 0), 0);
  },
  
  getRecentOrders: (limit = 5) => {
    return adminOrderService.getAll()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  },
};

// ===== USERS - Real data from localStorage =====
export const adminUserService = {
  getAll: () => {
    try {
      const stored = localStorage.getItem('vanguard_users');
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.error('Error reading users from storage:', error);
    }
    return [];
  },

  addUser: (user) => {
    const users = adminUserService.getAll();
    const newUser = {
      id: `USER-${Date.now()}`,
      ...user,
      joinDate: new Date().toISOString().split('T')[0],
    };
    users.push(newUser);
    localStorage.setItem('vanguard_users', JSON.stringify(users));
    return newUser;
  },

  getTotalCount: () => adminUserService.getAll().length,
  
  getActiveUsers: () => {
    return adminUserService.getAll().filter(user => user.status === 'Active');
  },
};
