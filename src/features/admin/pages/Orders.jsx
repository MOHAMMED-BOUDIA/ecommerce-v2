import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineSearch, 
  HiOutlineFilter, 
  HiOutlineChevronDown, 
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineTruck,
  HiOutlineXCircle,
  HiOutlinePrinter,
  HiOutlineDownload,
  HiOutlineExternalLink
} from 'react-icons/hi';
import orderService from '../../orders/orderService';
import { formatPrice } from '../../../utils/formatPrice';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status options for filtering and updating
  const statusOptions = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, searchTerm, statusFilter]);

  const loadOrders = () => {
    setLoading(true);
    try {
      const data = orderService.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...orders];

    // Filter by status
    if (statusFilter !== 'All') {
      result = result.filter(order => order.status === statusFilter);
    }

    // Search by ID or Customer Name
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(lowerSearch) || 
        order.customerName.toLowerCase().includes(lowerSearch) ||
        order.email.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredOrders(result);
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updated = orderService.updateStatus(id, newStatus);
    if (updated) {
      setOrders(orders.map(o => o.id === id ? updated : o));
      if (selectedOrder?.id === id) {
        setSelectedOrder(updated);
      }
    }
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order record? This cannot be undone.')) {
      orderService.delete(id);
      setOrders(orders.filter(o => o.id !== id));
      if (selectedOrder?.id === id) {
        setIsModalOpen(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Shipped': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <HiOutlineClock className="w-4 h-4" />;
      case 'Processing': return <HiOutlineFilter className="w-4 h-4" />;
      case 'Shipped': return <HiOutlineTruck className="w-4 h-4" />;
      case 'Delivered': return <HiOutlineCheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <HiOutlineXCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage customer orders and shipments</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {}}
          >
            <HiOutlineDownload className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: orders.length, color: 'text-blue-600' },
          { label: 'Pending', value: orders.filter(o => o.status === 'Pending').length, color: 'text-yellow-600' },
          { label: 'Shipped/Processing', value: orders.filter(o => ['Shipped', 'Processing'].includes(o.status)).length, color: 'text-purple-600' },
          { label: 'Revenue', value: formatPrice(orders.filter(o => o.status !== 'Cancelled').reduce((acc, o) => acc + o.total, 0)), color: 'text-green-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Order ID, customer, email..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <HiOutlineFilter className="w-4 h-4" /> Filter:
            </span>
            <div className="flex bg-gray-100 dark:bg-gray-900/50 p-1 rounded-lg overflow-x-auto whitespace-nowrap scrollbar-hide">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    statusFilter === status
                      ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="px-6 py-4">
                      <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                    </td>
                  </tr>
                ))
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-medium text-gray-900 dark:text-white">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{order.customerName}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">{order.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <HiOutlineEye className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete Order"
                        >
                          <HiOutlineTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No orders found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50">
                <div>
                  <h3 className="text-xl font-bold dark:text-white">Order Details</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Order ID: {selectedOrder.id}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all text-gray-500 dark:text-gray-400"
                >
                  <HiOutlineXCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Info & Address */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Customer Information</h4>
                      <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                        <p className="font-bold text-gray-900 dark:text-white">{selectedOrder.customerName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{selectedOrder.email}</p>
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-400 mb-1">Shipping Address</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{selectedOrder.shippingAddress}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Payment & Tracking</h4>
                      <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Method</span>
                          <span className="font-medium dark:text-white">{selectedOrder.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Tracking</span>
                          <span className="font-medium dark:text-white">{selectedOrder.trackingNumber || 'Not available'}</span>
                        </div>
                        {selectedOrder.status === 'Shipped' && (
                          <div className="pt-2">
                             <input 
                              type="text" 
                              placeholder="Update Tracking#" 
                              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded focus:ring-1 focus:ring-primary outline-none dark:text-white"
                              defaultValue={selectedOrder.trackingNumber}
                             />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Order Items */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Order Items</h4>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{item.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/10 dark:border-primary/20 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                          <span className="font-medium dark:text-white">{formatPrice(selectedOrder.total)}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-primary/10">
                          <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                          <span className="font-medium dark:text-white">Free</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-1">
                          <span className="text-gray-900 dark:text-white text-base">Total</span>
                          <span className="text-primary">{formatPrice(selectedOrder.total)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Update Order Status</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {statusOptions.filter(s => s !== 'All').map((status) => (
                          <button
                            key={status}
                            onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                              selectedOrder.status === status
                                ? 'bg-primary border-primary text-white'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary/50'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-3 justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <HiOutlinePrinter className="w-4 h-4" />
                    Print Invoice
                  </button>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all text-sm"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
