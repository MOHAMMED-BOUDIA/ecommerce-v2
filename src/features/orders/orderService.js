// Local storage key for order data
const ORDERS_STORAGE_KEY = 'vanguard_orders';

// Initial dummy order data for demonstration
const initialOrders = [
  {
    id: 'ORD-1001',
    userId: 1,
    customerName: 'Kira Yamato',
    email: 'kira@example.com',
    date: '2024-03-20T10:30:00Z',
    status: 'Delivered',
    total: 349.97,
    items: [
      { id: 1, name: 'Vanguard Tactical Vest', quantity: 1, price: 149.99 },
      { id: 4, name: 'Combat Gloves Pro', quantity: 2, price: 99.99 }
    ],
    shippingAddress: '123 Pilot St, Heliopolis, Orb',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK99887766'
  },
  {
    id: 'ORD-1002',
    userId: 2,
    customerName: 'Athrun Zala',
    email: 'athrun@example.com',
    date: '2024-03-25T14:15:00Z',
    status: 'Processing',
    total: 89.99,
    items: [
      { id: 3, name: 'Elite Training Pants', quantity: 1, price: 89.99 }
    ],
    shippingAddress: '456 PLANT Ave, ZAFT City',
    paymentMethod: 'PayPal',
    trackingNumber: ''
  },
  {
    id: 'ORD-1003',
    userId: 3,
    customerName: 'Lacus Clyne',
    email: 'lacus@example.com',
    date: '2024-03-27T09:45:00Z',
    status: 'Shipped',
    total: 450.00,
    items: [
      { id: 10, name: 'Stealth Bomber Jacket', quantity: 2, price: 225.00 }
    ],
    shippingAddress: '789 Songbird Lane, Freedom Square',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK11223344'
  },
  {
    id: 'ORD-1004',
    userId: 1,
    customerName: 'Kira Yamato',
    email: 'kira@example.com',
    date: '2024-03-28T08:20:00Z',
    status: 'Pending',
    total: 120.50,
    items: [
      { id: 7, name: 'Vanguard Cap', quantity: 3, price: 40.17 }
    ],
    shippingAddress: '123 Pilot St, Heliopolis, Orb',
    paymentMethod: 'Credit Card',
    trackingNumber: ''
  }
];

// Helper to get orders from localStorage
const getStoredOrders = () => {
  const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(initialOrders));
    return initialOrders;
  }
  return JSON.parse(stored);
};

// Helper to save orders to localStorage
const saveStoredOrders = (orders) => {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

export const orderService = {
  // Get all orders
  getAll: () => {
    return getStoredOrders();
  },

  // Get order by ID
  getById: (id) => {
    const orders = getStoredOrders();
    return orders.find(order => order.id === id);
  },

  // Get orders by status
  getByStatus: (status) => {
    const orders = getStoredOrders();
    if (status === 'All') return orders;
    return orders.filter(order => order.status.toLowerCase() === status.toLowerCase());
  },

  // Get customer orders
  getByUserId: (userId) => {
    const orders = getStoredOrders();
    return orders.filter(order => order.userId === userId);
  },

  // Update order status
  updateStatus: (id, newStatus) => {
    const orders = getStoredOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index].status = newStatus;
      saveStoredOrders(orders);
      return orders[index];
    }
    return null;
  },

  // Delete an order
  delete: (id) => {
    const orders = getStoredOrders();
    const filtered = orders.filter(o => o.id !== id);
    saveStoredOrders(filtered);
    return true;
  },

  // Add a new order (from checkout)
  add: (orderData) => {
    const orders = getStoredOrders();
    const newOrder = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      status: 'Pending'
    };
    orders.unshift(newOrder); // Add to beginning
    saveStoredOrders(orders);
    return newOrder;
  }
};

export default orderService;
