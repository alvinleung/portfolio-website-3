import {
  motion,
  useIsPresent,
  usePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useBoundingBox } from "../../hooks/useBoundingClientRect";
import useIsFirstRender from "../../hooks/useIsFirstRender";
import { AnimationConfig } from "../AnimationConfig";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";

type Props = { isViewingGrid: boolean };

const LANDING_THEME_BG = "#192220";
const DEFAULT_BG = "#0e1010";

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

const LandingHero = ({ isViewingGrid }: Props) => {
  const { scrollY, scrollContainerRef } = useContainerScroll();
  const [boundRef, bounds] = useBoundingBox([]);
  const introSectionHeight = bounds.height;

  const progress = useTransform(scrollY, (val) =>
    clamp(val, 0, introSectionHeight)
  );

  const bgColour = useTransform(
    progress,
    [0, introSectionHeight],
    [LANDING_THEME_BG, DEFAULT_BG]
  );

  const heroScale = useTransform(progress, [0, introSectionHeight], [1, 0.97]);
  const heroOpacity = useTransform(progress, [0, introSectionHeight], [1, 0]);
  // const filter = useTransform(scrollY, (v) => `blur(${v / 100}px)`);
  // const yPos = useTransform(scrollY, (v) => -v * 0.1);

  const isOutsideScrollArea =
    scrollContainerRef.current &&
    scrollContainerRef.current.scrollTop > bounds.height;

  return (
    <>
      <motion.div
        className="fixed w-full h-full -z-10"
        style={{ backgroundColor: isOutsideScrollArea ? DEFAULT_BG : bgColour }}
        initial={{ backgroundColor: DEFAULT_BG }}
        animate={{
          backgroundColor: LANDING_THEME_BG,
        }}
        exit={{
          backgroundColor: DEFAULT_BG,
        }}
      ></motion.div>
      <motion.section
        className="relative h-[40vh]"
        ref={boundRef}
        animate={{ opacity: isViewingGrid ? 0 : 1 }}
      >
        <motion.div
          className="fixed px-4 py-4 md:px-6 md:py-6 grid grid-cols-6 grid-rows-[1fr] gap-2 md:h-[80vh] -z-10"
          style={{
            scale: heroScale,
            opacity: isOutsideScrollArea ? 0 : heroOpacity,
            // filter: filter,
            // y: yPos,
          }}
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ease: AnimationConfig.EASING,
              duration: AnimationConfig.NORMAL,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            transition: {
              ease: AnimationConfig.EASING_INVERTED,
              duration: AnimationConfig.NORMAL,
            },
          }}
        >
          <div className="col-start-1 col-span-full 2xl:col-span-4 flex flex-col">
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-normal tracking-[-.02em] lg:leading-[1.08em]">
              Alvin Leung is an interaction designer. <br /> Informed by
              business and user needs, he thrives in using his aesthetic
              sensibility and prototyping wizardry to bring wild concepts from 0
              to 1. Previously designed @ Daybreak Studio & Dossier Creative.
            </h1>
            <p className="mt-4 text-sm sm:text-base"></p>
          </div>

          <div className="col-start-1 col-span-3 lg:col-start-5 lg:col-span-1 row-start-2 lg:row-start-2 flex flex-col opacity-60 lg:mb-0 text-sm xl:text-base">
            <h3 className="uppercase mb-3 text-sm">Previous Clients</h3>
            <ul>
              <li>Pager (backed by Google Venture)</li>
              <li>QuirkChat</li>
              <li>Curated</li>
            </ul>
          </div>
          <div className="col-start-4 col-span-3 lg:col-start-6 lg:col-span-1 row-start-2 lg:row-start-2 flex flex-col opacity-60 text-sm xl:text-base">
            <h3 className="uppercase mb-3 text-sm">Find Me</h3>
            <a href="https://www.instagram.com/alvinn.design/" target="blank">
              Instagram
            </a>
            <a href="mailto:alvinleung2009@gmail.com">
              alvinleung2009@gmail.com
            </a>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default LandingHero;
