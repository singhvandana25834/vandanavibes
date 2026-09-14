"use client";

import React, { useState, useEffect } from "react";
import { useTimerStore, useUserStore } from "@/lib/store";
import { DUMMY_APPS } from "@/lib/allowedAppsList";
import { Grid2x2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingAppLauncher() {
  const { isActive, isPaused } = useTimerStore();
  const allowedApps = useUserStore(state => state.allowedApps) || [];
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || (!isActive && !isPaused) || allowedApps.length === 0) return null;

  const myApps = DUMMY_APPS.filter(app => allowedApps.includes(app.id));

  const launchApp = (app: typeof DUMMY_APPS[0]) => {
    // Attempt deep link, fallback to web link after a short delay
    const start = Date.now();
    window.location.href = app.url;
    setTimeout(() => {
      if (Date.now() - start < 1500 && app.fallback) {
        window.open(app.fallback, '_blank');
      }
    }, 1000);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 md:right-8 z-50 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center border-2 border-white/20 transition-colors"
      >
        <Grid2x2 className="w-5 h-5" />
      </motion.button>

      {/* Launcher Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="fixed bottom-0 left-0 right-0 z-[101] bg-white dark:bg-surface rounded-t-3xl shadow-2xl p-6 border-t border-surface-lavender dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Allowed Apps</h3>
                  <p className="text-xs text-foreground/60">Launch apps without breaking your focus timer.</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-surface-light dark:bg-slate-900 rounded-full text-foreground/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-6 gap-x-2 pb-6">
                {myApps.map(app => (
                  <div key={app.id} onClick={() => launchApp(app)} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      <app.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-[10px] font-medium text-foreground text-center truncate w-full px-1">
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
