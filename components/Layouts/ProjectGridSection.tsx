import { motion } from "framer-motion";
import React from "react";
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
        className="fixed top-0 left-0 right-0 pt-4 px-6 grid grid-cols-3"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isViewingTopBar ? 0.4 : 0,
        }}
        exit={{
          opacity: 0,
        }}
        whileHover={{
          opacity: isViewingTopBar ? 0.8 : 0,
        }}
        transition={{
          duration: 0.15,
          ease: "linear",
        }}
      >
        <div className="text-white text-left">Instagram</div>
        <div className="text-white text-center">Alvin Leung</div>
        <div className="text-white text-right">Email</div>
      </motion.div>
      <ProjectGrid isViewing={isViewing} projects={projects} />
    </section>
  );
};

export default ProjectGridSection;
