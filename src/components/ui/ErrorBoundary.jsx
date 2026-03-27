import React from "react";
import { useRouteError, Link } from "react-router-dom";
import { HiOutlineExclamationTriangle, HiOutlineHome, HiOutlineCommandLine } from "react-icons/hi2";
import Button from "./Button";

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error("System Anomaly Detected:", error);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-10 font-sans">
      <div className="max-w-4xl w-full space-y-20 text-center relative">
        {/* Background Decorative Element */}
        <div className="absolute inset-0 bg-red-500/10 blur-[150px] rounded-full scale-150 animate-pulse pointer-events-none" />

        <div className="space-y-12 relative z-10">
           <div className="w-32 h-32 rounded-[3rem] bg-red-500/20 flex items-center justify-center text-red-500 mx-auto border-4 border-red-500/30 animate-bounce">
              <HiOutlineExclamationTriangle size={64} />
           </div>

           <div className="space-y-6">
              <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.6em]">System Anomaly CRITICAL-001</span>
              <h1 className="text-7xl md:text-9xl font-black text-white uppercase italic tracking-tighter leading-none">
                PROTOCOL<br />
                <span className="text-red-500">BREACH.</span>
              </h1>
              <p className="text-slate-500 text-xl font-medium italic max-w-2xl mx-auto leading-relaxed">
                The requested memory coordinate is inaccessible or has been purged. 
                Our neural link experienced a critical synchronization failure.
              </p>
           </div>

           <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10 text-left font-mono text-sm text-red-400 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                 <HiOutlineCommandLine size={20} className="text-red-500" />
                 <span className="text-[10px] font-black uppercase text-white tracking-widest">Diagnostic Console</span>
              </div>
              <p className="opacity-80">STDOUT: {error?.statusText || error?.message || "Segmentation Fault: Unknown Source"}</p>
              <p className="opacity-50 italic">// Attempting self-healing protocol... FAILED</p>
              <p className="opacity-50 italic">// Manual intervention required.</p>
           </div>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button as={Link} to="/" className="rounded-full px-12 h-20 bg-emerald-500 text-slate-950 hover:bg-white shadow-emerald-500/20 w-full sm:w-auto">
                 <span className="flex items-center gap-3">Reboot to Home <HiOutlineHome size={20} /></span>
              </Button>
              <Button onClick={() => window.location.reload()} className="rounded-full px-12 h-20 bg-transparent border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                 Sync Connection
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
