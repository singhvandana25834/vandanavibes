
"use client";

import Tilt from "react-parallax-tilt";
import { ReactNode } from "react";

interface TiltWrapperProps {
  children: ReactNode;
  className?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
}

export default function TiltWrapper({ 
  children, 
  className = "", 
  tiltMaxAngleX = 5, 
  tiltMaxAngleY = 5,
  scale = 1.02
}: TiltWrapperProps) {
  return (
    <Tilt
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      scale={scale}
      transitionSpeed={2000}
      className={className}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="1rem"
    >
      {children}
    </Tilt>
  );
}

