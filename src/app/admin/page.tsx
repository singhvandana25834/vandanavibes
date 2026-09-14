"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, Shield, Clock, Mail, Users, Activity, Trash2, Search, Smartphone, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const DUMMY_USERS: any[] = []; // Waiting for real database connection

const APP_USAGE_DATA: any[] = []; // Waiting for real database connection

export default function AdminPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('tab') || 'overview';
  const setActiveTab = (tab: string) => router.push(`/admin?tab=${tab}`);
  
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);

  useEffect(() => {
    fetch("/api/suggestions")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuggestions(data.suggestions.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        }
        setLoadingSuggestions(false);
      })
      .catch(() => setLoadingSuggestions(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans pt-4">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
            <Shield className="w-8 h-8 text-amber-400" /> Admin Control Center
          </h1>
          <p className="text-sm font-medium text-white/60 mt-2">Manage users, view analytics, and control the app ecosystem.</p>
        </div>
        <div className="flex gap-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl text-center border border-white/10">
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">Total Users</div>
            <div className="text-2xl font-black text-amber-400">{DUMMY_USERS.length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl text-center border border-white/10">
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">Live Now</div>
            <div className="text-2xl font-black text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 0
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide gap-2 p-1 bg-surface-light dark:bg-slate-900/50 rounded-2xl border border-surface-lavender dark:border-slate-800">
        {[
          { id: "overview", label: "Overview", icon: Activity },
          { id: "users", label: "Manage Users", icon: Users },
          { id: "analytics", label: "App Analytics", icon: TrendingUp },
          { id: "suggestions", label: "Inbox", icon: MessageSquare },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white dark:bg-surface text-primary shadow-sm border border-surface-lavender dark:border-slate-700"
                : "text-foreground/60 hover:text-foreground hover:bg-white/50 dark:hover:bg-surface/50"
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-surface rounded-3xl p-6 border border-surface-lavender dark:border-slate-800 shadow-sm col-span-2">
                <h3 className="text-base font-bold text-foreground mb-6">Study Activity (Last 7 Days)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[]}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}} />
                      <Bar dataKey="h" name="Study Hours" radius={[6, 6, 0, 0]}>
                        {[{day:'Mon',h:45},{day:'Tue',h:52},{day:'Wed',h:38},{day:'Thu',h:65},{day:'Fri',h:48},{day:'Sat',h:85},{day:'Sun',h:92}].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 6 ? '#6366f1' : '#c7d2fe'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-md text-white">
                <h3 className="text-sm font-bold opacity-80 mb-6 uppercase tracking-wider">System Status</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Database Load</span>
                      <span className="font-bold">24%</span>
                    </div>
                    <div className="w-full bg-black/20 rounded-full h-2"><div className="bg-green-400 h-2 rounded-full" style={{width: '24%'}}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage Used</span>
                      <span className="font-bold">68%</span>
                    </div>
                    <div className="w-full bg-black/20 rounded-full h-2"><div className="bg-amber-400 h-2 rounded-full" style={{width: '68%'}}></div></div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/20">
                    <p className="text-xs opacity-70">Server Uptime</p>
                    <p className="text-xl font-black">99.98%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE USERS */}
          {activeTab === "users" && (
            <div className="bg-white dark:bg-surface rounded-3xl p-6 border border-surface-lavender dark:border-slate-800 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-lg font-bold text-foreground">Registered Users</h2>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                  <input type="text" placeholder="Search by name or email..." className="w-full bg-surface-light dark:bg-slate-900/50 border border-surface-lavender dark:border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-surface-lavender dark:border-slate-700 text-foreground/50">
                      <th className="pb-3 font-semibold">User</th>
                      <th className="pb-3 font-semibold">Joined Date</th>
                      <th className="pb-3 font-semibold">Total Study</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
    {DUMMY_USERS.length === 0 ? (
      <tr>
        <td colSpan={5} className="py-12 text-center text-foreground/50 font-bold">
          No users registered yet. Waiting for database connection.
        </td>
      </tr>
    ) : (
      DUMMY_USERS.map((user: any) => (
        <tr key={user.id} className="border-b border-surface-lavender/50 dark:border-slate-800/50 last:border-0 hover:bg-surface-light/30 dark:hover:bg-slate-900/30 transition-colors">
          <td className="py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center text-white font-bold text-xs">
                {user.name[0]}
              </div>
              <div>
                <p className="font-bold text-foreground">{user.name}</p>
                <p className="text-[10px] text-foreground/60">{user.email}</p>
              </div>
            </div>
          </td>
          <td className="py-4 text-foreground/80">{user.joined}</td>
          <td className="py-4 font-bold text-foreground">{user.studyHours} hrs</td>
          <td className="py-4">
            <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
              {user.status}
            </span>
          </td>
          <td className="py-4 text-right">
            <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors" title="Delete Account">
              <Trash2 className="w-4 h-4" />
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: APP ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-surface rounded-3xl p-6 border border-surface-lavender dark:border-slate-800 shadow-sm">
                <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" /> Allowed Apps Usage
                </h3>
                <p className="text-xs text-foreground/60 mb-6">Which external apps are students using the most while studying?</p>
                
                <div className="space-y-5">
                  {APP_USAGE_DATA.length === 0 ? (
                    <div className="py-8 text-center text-foreground/50 font-bold">No app usage data available yet.</div>
                  ) : APP_USAGE_DATA.map((app: any) => (
                    <div key={app.name}>
                      <div className="flex justify-between text-sm font-semibold mb-1.5">
                        <span>{app.name}</span>
                        <span className="text-foreground/60">{app.value}k hours</span>
                      </div>
                      <div className="w-full bg-surface-light dark:bg-slate-900 rounded-full h-2.5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} animate={{ width: `${(app.value / 65) * 100}%` }} transition={{ duration: 1 }}
                          className="h-full rounded-full" style={{ backgroundColor: app.color }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-surface rounded-3xl p-6 border border-surface-lavender dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-foreground">App is Growing!</h3>
                <p className="text-sm text-foreground/60 mt-2 max-w-xs">User engagement is up 42% this week. The "Allowed Apps" feature has significantly boosted average study session duration.</p>
              </div>
            </div>
          )}

          {/* TAB 4: SUGGESTIONS INBOX */}
          {activeTab === "suggestions" && (
            <div className="bg-white dark:bg-surface rounded-3xl p-6 border border-surface-lavender dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" /> Feedback Inbox
                </h2>
                <div className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {suggestions.length} Messages
                </div>
              </div>

              <div className="space-y-4">
                {loadingSuggestions ? (
                  <div className="text-center py-12 text-foreground/50 font-bold">Loading inbox...</div>
                ) : suggestions.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-surface-lavender dark:border-slate-700 rounded-2xl">
                    <Mail className="w-8 h-8 text-foreground/20 mx-auto mb-3" />
                    <p className="text-sm font-bold text-foreground/60">No new suggestions</p>
                  </div>
                ) : (
                  suggestions.map((item, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      key={item.id} className="bg-surface-light/50 dark:bg-slate-900/30 rounded-2xl p-5 border border-surface-lavender dark:border-slate-800"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {item.name ? item.name[0] : 'U'}
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-foreground">{item.name || "Anonymous User"}</h3>
                            <p className="text-[10px] text-foreground/50">{new Date(item.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80">{item.message}</p>
                      <div className="mt-3 pt-3 border-t border-surface-lavender dark:border-slate-800 flex justify-end">
                        <button className="text-xs font-bold text-primary hover:underline">Reply to User</button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
