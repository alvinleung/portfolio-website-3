import {
  motion,
  useAnimation,
  useIsPresent,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import { AnimationConfig } from "../AnimationConfig";
import CloseButton from "../CloseButton/CloseButton";
import { usePageTransition } from "../PageTransition/PageTransitionContext";
import { ProjectInfo, ProjectStyle } from "../../lib/ProjectInfo";
import ProjectLinkButton from "../ProjectLinkButton/ProjectLinkButton";
import ProjectLinkCard from "../ProjectLinkButton/ProjectLinkCard";
import {
  ScrollDirection,
  useContainerScroll,
} from "../ScrollContainer/ScrollContainer";
import ProjectHeader from "../Layouts/ProjectHeader";
import ProjectViewNavBar from "./ProjectViewNavBar";
import { useColorContext } from "./ColorShifter";
import useIsFirstRender from "../../hooks/useIsFirstRender";

type Props = {
  children: React.ReactNode;
  projectStyle: ProjectStyle;
  projectInfo: ProjectInfo;
  nextProjectStyle: ProjectStyle;
  nextProjectInfo: ProjectInfo;
  coverImage: string;
};

const USE_SIMPLE_TRANSITION = true;

const ProjectView = ({
  children,
  projectStyle,
  nextProjectStyle,
  nextProjectInfo,
  coverImage,
}: Props) => {
  const anim = useAnimation();
  const contentContainerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const textColor = projectStyle.getTextColor();
  const { currentColor } = useColorContext();
  const bgColor = currentColor;

  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldShowNextProject, setShouldShowNextProject] = useState(false);
  const { prevCardRef } = usePageTransition();
  const { scrollY, scrollDirection, scrollYProgress } = useContainerScroll();
  const windowDimension = useWindowDimension();

  const [shouldShowNav, setShouldShowNav] = useState(false);

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

  const [shrinkedScale, setShrinkedScale] = useState(1);
  useEffect(() => {
    setShrinkedScale(1 - 128 / window.innerWidth);
  }, [contentContainerRef, windowDimension.width]);

  const [transformOrigin, setTransformOrigin] = useState("center top");
  useEffect(() => {
    const unobserveScroll = scrollYProgress.onChange((val) => {
      if (val > 0.5) {
        setTransformOrigin("center bottom");
        return;
      }
      setTransformOrigin("center top");
    });

    return () => {
      unobserveScroll();
    };
  }, []);

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

  useEffect(() => {
    if (USE_SIMPLE_TRANSITION) {
      anim.set({
        scale: 0.8,
        y: window.innerHeight / 3,
        opacity: 0,
      });

      return;
    }

    if (!prevCardRef.current) {
      anim.set({
        scale: 0.8,
        y: window.innerHeight / 3,
        opacity: 0,
      });
      return;
    }
    const containerBounds = prevCardRef.current.getBoundingClientRect();
    const y = containerBounds.top;
    const x =
      containerBounds.left + containerBounds.width / 2 - window.innerWidth / 2;
    const wScale = containerBounds.width / window.innerWidth;

    anim.set({
      // scale: 0.8,
      scale: wScale,
      x: x,
      y: y,
      opacity: 0,
    });
  }, []);

  const isAnimInDone = useRef(false);
  const isPresent = useIsPresent();

  useEffect(() => {
    if (!isPresent) return;
    if (!isAnimInDone.current && !isScrolled) {
      anim.start({
        scale: shrinkedScale,
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          duration: AnimationConfig.VERY_SLOW,
          ease: AnimationConfig.EASING_IN_OUT,
        },
      });
      return;
    }
    if (shouldShowNextProject) {
      anim.start({
        scale: shrinkedScale,
        opacity: 1,
        transition: {
          duration: AnimationConfig.FAST,
          ease: AnimationConfig.EASING,
        },
      });
      return;
    }

    if (isScrolled) {
      anim.start({
        scale: isScrolled && !shouldShowNextProject ? 1 : shrinkedScale,
        y: isScrolled && !shouldShowNextProject ? -100 : 0,
        opacity: 1,
        transition: {
          duration: AnimationConfig.SLOW,
          ease: AnimationConfig.EASING,
        },
      });
      return;
    }

    if (!isScrolled) {
      anim.start({
        scale: isScrolled && !shouldShowNextProject ? 1 : shrinkedScale,
        y: isScrolled && !shouldShowNextProject ? -100 : 0,
        opacity: 1,
        transition: {
          duration: AnimationConfig.FAST,
          ease: AnimationConfig.EASING,
        },
      });
      return;
    }

    anim.start({
      scale: isScrolled && !shouldShowNextProject ? 1 : shrinkedScale,
      y: isScrolled && !shouldShowNextProject ? -100 : 0,
      opacity: 1,
      transition: {
        duration: AnimationConfig.NORMAL,
        ease: AnimationConfig.EASING,
      },
    });
  }, [isScrolled, shouldShowNextProject, shrinkedScale, isPresent]);

  const handleAnimComplete = () => {
    isAnimInDone.current = true;
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
        <ProjectViewNavBar
          scrolled={isScrolled}
          nextProjectStyle={nextProjectStyle}
          nextProjectInfo={nextProjectInfo}
        />
      </motion.div>
      {/* <motion.article ref={contentContainerRef} className="mx-6 2xl:mx-16 z-10"> */}
      <article ref={contentContainerRef} className="z-10 h-[90%]">
        <motion.div
          onAnimationComplete={handleAnimComplete}
          style={{
            willChange: "scale, y",
            transformOrigin: transformOrigin,
          }}
          initial={{
            scale: 0.8,
            y: 100,
            opacity: 0,
          }}
          animate={anim}
          exit={{
            opacity: 0,
            y: 100,
            transition: {
              duration: AnimationConfig.FAST,
              ease: AnimationConfig.EASING_INVERTED,
            },
          }}
        >
          <motion.div
            initial={{ backgroundColor: bgColor, color: textColor }}
            animate={{ backgroundColor: bgColor, color: textColor }}
            // exit={{ opacity: 0 }}
            transition={{ delay: 0, duration: AnimationConfig.NORMAL }}
            className="relative pb-24 rounded-xl"
          >
            {children}
          </motion.div>
          <motion.div
            className="mt-6"
            onViewportEnter={() => setShouldShowNextProject(true)}
            onViewportLeave={() => setShouldShowNextProject(false)}
          >
            <ProjectLinkCard
              isShowing={shouldShowNextProject}
              projectStyle={nextProjectStyle}
              projectInfo={nextProjectInfo}
            />
          </motion.div>
        </motion.div>
      </article>
    </>
  );
};

export default ProjectView;
