import { motion } from "framer-motion";
import React, { useState } from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  children: React.ReactNode;
  className?: string;
  motionScaleFactor?: number;
};

const ReactiveTapArea = ({
  children,
  className,
  motionScaleFactor = 1,
}: Props) => {
  const [cursorOffsetFromCenter, setCursorOffsetFromCenter] = useState({
    x: 0,
    y: 0,
  });

  return (
    <motion.div
      className={className}
      onMouseDown={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        const bounds = target.getBoundingClientRect();
        setCursorOffsetFromCenter({
          x: (e.clientX - bounds.x) / bounds.width - 0.5,
          y: (e.clientY - bounds.y) / bounds.height - 0.5,
        });
      }}
      onMouseMove={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        const bounds = target.getBoundingClientRect();
        setCursorOffsetFromCenter({
          x: (e.clientX - bounds.x) / bounds.width - 0.5,
          y: (e.clientY - bounds.y) / bounds.height - 0.5,
        });
      }}
    >
      <motion.div
        style={{
          transformPerspective: `100vw`,
          translateZ: "0vw",
        }}
        whileTap={{
          rotateY: cursorOffsetFromCenter.x * 5 * motionScaleFactor,
          rotateX: -cursorOffsetFromCenter.y * 7 * motionScaleFactor,
          translateZ: `-.${5}vw`,
        }}
        transition={{
          duration: AnimationConfig.FAST,
          ease: AnimationConfig.EASING,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ReactiveTapArea;
