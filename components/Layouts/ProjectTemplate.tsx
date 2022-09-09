import { motion, useAnimation } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { prevCardRef } = usePageTransition();
  const { scrollY } = useContainerScroll();

  useEffect(() => {
    if (!prevCardRef?.current) {
      setIsReady(true);
      return;
    }
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
      height: window.innerHeight * 2,
      transition: {
        duration: 0.6,
        ease: [0.81, 0.03, 0.06, 1],
      },
    });

    // setCanScroll(false);
  }, []);

  useEffect(() => {
    scrollY.onChange((val) => {
      if (val > 0) {
        setIsScrolled(true);
        return;
      }
      setIsScrolled(false);
    });
  }, [scrollY]);

  useEffect(() => {
    if (!isReady) return;

    if (isScrolled) {
      anim.start({
        width: window.innerWidth,
        top: 0,
        left: 0,
      });
      return;
    }
    const containerBounds = contentContainerRef.current.getBoundingClientRect();
    anim.start({
      left: containerBounds.left,
      top: containerBounds.top,
      width: containerBounds.width,
    });
  }, [isScrolled, isReady]);

  const handleAnimationComplete = (endValue: any) => {
    setIsReady(true);
    anim.set({
      height: "auto",
    });
  };

  return (
    <div className="px-4 pt-16">
      <div ref={contentContainerRef} className="w-full">
        <motion.div
          className="overflow-hidden rounded-xl"
          animate={anim}
          onAnimationComplete={handleAnimationComplete}
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectTemplate;
