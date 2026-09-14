"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function InstallAppButton({ isCollapsed }: { isCollapsed?: boolean }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      alert("App is ready to be installed! \n\n1. Click the 3 dots (?) in the top-right corner of Chrome.\n2. Look for 'Install Vandana Vibes' or 'Cast, save, and share' -> 'Install page as app'.\n\n(This happens because your browser is managing the installation directly!)");
    }
  };

  return (
    <button
      onClick={handleInstallClick}
      title={isCollapsed ? "Install App" : undefined}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold text-primary hover:text-white hover:bg-primary border border-primary/20 hover:shadow-md ${
        isCollapsed ? "justify-center px-0" : ""
      }`}
    >
      <Download className="w-5 h-5 flex-shrink-0" />
      {!isCollapsed && <span>Install App</span>}
    </button>
  );
}
