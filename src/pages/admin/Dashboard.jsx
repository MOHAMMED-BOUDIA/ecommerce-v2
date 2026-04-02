import React, { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  HiOutlineShoppingBag,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
} from 'react-icons/hi2';
import { adminProductService, adminOrderService, adminUserService } from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const auth = useSelector(state => state.auth);
  const orders = useSelector(state => state.orders?.orders || []);

  // Recalculate stats whenever data changes
  useEffect(() => {
    const totalProducts = adminProductService.getTotalCount();
    const totalOrders = adminOrderService.getTotalCount();
    const totalUsers = adminUserService.getTotalCount();
    const totalRevenue = adminOrderService.getTotalRevenue();

    setStats([
      {
        title: 'Total Products',
        value: totalProducts,
        icon: HiOutlineShoppingBag,
        color: 'emerald',
        bg: 'bg-emerald-50',
        textColor: 'text-emerald-600',
      },
      {
        title: 'Total Orders',
        value: totalOrders,
        icon: HiOutlineClipboardDocumentList,
        color: 'blue',
        bg: 'bg-blue-50',
        textColor: 'text-blue-600',
      },
      {
        title: 'Total Users',
        value: totalUsers,
        icon: HiOutlineUsers,
        color: 'purple',
        bg: 'bg-purple-50',
        textColor: 'text-purple-600',
      },
      {
        title: 'Total Revenue',
        value: `${totalRevenue.toLocaleString()} DH`,
        icon: HiOutlineCurrencyDollar,
        color: 'amber',
        bg: 'bg-amber-50',
        textColor: 'text-amber-600',
      },
    ]);
  }, [orders]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tight mb-2">
          Dashboard
        </h1>
        <p className="text-slate-500 font-semibold">Welcome back to the admin panel</p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`${stat.bg} rounded-2xl p-6 border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center ${stat.textColor} group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-slate-600 text-sm font-semibold mb-1">{stat.title}</p>
              <p className={`text-4xl font-black ${stat.textColor} italic`}>
                {stat.value}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Admin User Info & System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200"
        >
          <h2 className="text-lg font-black text-slate-950 mb-6 uppercase italic tracking-tight">
            Admin Profile
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest">Name</p>
              <p className="text-xl font-black text-slate-900">
                {auth?.user?.name || 'Admin User'}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest">Email</p>
              <p className="text-sm font-semibold text-slate-700">
                {auth?.user?.email || 'admin@vanguard.io'}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest">Role</p>
              <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">
                {auth?.role || 'Admin'}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest">Status</p>
              <p className="text-sm font-black text-green-600 uppercase tracking-wider">Active</p>
            </div>
          </div>
        </motion.div>

        {/* System Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200"
        >
          <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase italic tracking-tight">
            System Overview
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="pb-4 border-b border-slate-200">
              <span className="text-slate-600 font-semibold">Products In System</span>
              <p className="text-2xl font-black text-emerald-600">{adminProductService.getTotalCount()}</p>
            </div>
            <div className="pb-4 border-b border-slate-200">
              <span className="text-slate-600 font-semibold">Active Orders</span>
              <p className="text-2xl font-black text-blue-600">{adminOrderService.getTotalCount()}</p>
            </div>
            <div className="pb-4 border-b border-slate-200">
              <span className="text-slate-600 font-semibold">Registered Users</span>
              <p className="text-2xl font-black text-purple-600">{adminUserService.getTotalCount()}</p>
            </div>
            <div className="pb-4 border-b border-slate-200">
              <span className="text-slate-600 font-semibold">Platform Revenue</span>
              <p className="text-2xl font-black text-amber-600">{adminOrderService.getTotalRevenue().toLocaleString()} DH</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
