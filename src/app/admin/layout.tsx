"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Shield, LogOut, Users, Activity, MessageSquare, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";
import Mascot from "@/components/Mascot";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem("admin_token");
    if (!adminToken && pathname !== "/login") {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, [pathname, router]);

  if (isChecking) return <div className="min-h-screen bg-surface-light dark:bg-black flex items-center justify-center">Loading...</div>;

  // If on login page, just show the login form without sidebar
  if (pathname === "/login") {
    return <div className="min-h-screen bg-surface-light dark:bg-black font-sans">{children}</div>;
  }

  // Full Admin Layout
  return (
    <div className="min-h-screen bg-surface-light dark:bg-black font-sans flex">
      {/* Admin Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <Mascot className="w-10 h-10" mood="happy" />
          <div>
            <h1 className="font-black text-lg text-amber-400">Admin Portal</h1>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Vandana Vibes</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/admin?tab=overview" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/10 text-white transition-colors">
            <Activity className="w-5 h-5 text-amber-400" /> Overview
          </Link>
          <Link href="/admin?tab=users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/10 text-white transition-colors">
            <Users className="w-5 h-5 text-emerald-400" /> User Management
          </Link>
          <Link href="/admin?tab=analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/10 text-white transition-colors">
            <TrendingUp className="w-5 h-5 text-blue-400" /> App Analytics
          </Link>
          <Link href="/admin?tab=suggestions" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/10 text-white transition-colors">
            <MessageSquare className="w-5 h-5 text-accent-pink" /> Inbox (Suggestions)
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => {
              localStorage.removeItem("admin_token");
              router.push("/login");
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl font-bold text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Secure Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
}
