import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import { AnimationConfig } from "../AnimationConfig";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { getProjectInfo, getProjectStyle } from "../../lib/ProjectInfo";
import { ProjectGridItem } from "./ProjectGridItem";
import { useBoundingBox } from "../../hooks/useBoundingClientRect";
import { breakpoints } from "../../hooks/useBreakpoints";
import { useHomeScrollPosition } from "../HomeScrollPositionContext";

type Props = {
  isViewing: boolean;
  projects: any[];
};
const ProjectGrid = ({ isViewing, projects }: Props) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [gridCols, setGridCols] = useState(3);
  const { scrollY } = useContainerScroll();

  const windowDimension = useWindowDimension();
  useEffect(() => {
    if (windowDimension.width > breakpoints.md) {
      setGridCols(2);
      return;
    }
    setGridCols(1);
  }, [windowDimension.width]);

  const [containerRef, bounds] = useBoundingBox<HTMLDivElement>([]);

  const transformOrigin = useTransform(
    scrollY,
    (value) => `center ${value + windowDimension.height / 2}px`
  );

  return (
    <>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 z-20 px-4 md:px-6 pb-8"
        ref={containerRef}
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
            gridBoundTop={bounds.top}
            key={index}
            isActive={isViewing}
            onSelect={setSelectedProject}
            selectedProject={selectedProject}
            // isFirstRow={index < 3}
            projectRow={Math.floor(index / gridCols)}
            projectInfo={getProjectInfo(project.meta)}
            projectStyle={getProjectStyle(project.meta)}
            index={index}
          />
        ))}
      </motion.div>
    </>
  );
};

export default ProjectGrid;
