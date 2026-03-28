import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  HiOutlineShoppingBag, 
  HiOutlineHeart, 
  HiOutlineMapPin, 
  HiOutlineArrowRightOnRectangle,
  HiOutlineChevronRight,
  HiOutlineCpuChip,
  HiOutlineShieldCheck,
  HiOutlineCreditCard,
  HiOutlineTicket,
  HiOutlineCog6Tooth,
  HiOutlineXMark,
  HiOutlineKey,
  HiOutlineDevicePhoneMobile,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineCamera
} from "react-icons/hi2";
import Button from "../components/ui/Button";
import clsx from "clsx";
import { logout } from "../features/auth/authSlice";
import { useSEO } from "../hooks/useSEO";
import orderService from "../features/orders/orderService";

const ModalShell = ({ title, subtitle, children, icon: Icon, color = "text-emerald-500", onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[300] bg-white/80 backdrop-blur-sm flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.95, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.95, y: 20, opacity: 0 }}
      className="bg-slate-50 border border-slate-100 p-6 sm:p-10 rounded-[2.5rem] max-w-2xl w-full relative overflow-hidden shadow-2xl shadow-slate-200"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-950 transition-colors z-20">
        <HiOutlineXMark size={24} />
      </button>
      <div className="flex items-center gap-6 mb-8 relative z-10">
        <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-100", color)}>
          <Icon size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-950 tracking-tight italic">{title}</h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="max-h-[60vh] overflow-y-auto pr-2 scrollbar-none relative z-10 font-sans">
        {children}
      </div>
    </motion.div>
  </motion.div>
);

const Profile = () => {
  useSEO({
    title: 'My Profile - VANGUARD Account',
    description: 'Manage your VANGUARD account profile, view order history, and manage your account settings.',
    keywords: 'profile, account, settings, orders, user account',
    canonical: 'https://vanguard.store/profile',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const fileInputRef = useRef(null);

  const [activeView, setActiveView] = useState(null);
  const [realOrders, setRealOrders] = useState([]);
  
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("vanguard_user_profile");
    return saved ? JSON.parse(saved) : {
      name: authUser?.name || "Alex Kira",
      email: authUser?.email || "alex.kira@vanguard.io",
      avatar: authUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
      balance: 2450.00,
      id: "UK-9902-8X",
      addresses: [
        { id: 1, label: "Main Residence", street: "24 Rue de la Liberte, Gauthier", city: "Casablanca", zip: "20000", isPrimary: true }
      ],
      orders: [
        { id: "VG-8721", status: "In Transit", date: "Dec 24, 2024", total: 3800, items: 3 },
        { id: "VG-8610", status: "Delivered", date: "Nov 12, 2024", total: 1250, items: 1 }
      ],
      coupons: [
        { id: "C1", code: "VANGUARD_01", discount: "15%", label: "Total Deploy" }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem("vanguard_user_profile", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    if (authUser?.id) {
      const orders = orderService.getByUserId(authUser.id);
      setRealOrders(orders);
    }
  }, [authUser]);

  const [editForm, setEditForm] = useState({ name: userData.name, email: userData.email });
  const [newAddress, setNewAddress] = useState({ label: "", street: "", city: "", zip: "" });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSaveProfile = () => {
    setUserData(prev => ({ ...prev, name: editForm.name, email: editForm.email }));
    setActiveView(null);
  };

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.street) return;
    const address = { ...newAddress, id: Date.now(), isPrimary: userData.addresses.length === 0 };
    setUserData(prev => ({ ...prev, addresses: [...prev.addresses, address] }));
    setNewAddress({ label: "", street: "", city: "", zip: "" });
  };

  const deleteAddress = (id) => {
    setUserData(prev => ({ ...prev, addresses: prev.addresses.filter(a => a.id !== id) }));
  };

  const setPrimaryAddress = (id) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.map(a => ({ ...a, isPrimary: a.id === id }))
    }));
  };

  const stats = [
    { 
      label: "Total Orders", 
      value: userData.orders.length, 
      icon: HiOutlineShoppingBag, 
      trend: "Past 12 months",
      color: "text-emerald-500", 
      bg: "bg-emerald-500/5",
      border: "border-emerald-500/10",
      view: "orders"
    },
    { 
      label: "Wishlist Items", 
      value: wishlistItems.length || 0, 
      icon: HiOutlineHeart, 
      trend: "Synced with store",
      color: "text-rose-500", 
      bg: "bg-rose-500/5",
      border: "border-rose-500/10",
      action: () => navigate("/wishlist")
    },
    { 
      label: "Wallet Balance", 
      value: `${userData.balance.toLocaleString()} DH`, 
      icon: HiOutlineCreditCard, 
      trend: "Credit ready",
      color: "text-blue-500", 
      bg: "bg-blue-500/5",
      border: "border-blue-500/10",
      view: "payments"
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 relative overflow-hidden selection:bg-emerald-500/30">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-500/[0.03] to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }} />
      
      <div className="container-custom max-w-6xl relative z-10 px-4">
        
        <section className="relative mb-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative group">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48">
                <div className="absolute inset-0 rounded-full border border-emerald-500/20 scale-110 group-hover:scale-125 transition-transform duration-1000" />
                <div className="absolute inset-0 rounded-full border border-slate-200 scale-125 animate-[spin_10s_linear_infinite]" />
                <div className="w-full h-full rounded-full p-1.5 bg-gradient-to-tr from-emerald-500 to-emerald-200 shadow-[0_0_40px_rgba(16,185,129,0.15)] relative z-10">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 border-4 border-white group cursor-pointer relative" onClick={() => fileInputRef.current.click()}>
                    <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <HiOutlineCamera className="text-white text-3xl" />
                    </div>
                  </div>
                </div>
                
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />

                <div className="absolute -bottom-2 right-4 px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full border-4 border-white flex items-center gap-1.5 shadow-xl z-20">
                  <HiOutlineShieldCheck size={14} /> Elite
                </div>
              </div>
            </motion.div>

            <div className="flex-1 text-center lg:text-left pt-4 font-sans">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 mb-6 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Account Verified</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-light text-slate-950 tracking-tighter mb-4 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                  Welcome back, <span className="font-bold text-emerald-500 italic">{userData.name}.</span>
                </h1>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-8 text-slate-600 mb-8 font-sans">
                  <span className="text-[11px] font-medium uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-md border border-slate-200">ID: {userData.id}</span>
                  <span className="text-[13px] font-medium break-all lowercase">{userData.email}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <Button onClick={() => setActiveView("settings")} className="h-12 px-8 rounded-xl bg-slate-950 text-white hover:bg-emerald-500 hover:text-slate-950 transition-all text-[11px] font-bold uppercase tracking-widest">
                    Edit Profile Details
                  </Button>
                  <Button variant="outline" onClick={() => setActiveView("security")} className="h-12 px-8 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-950 transition-all text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <HiOutlineCog6Tooth size={16} /> Account Security
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              onClick={stat.action || (() => setActiveView(stat.view))}
              className={clsx("relative p-8 rounded-[3.5rem] border transition-all duration-500 group overflow-hidden bg-slate-50 cursor-pointer font-sans hover:shadow-2xl hover:shadow-slate-200", "border-slate-100")}
            >
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-6 px-1`}>
                <stat.icon size={24} />
              </div>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <div className="flex items-baseline justify-between transition-transform group-hover:translate-x-1 duration-500">
                <span className="text-3xl font-bold text-slate-950 tracking-tight">{stat.value}</span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest italic">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <header className="flex items-center justify-between mb-8 px-2 font-sans">
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-[0.3em]">Management Console</h3>
              <div className="h-px flex-1 bg-slate-200 mx-6" />
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Order History", icon: HiOutlineShoppingBag, desc: "Manage your deployment logs", view: "orders", color: "text-amber-500" },
                { label: "Shipping Addresses", icon: HiOutlineMapPin, desc: "Update delivery drop zones", view: "addresses", color: "text-emerald-500" },
                { label: "Payment Systems", icon: HiOutlineCreditCard, desc: "Secure vault management", view: "payments", color: "text-blue-500" },
                { label: "Vanguard Perks", icon: HiOutlineTicket, desc: "Available tactical discounts", view: "coupons", color: "text-purple-500" },
              ].map((action, idx) => (
                <button key={idx} onClick={() => setActiveView(action.view)} className="group flex items-center gap-6 p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:shadow-xl hover:shadow-slate-200 transition-all duration-500 text-left font-sans">
                  <div className={clsx("w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center bg-slate-100", action.color)}>
                    <action.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-slate-950 font-bold tracking-tight mb-1 group-hover:text-emerald-500 transition-colors">{action.label}</h4>
                    <p className="text-[11px] text-slate-400 truncate uppercase tracking-wider">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8 font-sans">
             <div className="p-8 rounded-[2.5rem] bg-emerald-500/[0.08] border border-emerald-500/20 relative overflow-hidden">
                <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <HiOutlineCpuChip size={16} /> Security Protocol
                </h4>
                <p className="text-[13px] text-slate-700 leading-relaxed mb-8">System synchronization: <span className="text-emerald-600 font-bold uppercase">Optimal</span>. All sessions are encrypted.</p>
                <button onClick={() => setActiveView("security")} className="w-full py-4 text-[11px] font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all rounded-xl uppercase tracking-widest">Secure Sessions</button>
             </div>
             <button onClick={() => setActiveView("logout")} className="w-full flex items-center justify-between p-6 rounded-3xl border border-rose-200 hover:bg-rose-50 transition-all group font-sans">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-500 flex items-center justify-center group-hover:scale-95 transition-all"><HiOutlineArrowRightOnRectangle size={20} /></div>
                  <span className="text-xs font-bold text-slate-950 uppercase tracking-widest">Terminate Session</span>
                </div>
                <HiOutlineChevronRight className="text-slate-300 group-hover:text-rose-500" />
             </button>
          </div>
        </div>

        <AnimatePresence>
          {activeView === "logout" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-white/80 backdrop-blur-sm flex items-center justify-center p-6">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl shadow-slate-200">
                <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6"><HiOutlineArrowRightOnRectangle size={32} /></div>
                <h3 className="text-xl font-bold text-slate-950 mb-2 font-sans">Logout Profile?</h3>
                <p className="text-slate-600 text-[10px] mb-8 uppercase tracking-widest font-sans">System session will be terminated immediately.</p>
                <div className="flex flex-col gap-3 font-sans">
                  <button onClick={handleLogout} className="w-full py-4 bg-rose-500 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-xl">Confirm Logout</button>
                  <button onClick={() => setActiveView(null)} className="w-full py-4 bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-[0.3em] rounded-xl">Cancel</button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeView === "settings" && (
            <ModalShell title="Profile Settings" subtitle="Real-time Identity Management" icon={HiOutlineCog6Tooth} color="text-emerald-500" onClose={() => setActiveView(null)}>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Display Name</label>
                  <input type="text" value={editForm.name} onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-950 focus:border-emerald-500 transition-all outline-none" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Email Channel</label>
                  <input type="email" value={editForm.email} onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-950 focus:border-emerald-500 transition-all outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button onClick={handleSaveProfile} className="py-4 bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-600 transition-all">Save Changes</button>
                  <button onClick={() => { setEditForm({ name: userData.name, email: userData.email }); setActiveView(null); }} className="py-4 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl">Discard</button>
                </div>
              </div>
            </ModalShell>
          )}

          {activeView === "addresses" && (
            <ModalShell title="Address Vault" subtitle="Primary Drop Zone Management" icon={HiOutlineMapPin} color="text-emerald-500" onClose={() => setActiveView(null)}>
               <div className="space-y-4 mb-8">
                  {userData.addresses.map(addr => (
                    <div key={addr.id} className={clsx("p-5 bg-slate-100 rounded-2xl border transition-all flex items-center justify-between", addr.isPrimary ? "border-emerald-500" : "border-slate-200")}>
                       <div className="flex flex-col">
                          <span className="text-slate-950 font-bold text-sm flex items-center gap-2">
                             {addr.label}
                             {addr.isPrimary && <span className="text-[10px] px-2 bg-emerald-500 text-white font-black rounded uppercase">Primary</span>}
                          </span>
                          <span className="text-[11px] text-slate-600 mt-1 uppercase tracking-wide">{addr.street}, {addr.city} {addr.zip}</span>
                       </div>
                       <div className="flex items-center gap-3">
                          {!addr.isPrimary && <button onClick={() => setPrimaryAddress(addr.id)} className="text-[9px] font-bold text-emerald-600 uppercase hover:text-emerald-700 transition-colors">Set Main</button>}
                          <button onClick={() => deleteAddress(addr.id)} className="text-rose-400 hover:text-rose-600"><HiOutlineTrash size={18} /></button>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-6 bg-slate-100 border border-dashed border-slate-300 rounded-2xl space-y-4">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Establish New Protocol</p>
                  <input placeholder="Label (e.g. Office)" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-xs text-slate-950" value={newAddress.label} onChange={e => setNewAddress(p => ({ ...p, label: e.target.value }))} />
                  <input placeholder="Street Address" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-xs text-slate-950" value={newAddress.street} onChange={e => setNewAddress(p => ({ ...p, street: e.target.value }))} />
                  <div className="grid grid-cols-2 gap-2">
                    <input placeholder="City" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-xs text-slate-950" value={newAddress.city} onChange={e => setNewAddress(p => ({ ...p, city: e.target.value }))} />
                    <input placeholder="ZIP" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-xs text-slate-950" value={newAddress.zip} onChange={e => setNewAddress(p => ({ ...p, zip: e.target.value }))} />
                  </div>
                  <button onClick={handleAddAddress} className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-950 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all">+ Add New Address</button>
               </div>
            </ModalShell>
          )}

          {activeView === "security" && (
            <ModalShell title="Security Protocol" subtitle="System Integrated Logs" icon={HiOutlineShieldCheck} color="text-emerald-500" onClose={() => setActiveView(null)}>
               <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <HiOutlineDevicePhoneMobile className="text-emerald-600" size={24} />
                      <div className="flex flex-col">
                        <span className="text-slate-950 font-bold text-sm">Windows Chrome  Casablanca</span>
                        <span className="text-[10px] text-slate-600 uppercase tracking-widest font-sans italic">Current Session  Verified IP</span>
                      </div>
                    </div>
                    <HiOutlineCheckCircle className="text-emerald-600" size={20} />
                  </div>
                  <button onClick={() => { alert("Password sync integration required."); setActiveView(null); }} className="w-full py-4 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-950 hover:bg-slate-100 uppercase tracking-[0.2em] transition-all"><HiOutlineKey className="inline mr-2" /> Rotate Credentials</button>
               </div>
            </ModalShell>
          )}

          {activeView === "orders" && (
            <ModalShell title="Deployment Logs" subtitle="Acquisition History" icon={HiOutlineShoppingBag} color="text-amber-500" onClose={() => setActiveView(null)}>
              <div className="space-y-4">
                {realOrders.length > 0 ? (
                  realOrders.map(order => (
                    <div key={order.id} className="p-5 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-slate-950 font-bold text-sm italic">#{order.id}</span>
                        <span className={`text-[10px] font-bold uppercase mt-1 ${
                          order.status === 'Delivered' ? 'text-emerald-600' : 
                          order.status === 'Cancelled' ? 'text-red-600' : 'text-amber-600'
                        }`}>{order.status}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-600 font-bold text-sm italic">{order.total.toLocaleString()} DH</span>
                        <p className="text-[10px] text-slate-500 uppercase mt-1">
                          {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <HiOutlineShoppingBag className="mx-auto w-12 h-12 text-slate-200 mb-4" />
                    <p className="text-slate-500 italic text-sm font-sans tracking-wide uppercase">No acquisition logs detected.</p>
                  </div>
                )}
              </div>
            </ModalShell>
          )}
          
          {activeView === "payments" && (
             <ModalShell title="Financial Vault" subtitle="Currency and Credits" icon={HiOutlineCreditCard} color="text-blue-600" onClose={() => setActiveView(null)}>
                <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2rem] text-white mb-6 font-sans relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl pointer-events-none" />
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-2">Available Credits</p>
                   <h2 className="text-4xl font-light italic tracking-tighter">{userData.balance.toLocaleString()}.00 <span className="text-sm font-bold opacity-40">DH</span></h2>
                   <div className="mt-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest border-t border-white/10 pt-6">
                      <span>{userData.name}</span>
                      <span className="opacity-40">Vanguard Elite Card</span>
                   </div>
                </div>
                <button className="w-full py-4 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-colors border border-slate-200">Link External Payment Pipeline</button>
             </ModalShell>
          )}
          
          {activeView === "coupons" && (
             <ModalShell title="Elite Perks" subtitle="Active Incentives" icon={HiOutlineTicket} color="text-purple-600" onClose={() => setActiveView(null)}>
               <div className="space-y-4">
                {userData.coupons.map(cpn => (
                  <div key={cpn.id} className="p-6 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-light text-purple-700 italic font-sans tracking-tight">{cpn.discount} OFF</span>
                      <p className="text-[9px] text-slate-600 uppercase mt-1">{cpn.label}  UNLOCK: {cpn.code}</p>
                    </div>
                    <button onClick={() => navigator.clipboard.writeText(cpn.code)} className="px-5 py-2 bg-purple-600 text-white text-[10px] font-black uppercase rounded-lg hover:bg-purple-700 transition-all">Copy Code</button>
                  </div>
                ))}
               </div>
             </ModalShell>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Profile;
