"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Mascot({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) {
  const [action, setAction] = useState<"standing" | "looking" | "reading" | "tea">("standing");
  
  // Always standing on the baseline right of 's'
  const STANDING_POS = { x: 0, y: 0 };

  useEffect(() => {
    if (isSidebarCollapsed) {
      setAction("standing");
      return;
    }

    const interval = setInterval(() => {
      const rand = Math.random();
      
      if (rand < 0.25) {
        setAction("looking");
      } else if (rand < 0.5) {
        setAction("tea");
      } else if (rand < 0.75) {
        setAction("reading");
      } else {
        setAction("standing");
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isSidebarCollapsed]);

  const skinColor = "#FFC8B3";
  const dressColor = "#6044BF";
  const hairColor = "#3D2B1F";

  if (isSidebarCollapsed) return null;

  return (
    <motion.div
      initial={STANDING_POS}
      animate={STANDING_POS}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="relative z-50 w-12 h-12 pointer-events-none -mt-4"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
        {/* Shadow (always visible when standing) */}
        <ellipse cx="50" cy="88" rx="12" ry="3" fill="rgba(0,0,0,0.15)" />
        
        {/* === GIRL ASSET === */}
        <motion.g>
          {/* Back Hair / Ponytail */}
          <path d="M 40 30 Q 25 50 32 60 Q 38 40 45 35" fill={hairColor} />
          <path d="M 60 30 Q 75 50 68 60 Q 62 40 55 35" fill={hairColor} />

          {/* Standing Legs (Always standing now) */}
          <g>
            <rect x="44" y="72" width="5" height="14" rx="2.5" fill={skinColor} />
            <rect x="51" y="72" width="5" height="14" rx="2.5" fill={skinColor} />
            <rect x="43" y="82" width="7" height="5" rx="2" fill="#333" />
            <rect x="50" y="82" width="7" height="5" rx="2" fill="#333" />
          </g>

          {/* Dress Body */}
          <path d="M 40 50 L 32 75 Q 50 78 68 75 L 60 50 Z" fill={dressColor} />
          {/* Dress Collar/Neck */}
          <path d="M 43 50 Q 50 55 57 50" fill="#fff" />

          {/* Head */}
          <circle cx="50" cy="40" r="14" fill={skinColor} />
          
          {/* Front Hair / Bangs */}
          <path d="M 36 40 Q 36 24 50 24 Q 64 24 64 40 Q 58 32 50 35 Q 42 32 36 40 Z" fill={hairColor} />
          
          {/* Blush */}
          <ellipse cx="42" cy="45" rx="3" ry="1.5" fill="#ff7b7b" opacity="0.6" />
          <ellipse cx="58" cy="45" rx="3" ry="1.5" fill="#ff7b7b" opacity="0.6" />

          {/* Eyes (Look right if looking, otherwise forward) */}
          {action === "looking" ? (
            <>
              <circle cx="53" cy="41" r="2" fill="#111" />
              <circle cx="63" cy="41" r="2" fill="#111" />
            </>
          ) : (
            <>
              <circle cx="45" cy="41" r="2" fill="#111" />
              <circle cx="55" cy="41" r="2" fill="#111" />
            </>
          )}

          {/* Mouth */}
          {action === "standing" && (
            <path d="M 47 47 Q 50 50 53 47" stroke="#99584a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          )}
          {action === "looking" && (
            <circle cx="58" cy="48" r="1.5" fill="#99584a" />
          )}
          {(action === "reading" || action === "tea") && (
            <circle cx="50" cy="47" r="2" fill="#99584a" />
          )}

          {/* Resting Arms (Standing) */}
          {action === "standing" && (
            <g>
              <path d="M 40 52 L 35 65" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
              <path d="M 60 52 L 65 65" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {/* Binoculars */}
          {action === "looking" && (
            <g>
              <rect x="65" y="38" width="14" height="8" rx="2" fill="#F59E0B" />
              <rect x="79" y="39" width="4" height="6" rx="1" fill="#D97706" />
              <rect x="61" y="41" width="4" height="3" fill="#333" />
              {/* Arms holding binoculars */}
              <path d="M 58 55 L 68 45" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {/* Reading Book */}
          {action === "reading" && (
            <g>
              <rect x="38" y="55" width="24" height="16" rx="1.5" fill="#fff" transform="rotate(-5 50 60)" />
              <rect x="38" y="55" width="12" height="16" rx="1.5" fill="#F4F4F5" transform="rotate(-5 50 60)" />
              <path d="M 50 55 L 50 71" stroke="#E4E4E7" strokeWidth="1" transform="rotate(-5 50 60)" />
              {/* Arms holding book */}
              <path d="M 38 52 L 42 62" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
              <path d="M 62 52 L 58 62" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {/* Drinking Tea */}
          {action === "tea" && (
            <g>
              {/* Mug */}
              <rect x="52" y="52" width="10" height="12" rx="2" fill="#F43F5E" />
              <path d="M 62 55 Q 67 55 67 58 Q 67 61 62 61" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
              {/* Steam */}
              <motion.path 
                d="M 55 50 Q 57 46 55 44" 
                stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeLinecap="round"
                animate={{ y: [0, -3], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <motion.path 
                d="M 59 49 Q 61 45 59 43" 
                stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeLinecap="round"
                animate={{ y: [0, -3], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
              />
              {/* Arm holding mug */}
              <path d="M 45 55 L 52 58" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
            </g>
          )}
        </motion.g>
      </svg>
    </motion.div>
  );
}
