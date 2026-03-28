import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { adminUserService } from '../../services/adminService';

const AdminUsers = () => {
  const users = adminUserService.getAll();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const getStatusColor = (status) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-slate-100 text-slate-800';
  };

  const getRoleColor = (role) => {
    return role === 'admin'
      ? 'bg-purple-100 text-purple-800'
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tight mb-2">
          Users
        </h1>
        <p className="text-slate-500 font-semibold">Manage system users</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">User</th>
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">Email</th>
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">Role</th>
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">Status</th>
                <th className="px-6 py-4 text-left text-sm font-black text-slate-950">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        {user.role === 'admin' && (
                          <div className="flex items-center gap-1">
                            <HiOutlineShieldCheck size={14} className="text-purple-600" />
                            <span className="text-[10px] font-bold text-purple-600">Administrator</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{user.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="font-semibold">No users found</p>
        </div>
      )}

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
      >
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-slate-600 text-sm font-semibold mb-2">Total Users</p>
          <p className="text-4xl font-black text-purple-600">{filteredUsers.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-slate-600 text-sm font-semibold mb-2">Admins</p>
          <p className="text-4xl font-black text-blue-600">
            {filteredUsers.filter((u) => u.role === 'admin').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-slate-600 text-sm font-semibold mb-2">Active Users</p>
          <p className="text-4xl font-black text-green-600">
            {filteredUsers.filter((u) => u.status === 'Active').length}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminUsers;
