import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineMagnifyingGlass,
} from 'react-icons/hi2';
import { adminOrderService } from '../../services/adminService';

const AdminOrders = () => {
  const orders = adminOrderService.getAll();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tight mb-2">
          Orders
        </h1>
        <p className="text-slate-500 font-semibold">Manage customer orders</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">Email</th>
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">Items</th>
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">Total</th>
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">Status</th>
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-black text-emerald-600">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{order.email}</td>
                  <td className="px-6 py-4 text-slate-600">{order.items}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">${order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="font-semibold">No orders found</p>
        </div>
      )}

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
      >
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-slate-600 text-sm font-semibold mb-2">Total Orders</p>
          <p className="text-4xl font-black text-emerald-600">{filteredOrders.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-slate-600 text-sm font-semibold mb-2">Total Revenue</p>
          <p className="text-4xl font-black text-blue-600">
            ${filteredOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-slate-600 text-sm font-semibold mb-2">Pending Orders</p>
          <p className="text-4xl font-black text-amber-600">
            {filteredOrders.filter((o) => o.status === 'Pending').length}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOrders;
