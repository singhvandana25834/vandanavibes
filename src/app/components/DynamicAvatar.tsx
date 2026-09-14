"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DynamicAvatarProps {
  gender: "boy" | "girl";
  hours: number;
}

export default function DynamicAvatar({ gender, hours }: DynamicAvatarProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-16 h-16 bg-surface-lavender rounded-full animate-pulse" />;

  // Determine Stage based on hours
  let stage = 1;
  if (hours >= 17) stage = 7;
  else if (hours >= 14) stage = 6;
  else if (hours >= 11) stage = 5;
  else if (hours >= 8) stage = 4;
  else if (hours >= 5) stage = 3;
  else if (hours >= 2) stage = 2;

  // Colors
  const skinColor = "#FFC8B3";
  const boyHair = "#2C1E16";
  const girlHair = "#3D2B1F";
  const girlDress = "#6044BF";
  const boyShirt = "#3B82F6"; // Blue
  const deskColor = "#8B5A2B";

  // Animations based on stage
  const isFloating = stage === 6;
  const isSleeping = stage === 7;
  const hasAura = stage === 6;

  return (
    <div className="relative w-16 h-16 rounded-full bg-surface-light border border-surface-lavender overflow-hidden flex items-end justify-center shadow-sm">
      {hasAura && (
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/40 to-transparent animate-pulse" />
      )}
      
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 overflow-visible">
        <motion.g 
          animate={isFloating ? { y: [-2, 2, -2] } : { y: isSleeping ? 10 : 0 }} 
          transition={isFloating ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : {}}
        >
          {/* Girl Back Hair */}
          {gender === "girl" && (
            <g>
              <path d="M 35 40 Q 20 65 30 75 Q 35 50 45 45" fill={girlHair} />
              <path d="M 65 40 Q 80 65 70 75 Q 65 50 55 45" fill={girlHair} />
            </g>
          )}

          {/* Body */}
          {gender === "girl" ? (
            <path d="M 35 60 L 25 90 L 75 90 L 65 60 Z" fill={girlDress} />
          ) : (
            <path d="M 30 60 L 20 90 L 80 90 L 70 60 Z" fill={boyShirt} />
          )}

          {/* Head */}
          <circle cx="50" cy="45" r="18" fill={skinColor} />

          {/* Hair (Front) */}
          {gender === "girl" ? (
            <path d="M 32 45 Q 32 25 50 25 Q 68 25 68 45 Q 60 35 50 38 Q 40 35 32 45 Z" fill={girlHair} />
          ) : (
            <path d="M 30 40 Q 30 20 50 20 Q 70 20 70 40 Q 60 30 50 32 Q 40 30 30 40 Z" fill={boyHair} />
          )}

          {/* Messy Hair (Stage 4 & 5) */}
          {(stage === 4 || stage === 5) && (
            <g stroke={gender === "girl" ? girlHair : boyHair} strokeWidth="2" strokeLinecap="round">
              <path d="M 40 25 L 35 15" />
              <path d="M 50 22 L 52 12" />
              <path d="M 60 25 L 65 18" />
            </g>
          )}

          {/* Expressions */}
          <g transform={isSleeping ? "translate(0, 5)" : ""}>
            {/* Dark Circles (Stage 3, 4, 5) */}
            {stage >= 3 && stage <= 5 && (
              <g fill="rgba(0,0,0,0.1)">
                <ellipse cx="43" cy="51" rx="4" ry="2" />
                <ellipse cx="57" cy="51" rx="4" ry="2" />
              </g>
            )}

            {/* Eyes */}
            {stage === 1 ? (
              // Fresh
              <g fill="#111">
                <circle cx="43" cy="45" r="2.5" />
                <circle cx="57" cy="45" r="2.5" />
              </g>
            ) : stage === 2 ? (
              // Focused
              <g fill="#111">
                <circle cx="43" cy="45" r="2" />
                <circle cx="57" cy="45" r="2" />
              </g>
            ) : stage === 3 || stage === 4 ? (
              // Tired / Stressed
              <g stroke="#111" strokeWidth="2" strokeLinecap="round" fill="none">
                <path d="M 41 45 L 45 45" />
                <path d="M 55 45 L 59 45" />
              </g>
            ) : stage === 5 ? (
              // Zombie (Half closed)
              <g stroke="#111" strokeWidth="2" strokeLinecap="round" fill="none">
                <path d="M 41 46 Q 43 44 45 46" />
                <path d="M 55 46 Q 57 44 59 46" />
              </g>
            ) : stage === 6 ? (
              // God Mode (Glowing Eyes)
              <g fill="#FBBF24">
                <circle cx="43" cy="45" r="3" />
                <circle cx="57" cy="45" r="3" />
              </g>
            ) : (
              // Sleeping
              <g stroke="#111" strokeWidth="2" strokeLinecap="round" fill="none">
                <path d="M 40 47 Q 43 50 46 47" />
                <path d="M 54 47 Q 57 50 60 47" />
              </g>
            )}

            {/* Glasses (Stage 2) */}
            {stage === 2 && (
              <g stroke="#333" strokeWidth="1.5" fill="none">
                <rect x="38" y="41" width="10" height="8" rx="2" />
                <rect x="52" y="41" width="10" height="8" rx="2" />
                <path d="M 48 45 L 52 45" />
              </g>
            )}

            {/* Mouth */}
            {stage === 1 ? (
              // Smiling
              <path d="M 45 52 Q 50 56 55 52" stroke="#99584a" strokeWidth="2" fill="none" strokeLinecap="round" />
            ) : stage === 2 ? (
              // Serious/Focused
              <path d="M 47 53 L 53 53" stroke="#99584a" strokeWidth="1.5" strokeLinecap="round" />
            ) : stage === 5 ? (
              // Drooling / open mouth
              <circle cx="50" cy="54" r="2.5" fill="#99584a" />
            ) : stage === 6 ? (
              // Smirk
              <path d="M 48 53 Q 50 54 54 51" stroke="#99584a" strokeWidth="2" fill="none" strokeLinecap="round" />
            ) : stage === 7 ? (
              // Sleeping
              <circle cx="50" cy="53" r="1.5" fill="#99584a" />
            ) : (
              // Neutral/Tired
              <path d="M 46 53 Q 50 52 54 53" stroke="#99584a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            )}
          </g>

          {/* Props (Arms and Items) */}
          
          {/* Coffee Mug (Stage 3 & 4) */}
          {(stage === 3 || stage === 4) && (
            <g>
              <rect x="58" y="65" width="12" height="14" rx="2" fill="#F43F5E" />
              <path d="M 70 68 Q 75 68 75 71 Q 75 75 70 75" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
              <path d="M 45 65 L 60 70" stroke={skinColor} strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {/* Pen & Writing (Stage 2) */}
          {stage === 2 && (
            <g>
              <path d="M 30 75 L 45 65" stroke={skinColor} strokeWidth="4" strokeLinecap="round" />
              <path d="M 40 65 L 50 55" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* Sleeping Bubble (Stage 7) */}
          {stage === 7 && (
            <motion.g 
              animate={{ y: [0, -10], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <text x="60" y="30" fontSize="12" fill="#8B5CF6" fontWeight="bold">Z</text>
              <text x="68" y="20" fontSize="16" fill="#8B5CF6" fontWeight="bold">Z</text>
            </motion.g>
          )}

        </motion.g>

        {/* Desk (Foreground) */}
        <path d="M 10 85 L 90 85 L 100 100 L 0 100 Z" fill={deskColor} opacity="0.9" />
        <rect x="0" y="85" width="100" height="2" fill="#5C3A21" opacity="0.5" />
      </svg>

      {/* Stage Number Badge (For debugging/fun) */}
      <div className="absolute bottom-1 right-1 bg-white/90 rounded-full w-4 h-4 flex items-center justify-center shadow-sm z-20">
        <span className="text-[9px] font-bold text-primary">{stage}</span>
      </div>
    </div>
  );
}
