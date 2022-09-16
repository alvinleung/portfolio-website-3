import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState } from "react";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import { AnimationConfig } from "../AnimationConfig";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { getProjectInfo, getProjectStyle } from "../../lib/ProjectInfo";
import { ProjectGridItem } from "./ProjectGridItem";

type Props = {
  isViewing: boolean;
  projects: any[];
};
const ProjectGrid = ({ isViewing, projects }: Props) => {
  const [selectedProject, setSelectedProject] = useState("");
  const { scrollY } = useContainerScroll();

  const windowDimension = useWindowDimension();

  const transformOrigin = useTransform(
    scrollY,
    (value) => `center ${value - windowDimension.height / 2}px`
  );

  return (
    <>
      <motion.div
        className="grid md:grid-cols-3 gap-4 z-20 px-6 pb-8"
        style={{
          transformOrigin: transformOrigin,
        }}
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          scale: 0.9,
        }}
        transition={{
          duration: AnimationConfig.NORMAL,
          ease: AnimationConfig.EASING_INVERTED,
        }}
      >
        {projects.map((project, index) => (
          <ProjectGridItem
            key={index}
            isActive={isViewing}
            onSelect={setSelectedProject}
            selectedProject={selectedProject}
            isFirstRow={index < 3}
            projectInfo={getProjectInfo(project.meta)}
            projectStyle={getProjectStyle(project.meta)}
          />
        ))}
      </motion.div>
    </>
  );
};

export default ProjectGrid;
