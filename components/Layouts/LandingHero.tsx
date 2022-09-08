import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";

type Props = {};

const LANDING_THEME_BG = "#1d2b2a";
const DEFAULT_BG = "#0e1010";

const LandingHero = (props: Props) => {
  const { scrollY } = useContainerScroll();
  const introSectionHeight = 700;
  const bgColour = useTransform(
    scrollY,
    [0, introSectionHeight],
    [LANDING_THEME_BG, DEFAULT_BG]
  );
  const heroScale = useTransform(scrollY, [0, introSectionHeight], [1, 0.97]);
  const heroOpacity = useTransform(scrollY, [0, introSectionHeight], [1, 0]);

  return (
    <>
      <motion.div
        className="fixed w-full h-full -z-10"
        style={{ backgroundColor: bgColour }}
        exit={{
          backgroundColor: DEFAULT_BG,
        }}
      ></motion.div>
      <motion.section className="relative h-[90vh]">
        <motion.div
          className="fixed px-6 py-6 grid grid-cols-6 grid-rows-[1fr] gap-4 h-[80vh]  -z-10"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <div className="col-start-1 col-end-5 flex flex-col">
            <h1 className="text-6xl font-normal tracking-[-.03em]">
              Alvin Leung is an interaction designer. Informed by business and
              user needs, he thrives in using his aesthetic sensibility and
              prototyping wizardry to bring wild concepts from 0 to 1.
            </h1>
            <p className="mt-4">
              Previously designed @ Daybreak Studio & Dossier Creative
            </p>
          </div>

          <div className="col-start-5 row-start-2 col-end-auto flex flex-col opacity-60 pl-4">
            <h3 className="uppercase mb-3">Previous Clients</h3>
            <ul>
              <li>Pager (backed by Google Venture)</li>
              <li>QuirkChat</li>
              <li>Curated</li>
            </ul>
          </div>
          <div className="col-start-6 row-start-2 col-end-auto flex flex-col opacity-60">
            <h3 className="uppercase mb-3">Find Me</h3>
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
