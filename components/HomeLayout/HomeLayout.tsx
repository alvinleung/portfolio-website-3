import React, { useEffect, useState } from "react";
import ProjectGrid from "./ProjectGrid";
import { motion, transform } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { ExternalLink } from "../Layouts/ExternalLink";
import debounce from "../../lib/debounce";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useWindowDimension } from "../../hooks/useWindowDimension";

type Props = {
  projects: any[];
};

const HomeLayout = ({ projects }: Props) => {
  const windowDimension = useWindowDimension();
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const { scrollY } = useContainerScroll();
  useEffect(() => {
    const updateTransformOrigin = debounce((value: number) => {
      setTransformOrigin(`center ${value + windowDimension.height / 2}px`);
    }, 200);
    const unobserve = scrollY.onChange(updateTransformOrigin);
    return () => {
      unobserve();
    };
  }, [windowDimension.width]);

  return (
    <motion.div
      style={{ transformOrigin: transformOrigin }}
      className="grid lg:grid-cols-3 grid-flow-dense gap-4 mx-6 text-cyan-50"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          delay: 0.25,
          duration: AnimationConfig.VERY_SLOW,
          ease: AnimationConfig.EASING_DRAMATIC,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        transition: {
          // delay: 0,
          duration: AnimationConfig.SLOW,
          ease: AnimationConfig.EASING_INVERTED,
        },
      }}
    >
      <div className="lg:col-start-3">
        <motion.div
          className="sticky top-0 py-4 flex flex-col h-80 lg:h-screen"
          initial={{ opacity: 0, scale: 0.97 }}
          style={{
            transformOrigin: "center left",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.25,
              duration: AnimationConfig.VERY_SLOW,
              ease: AnimationConfig.EASING_DRAMATIC,
            },
          }}
        >
          <motion.div
            className="text-xl sm:text-2xl lg:text-4xl font-light tracking-[-.047em] lg:leading-[1.08em] "
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_DRAMATIC,
              },
            }}
          >
            Alvin Leung is an interaction designer. He thrives in bringing wild
            concepts from 0 to 1 using his prototyping wizardry and aesthetic
            sensibility. Previously designed @ Daybreak Studio & Dossier
            Creative.
          </motion.div>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.2,
                duration: AnimationConfig.NORMAL,
                ease: AnimationConfig.EASING,
              },
            }}
          >
            He has worked with clients like <a>Pager</a> and <a>Quirk Chat</a>
          </motion.div>
          <div className="mt-auto">
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
              @alvinn.design
            </ExternalLink>
            <ExternalLink
              href={"mailto:alvinleung2009@gmail.com"}
              icon={"icon/icon-mail.svg"}
              alt={"Say Hello!"}
            >
              alvinleung2009@gmail.com
            </ExternalLink>
          </div>
        </motion.div>
      </div>
      <div className="lg:col-span-2 mb-4">
        <ProjectGrid projects={projects} />
      </div>
    </motion.div>
  );
};

export default HomeLayout;
