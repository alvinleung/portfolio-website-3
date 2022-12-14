import { motion } from "framer-motion";
import React from "react";
import { AnimationConfig } from "../AnimationConfig";
import ProjectGrid from "../ProjectGrid/ProjectGrid";

type Props = {
  isViewing: boolean;
  isViewingTopBar: boolean;
  projects: any[];
};

const ProjectGridSection = ({
  isViewingTopBar,
  projects,
  isViewing,
}: Props) => {
  return (
    <section
      style={{
        pointerEvents: isViewing ? "all" : "none",
      }}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 pt-4 px-4 lg:px-6 grid grid-cols-2"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isViewingTopBar ? 1 : 0,
          y: isViewingTopBar ? 0 : 10,
          transition: {
            duration: AnimationConfig.FAST,
            ease: AnimationConfig.EASING,
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING_INVERTED,
          },
        }}
      >
        <div className="text-white text-left">Selected Works</div>
        <div className="text-white text-right">
          <a href="mailto:alvinleung2009@gmail.com" className="mr-4">
            Email
          </a>
          <a href="https://www.instagram.com/alvinn.design" target="blank">
            Instagram
          </a>
        </div>
      </motion.div>
      <ProjectGrid isViewing={isViewing} projects={projects} />
    </section>
  );
};

export default ProjectGridSection;
