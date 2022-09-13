import { motion } from "framer-motion";
import React from "react";
import { ProjectInfo, ProjectStyle } from "../../lib/Project_Info";
import { AnimationConfig } from "../AnimationConfig";
import CloseButton from "../CloseButton/CloseButton";
import ProjectLinkButton from "../ProjectLinkButton/ProjectLinkButton";

type Props = {
  scrolled: boolean;
  nextProjectStyle: ProjectStyle;
  nextProjectInfo: ProjectInfo;
};

const ProjectViewNavBar = ({
  scrolled,
  nextProjectStyle,
  nextProjectInfo,
}: Props) => {
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
          scrolled={scrolled}
          projectStyle={nextProjectStyle}
          projectInfo={nextProjectInfo}
        />
      </div>
    </motion.div>
  );
};

export default ProjectViewNavBar;
