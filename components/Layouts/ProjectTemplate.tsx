import { motion, useAnimation } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import { AnimationConfig } from "../AnimationConfig";
import CloseButton from "../CloseButton/CloseButton";
import { usePageTransition } from "../PageTransition/PageTransitionContext";
import ProjectLinkButton from "../ProjectLinkButton/ProjectLinkButton";
import {
  ScrollDirection,
  useContainerScroll,
} from "../ScrollContainer/ScrollContainer";

type Props = {
  children: React.ReactNode;
  bgColor: string;
  textColor: string;
};

const ProjectViewNavBar = ({ scrolled }: any) => {
  return (
    <motion.div
      className="px-6 pt-6 pb-4 flex justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        delay: 0.3,
        duration: AnimationConfig.NORMAL,
        ease: AnimationConfig.EASING,
      }}
    >
      <CloseButton />
      <div className="flex flex-row items-center text-white">
        <div className="mr-4 text-[rgba(120,120,120,.7)]">Up Next</div>
        <ProjectLinkButton
          slug={"whatif"}
          projectName={"What if?"}
          scrolled={scrolled}
        />
      </div>
    </motion.div>
  );
};

const ProjectTemplate = ({ children, bgColor, textColor }: Props) => {
  const anim = useAnimation();
  const contentContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { prevCardRef } = usePageTransition();
  const { scrollY, scrollDirection } = useContainerScroll();
  const windowDimension = useWindowDimension();

  const [shouldShowNav, setShouldShowNav] = useState(false);

  useEffect(() => {
    console.log(prevCardRef.current);
    if (!prevCardRef?.current) {
      setIsReady(true);
      return;
    }
    const bounds = prevCardRef.current.getBoundingClientRect();
    const containerBounds = contentContainerRef.current.getBoundingClientRect();
    anim.set({
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
        duration: 0.5,
        ease: [0.81, 0.03, 0.06, 1],
      },
    });

    // setCanScroll(false);
  }, []);

  useEffect(() => {
    const unobserveScrollY = scrollY.onChange((val) => {
      if (val > 0) {
        setIsScrolled(true);
        return;
      }
      setIsScrolled(false);
    });

    return () => {
      unobserveScrollY();
    };
  }, [scrollY]);

  useEffect(() => {
    if (!isReady) return;
    if (isScrolled) {
      anim.start({
        width: document.body.scrollWidth,
        left: 0,
        top: 0,
      });

      return;
    }
    const containerBounds = contentContainerRef.current.getBoundingClientRect();
    anim.start({
      left: containerBounds.left,
      top: containerBounds.top,
      width: containerBounds.width,
    });
  }, [isScrolled, isReady, windowDimension.width]);

  useEffect(() => {
    let scrolledAmount = 0;
    const THRESHOLD = 200;
    const unobserveScroll = scrollY.onChange(() => {
      scrolledAmount += scrollY.getVelocity() / 100;
      if (scrolledAmount < -THRESHOLD) {
        setShouldShowNav(true);
        return;
      }
    });

    if (scrollDirection === ScrollDirection.DOWN) {
      setShouldShowNav(false);
    }

    return () => {
      unobserveScroll();
    };
  }, [scrollDirection]);

  const handleAnimationComplete = (endValue: any) => {
    setIsReady(true);
    anim.set({
      height: "auto",
    });
  };

  return (
    <>
      <motion.div
        animate={{
          opacity: shouldShowNav || !isScrolled ? 1 : 0,
        }}
        transition={{
          duration: AnimationConfig.FAST,
          ease: AnimationConfig.EASING,
        }}
        className="sticky left-0 right-0 top-0 z-10"
        exit={{
          opacity: 0,
          y: 300,
        }}
      >
        <ProjectViewNavBar scrolled={isScrolled} />
      </motion.div>
      <article className="px-6">
        <div ref={contentContainerRef} className="w-full">
          <motion.div
            className="overflow-hidden rounded-xl absolute"
            animate={anim}
            exit={{
              opacity: 0,
              y: "100vh",
            }}
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
      </article>
    </>
  );
};

export default ProjectTemplate;
