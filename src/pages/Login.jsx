import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineCpuChip, HiOutlineArrowRight } from "react-icons/hi2";
import { setUser } from "../features/auth/authSlice";
import { useSEO } from "../hooks/useSEO";
import { mockAdminUser, mockRegularUser } from "../data/mockAdmin";

const Login = () => {
  useSEO({
    title: 'Login - VANGUARD Account',
    description: 'Log in to your VANGUARD account to access your profile, orders, and wishlist.',
    keywords: 'login, account, sign in, authentication',
    canonical: 'https://vanguard.store/login',
  });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let user = null;
      
      // Check admin credentials
      if (formData.email === mockAdminUser.email && formData.password === mockAdminUser.password) {
        user = {
          user: mockAdminUser,
          token: "vanguard_admin_token_xyz789"
        };
      }
      // Check regular user credentials
      else if (formData.email === mockRegularUser.email && formData.password === mockRegularUser.password) {
        user = {
          user: mockRegularUser,
          token: "vanguard_user_token_abc123"
        };
      }
      // Generic user login
      else if (formData.email && formData.password) {
        user = {
          user: {
            id: "UK-9902-8X",
            name: "Alex Kira",
            email: formData.email,
            role: "user",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop"
          },
          token: "vanguard_secure_token_abc123"
        };
      } else {
        setError("Invalid Email or Password");
        setIsLoading(false);
        return;
      }

      dispatch(setUser(user));
      
      // Redirect based on role - add small delay to ensure Redux state updates
      setTimeout(() => {
        if (user.user.role === 'admin') {
          navigate("/admin/dashboard");
        } else {
          navigate("/profile");
        }
      }, 100);
    } catch (err) {
      setError("Access Denied: System Rejection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-emerald-500/30 overflow-hidden relative font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
          {/* Subtle Corner Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-1000" />
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 group-hover:rotate-12 transition-transform duration-700">
              <HiOutlineCpuChip className="text-emerald-500 text-3xl" />
            </div>
            <h2 className="text-3xl font-light text-white tracking-tighter mb-2 italic">Authentication Required</h2>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em]">Integrated Security Protocol</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Email Coordinates</label>
              <div className="relative group/input">
                <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-emerald-500 transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="name@vanguard.io"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Access Cipher</label>
              <div className="relative group/input">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-emerald-500 transition-colors" />
                <input 
                  type="password" 
                  required
                  placeholder=""
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all outline-none"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-500 text-[10px] font-bold uppercase tracking-widest text-center py-2 bg-rose-500/5 border border-rose-500/10 rounded-lg">
                {error}
              </motion.p>
            )}

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full relative group h-14 bg-emerald-500 rounded-xl overflow-hidden transition-all hover:bg-white duration-500 shadow-lg shadow-emerald-500/10"
              >
                <div className="absolute inset-0 flex items-center justify-center gap-3">
                  <span className="text-black font-black text-[11px] uppercase tracking-[0.3em] group-hover:tracking-[0.4em] transition-all duration-500">
                    {isLoading ? "Synchronizing..." : "Initialize Link"}
                  </span>
                  {!isLoading && <HiOutlineArrowRight className="text-black group-hover:translate-x-1 transition-transform" size={16} />}
                </div>
              </button>
            </div>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
            <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mb-2">DEMO CREDENTIALS:</p>
            <div className="space-y-1 text-[8px] text-white/60">
              <p>Admin: admin@vanguard.io / admin123</p>
              <p>User: user@vanguard.io / user123</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8">
            <Link to="/register" className="text-[10px] font-bold text-white/30 uppercase tracking-widest hover:text-emerald-500 transition-colors">
              Establish Account
            </Link>
            <button className="text-[10px] font-bold text-white/30 uppercase tracking-widest hover:text-white transition-colors">
              Recovery Mode
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
