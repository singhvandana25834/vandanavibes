"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, KeyRound, User, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Mascot from "@/components/Mascot";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === "admin.vandana@vibes-portal.com" && password === "Vandana@Admin#2026!Secret") {
        localStorage.setItem("admin_token", "super_secret_admin_access_token_123");
        router.push("/admin");
      } else {
        setError("Invalid Admin credentials. Access denied.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative z-10"
      >
        <div className="p-8 text-center border-b border-white/10 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-primary to-[#ff00ff]" />
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/10 shadow-inner">
            <Shield className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal</h1>
          <p className="text-sm font-medium text-white/50 mt-1">Authorized Personnel Only</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 outline-none transition-all"
                  placeholder="Enter admin username"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 outline-none transition-all"
                  placeholder="********"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl font-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Authenticating..." : <>Secure Login <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
