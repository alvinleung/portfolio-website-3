import { motion, MotionValue } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useOverscroll } from "../../hooks/useOverscroll";
import { ProjectInfo, ProjectStyle } from "../../lib/ProjectInfo";
import { AnimationConfig } from "../AnimationConfig";
import CloseButton from "../CloseButton/CloseButton";
import OverscrollAction from "../OverscrollAction/OverscrollAction";
import ProjectLinkButton from "../ProjectLinkButton/ProjectLinkButton";

type Props = {
  scrolled: boolean;
  nextProjectStyle: ProjectStyle;
  nextProjectInfo: ProjectInfo;
  overscrollProgress: MotionValue<number>;
};

const ProjectViewNavBar = ({
  scrolled,
  nextProjectStyle,
  nextProjectInfo,
  overscrollProgress,
}: Props) => {
  return (
    <motion.div
      className="px-6 2xl:px-16 pt-6 pb-4 flex justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        delay: 0.3,
        duration: AnimationConfig.NORMAL,
        ease: AnimationConfig.EASING,
      }}
    >
      <CloseButton overscrollProgress={overscrollProgress} />
      <div className="flex flex-row items-center text-white">
        <div className="mr-4 text-[rgba(120,120,120,.9)]">Next</div>
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
