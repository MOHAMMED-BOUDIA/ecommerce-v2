import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCog6Tooth,
  HiOutlineShieldExclamation,
  HiOutlineCheckCircle,
} from 'react-icons/hi2';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'VANGUARD',
    siteEmail: 'admin@vanguard.io',
    currency: 'USD',
    taxRate: '10',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('admin_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tight mb-2">
          Settings
        </h1>
        <p className="text-slate-500 font-semibold">Configure system settings</p>
      </div>

      {/* Notification */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
        >
          <HiOutlineCheckCircle className="text-green-600" size={20} />
          <span className="text-green-800 font-semibold">Settings saved successfully!</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-4 sticky top-24">
            {[
              { id: 'general', label: 'General', icon: HiOutlineCog6Tooth },
              { id: 'security', label: 'Security', icon: HiOutlineShieldExclamation },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-slate-200 p-8"
            >
              <h2 className="text-2xl font-black mb-6 text-slate-950">General Settings</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Site Email</label>
                  <input
                    type="email"
                    value={settings.siteEmail}
                    onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-emerald-500 outline-none"
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                      <option>JPY</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tax Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={settings.taxRate}
                      onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-slate-200 p-8"
            >
              <h2 className="text-2xl font-black mb-6 text-slate-950">Security Settings</h2>

              <div className="space-y-6">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-900 font-semibold">
                    Admin account is protected with secure authentication.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Admin Account</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">Email:</span> admin@vanguard.io
                    </p>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">Role:</span> Administrator
                    </p>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">Status:</span> Active
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    disabled
                    className="px-6 py-3 bg-slate-200 text-slate-600 font-bold rounded-lg cursor-not-allowed"
                  >
                    Change Password (Coming Soon)
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
