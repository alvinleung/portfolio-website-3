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
import { clamp } from "../../lib/clamp";
import { AnimationConfig } from "../AnimationConfig";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";

type Props = { isViewingGrid: boolean };

const LANDING_THEME_BG = "#192220";
const DEFAULT_BG = "#0e1010";

const ExternalLinkAnimation = {
  default: {
    opacity: 1,
  },
  hover: { opacity: 0.6 },
  active: {
    opacity: 1,
  },
};
const ExternalLinkIconAnimation = {
  default: {
    rotate: 1,
  },
  hover: {
    rotate: 10,
  },
};

const ExternalLink = ({
  children,
  href,
  icon = "icon/icon-link.svg",
  alt,
}: {
  children: string;
  alt?: string;
  href?: string;
  icon?: string;
}) =>
  href ? (
    <motion.a
      href={href}
      target="blank"
      className="flex relative items-center"
      initial={"default"}
      whileHover={"hover"}
      whileTap={"active"}
      variants={ExternalLinkAnimation}
      transition={{
        ease: AnimationConfig.EASING,
        duration: AnimationConfig.VERY_FAST,
      }}
    >
      <motion.img
        className="mr-2 -left-[2em] w-[1.2em] h-[1.2em]"
        src={icon}
        alt={alt}
        variants={ExternalLinkIconAnimation}
      />
      <div>{children}</div>
    </motion.a>
  ) : (
    <div className="flex relative items-center">
      <img
        className="mr-2 -left-[2em] w-[1.2em] h-[1.2em]"
        src="icon/icon-empty.svg"
        alt={alt}
      />
      <div>{children}</div>
    </div>
  );

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

  const isFirstRender = useIsFirstRender();
  const isOutsideScrollArea =
    isFirstRender ||
    (scrollContainerRef.current &&
      scrollContainerRef.current.scrollTop > bounds.height);

  return (
    <>
      <motion.div
        className="fixed w-full h-full -z-10"
        style={{ backgroundColor: isOutsideScrollArea ? DEFAULT_BG : bgColour }}
        // initial={{ backgroundColor: DEFAULT_BG }}
        // animate={{
        //   backgroundColor: LANDING_THEME_BG,
        // }}
        exit={{
          backgroundColor: DEFAULT_BG,
        }}
      ></motion.div>
      <motion.section
        className="relative h-[40vh]"
        ref={boundRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isFirstRender || isViewingGrid ? 0 : 1 }}
      >
        <motion.div
          className="fixed px-4 py-4 md:px-6 md:py-6 grid grid-cols-6 grid-rows-[1fr] gap-2 md:h-[100vh] "
          onWheel={(e) => {
            scrollContainerRef.current.scrollTop =
              scrollContainerRef.current.scrollTop + e.deltaY;
          }}
          style={{
            scale: heroScale,
            opacity: isOutsideScrollArea ? 0 : heroOpacity,
            // filter: filter,
            // y: yPos,
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
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-light tracking-[-.047em] lg:leading-[1.08em]">
              Alvin Leung is an interaction designer. He thrives in bringing
              wild concepts from 0 to 1 using his prototyping wizardry and
              aesthetic sensibility. Previously designed @ Daybreak Studio &
              Dossier Creative.
            </h1>
            <p className="mt-4 text-sm sm:text-base"></p>
          </div>

          <div className="col-start-1 col-span-3 lg:col-start-5 lg:col-span-1 row-start-2 lg:row-start-2 flex flex-col opacity-60 lg:mb-64 text-sm xl:text-base">
            <h3 className="uppercase mb-3 text-sm">Previous Clients</h3>
            <ul>
              <li>
                <ExternalLink href={"https://pager.xyz/"}>Pager</ExternalLink>
              </li>
              <li>
                <ExternalLink href={"https://www.curated.xyz/"}>
                  Curated
                </ExternalLink>
              </li>
              <li>
                <ExternalLink>QuirkChat</ExternalLink>
              </li>
            </ul>
          </div>
          <div className="col-start-4 col-span-3 lg:col-start-6 lg:col-span-1 row-start-2 lg:row-start-2 flex flex-col opacity-60 text-sm xl:text-base">
            <h3 className="uppercase mb-3 text-sm">Let's be in Touch</h3>
            <ExternalLink
              href={"https://read.cv/alvinleung"}
              icon={"icon/icon-cv.svg"}
              alt={"My Resume"}
            >
              My CV
            </ExternalLink>
            <ExternalLink
              href={"https://www.instagram.com/alvinn.design/"}
              icon={"icon/icon-instagram.svg"}
              alt={"Visit alvin's instagram"}
            >
              Instagram
            </ExternalLink>
            <ExternalLink
              href={"mailto:alvinleung2009@gmail.com"}
              icon={"icon/icon-mail.svg"}
              alt={"Say Hello!"}
            >
              Email
            </ExternalLink>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default LandingHero;
