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
    <section>
      <motion.div
        className="fixed top-0 left-0 right-0 pt-4 px-4 lg:px-6 grid grid-cols-2"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isViewingTopBar ? 1 : 0,
          y: isViewingTopBar ? 0 : 10,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: AnimationConfig.VERY_FAST,
          ease: AnimationConfig.EASING,
        }}
      >
        <div className="text-white text-left">I am pretty happy with these</div>
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
