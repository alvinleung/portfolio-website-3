import { motion, useAnimation } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { AnimationConfig } from "../AnimationConfig";
import { usePageTransition } from "../PageTransition/PageTransitionContext";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";

type Props = {
  children: React.ReactNode;
  bgColor: string;
  textColor: string;
};

const ProjectTemplate = ({ children, bgColor, textColor }: Props) => {
  const anim = useAnimation();
  const contentContainerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { setCanScroll } = useContainerScroll();

  const { prevCardRef } = usePageTransition();
  useEffect(() => {
    if (!prevCardRef?.current) return;
    const bounds = prevCardRef.current.getBoundingClientRect();
    const containerBounds = contentContainerRef.current.getBoundingClientRect();

    anim.set({
      position: "absolute",
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
      top: bounds.top,
      overflow: "hidden",
    });
    anim.start({
      left: containerBounds.left,
      top: containerBounds.top,
      width: containerBounds.width,
      height: containerBounds.height * 2,
      transition: {
        duration: 0.5,
        ease: [0.81, 0.03, 0.06, 1],
      },
      overflow: "scroll",
    });

    setCanScroll(false);
  }, []);

  return (
    <div className="px-4 pt-16 h-screen">
      <div ref={contentContainerRef} className="w-full h-full">
        <motion.div
          className="overflow-hidden rounded-xl"
          animate={anim}
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectTemplate;
