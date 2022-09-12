import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import { AnimationConfig } from "../AnimationConfig";
import CloseButton from "../CloseButton/CloseButton";
import { usePageTransition } from "../PageTransition/PageTransitionContext";
import ProjectLinkButton from "../ProjectLinkButton/ProjectLinkButton";
import ProjectLinkCard from "../ProjectLinkButton/ProjectLinkCard";
import {
  ScrollDirection,
  useContainerScroll,
} from "../ScrollContainer/ScrollContainer";
import ProjectHeader from "./ProjectHeader";

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

const ProjectView = ({ children, bgColor, textColor }: Props) => {
  const anim = useAnimation();
  const contentContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const contentRef = useRef() as MutableRefObject<HTMLDivElement>;
  // const nextRef = useRef() as MutableRefObject<HTMLDivElement>;
  // const [contentHeight, setContentHeight] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldShowNextProject, setShouldShowNextProject] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { prevCardRef } = usePageTransition();
  const { scrollY, scrollDirection, scrollYProgress } = useContainerScroll();
  const windowDimension = useWindowDimension();

  const [shouldShowNav, setShouldShowNav] = useState(false);

  useEffect(() => {
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
        duration: AnimationConfig.SLOW,
        ease: AnimationConfig.EASING_IN_OUT,
      },
    });
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
  }, [scrollY, scrollYProgress]);

  useEffect(() => {
    if (!isReady) return;

    const containerBounds = contentContainerRef.current.getBoundingClientRect();

    if (shouldShowNextProject) {
      anim.start({
        scale: 0.965,
        transformOrigin: "bottom center",
        transition: {
          duration: AnimationConfig.SLOW,
          ease: AnimationConfig.EASING,
        },
      });
    } else {
      anim.start({
        scale: 1,
        transformOrigin: "bottom center",
        transition: {
          duration: AnimationConfig.SLOW,
          ease: AnimationConfig.EASING,
        },
      });
    }

    if (isScrolled) {
      anim.start({
        width: document.body.scrollWidth,
        left: 0,
        top: 0,
        transition: {
          duration: AnimationConfig.SLOW,
          ease: AnimationConfig.EASING,
        },
      });
      return;
    }
    anim.start({
      left: containerBounds.left,
      top: containerBounds.top,
      width: containerBounds.width,
      transition: {
        duration: AnimationConfig.FAST,
        ease: AnimationConfig.EASING,
      },
    });
  }, [isScrolled, isReady, windowDimension.width, shouldShowNextProject]);

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

  const handleAnimationComplete = () => {
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
        className="sticky left-0 right-0 top-0 z-20"
        exit={{
          opacity: 0,
        }}
      >
        <ProjectViewNavBar scrolled={isScrolled} />
      </motion.div>
      <article
        ref={contentContainerRef}
        className="mx-6 z-10"
        // style={{
        //   height: contentHeight,
        // }}
      >
        {/* Project Content */}
        <motion.div
          ref={contentRef}
          className="overflow-hidden rounded-xl absolute"
          animate={anim}
          exit={{
            opacity: 0,
            y: "20vh",
            transition: {
              duration: AnimationConfig.NORMAL,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
          onAnimationComplete={handleAnimationComplete}
          style={{
            backgroundColor: isReady ? "transparent" : bgColor,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative pb-24 rounded-xl"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {children}
          </motion.div>
          <motion.div
            className="mt-6"
            onViewportEnter={() => setShouldShowNextProject(true)}
            onViewportLeave={() => setShouldShowNextProject(false)}
          >
            <ProjectLinkCard isShowing={shouldShowNextProject} />
          </motion.div>
        </motion.div>
      </article>
    </>
  );
};

export default ProjectView;
