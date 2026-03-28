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

// ===== ORDERS =====
export const adminOrderService = {
  getAll: () => {
    try {
      const stored = localStorage.getItem('admin_orders');
      if (stored) return JSON.parse(stored);
    } catch {
      // Continue with mock data on error
    }
    
    // Mock orders data
    return [
      {
        id: 'ORD-001',
        customer: 'John Doe',
        email: 'john@example.com',
        total: 2500,
        status: 'Completed',
        items: 3,
        date: '2026-03-20',
      },
      {
        id: 'ORD-002',
        customer: 'Jane Smith',
        email: 'jane@example.com',
        total: 5800,
        status: 'Pending',
        items: 5,
        date: '2026-03-25',
      },
      {
        id: 'ORD-003',
        customer: 'Alex Johnson',
        email: 'alex@example.com',
        total: 1200,
        status: 'Shipped',
        items: 2,
        date: '2026-03-22',
      },
      {
        id: 'ORD-004',
        customer: 'Mike Wilson',
        email: 'mike@example.com',
        total: 3400,
        status: 'Completed',
        items: 4,
        date: '2026-03-18',
      },
    ];
  },

  getTotalCount: () => adminOrderService.getAll().length,
  getTotalRevenue: () => {
    return adminOrderService.getAll().reduce((sum, o) => sum + o.total, 0);
  },
};

// ===== USERS =====
export const adminUserService = {
  getAll: () => {
    try {
      const stored = localStorage.getItem('admin_users');
      if (stored) return JSON.parse(stored);
    } catch {
      // Continue with mock data on error
    }

    // Mock users data
    return [
      {
        id: 'ADMIN-001',
        name: 'Admin User',
        email: 'admin@vanguard.io',
        role: 'admin',
        status: 'Active',
        joinDate: '2025-01-01',
      },
      {
        id: 'USER-001',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        status: 'Active',
        joinDate: '2026-02-15',
      },
      {
        id: 'USER-002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        status: 'Active',
        joinDate: '2026-03-01',
      },
      {
        id: 'USER-003',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'user',
        status: 'Inactive',
        joinDate: '2026-01-20',
      },
    ];
  },

  getTotalCount: () => adminUserService.getAll().length,
};
