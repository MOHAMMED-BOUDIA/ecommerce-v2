import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  HiOutlineXMark,
  HiOutlineBars3BottomRight,
  HiOutlineChartBar,
  HiOutlineShoppingBag,
  HiOutlineFolder,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineCubeTransparent
} from 'react-icons/hi2';
import { logout } from '../../features/auth/authSlice';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: HiOutlineChartBar },
    { name: 'Products', path: '/admin/products', icon: HiOutlineShoppingBag },
    { name: 'Categories', path: '/admin/categories', icon: HiOutlineFolder },
    { name: 'Orders', path: '/admin/orders', icon: HiOutlineClipboardDocumentList },
    { name: 'Users', path: '/admin/users', icon: HiOutlineUsers },
    { name: 'Settings', path: '/admin/settings', icon: HiOutlineCog6Tooth },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-white/10 transition-all duration-300 flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="h-20 border-b border-white/10 flex items-center px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 group-hover:scale-110 transition-transform">
              <HiOutlineCubeTransparent size={18} strokeWidth={2.5} />
            </div>
            <span className="text-white font-black uppercase italic tracking-tight">Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={20} />
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-white/10 p-4 space-y-4">
          <div className="px-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Admin User</p>
            <p className="text-white font-semibold truncate">{user?.name}</p>
            <p className="text-[11px] text-white/50">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors font-semibold text-sm"
          >
            <HiOutlineArrowRightStartOnRectangle size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-20 border-b border-slate-200 bg-white flex items-center px-6 justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-950 transition-colors"
          >
            {isSidebarOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3BottomRight size={24} />}
          </button>
          <div className="flex-1 ml-4">
            <h1 className="text-2xl font-black text-slate-950 uppercase italic tracking-tight">
              System Administration
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-slate-50">
          <Outlet />
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
