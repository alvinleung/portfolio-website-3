import { motion, useScroll, useTransform } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import ProjectCard from "../ProjectGrid/ProjectCard";

interface ProjectGridItemProps {
  isActive: boolean;
  isFirstRow: boolean;
  textColor: string;
  bgColor: string;
  projectTitle: string;
  projectType?: string[];
  slug: string;
}

const INACTIVE_TEXT_COLOR = "#1e4852";
const INACTIVE_BG_COLOR = "#1E2222";

const ProjectGridItem: React.FC<ProjectGridItemProps> = ({
  bgColor,
  textColor,
  projectTitle,
  projectType,
  isActive,
  isFirstRow,
  slug,
}) => {
  const { scrollY } = useScroll();

  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const TOP_OFFSET = 64;

  const [beginShrinkPos, setBeginShrinkPos] = useState(100);
  const [endShrinkPos, setEndShrinkPos] = useState(200);

  const boxTransitionOutProgress = useTransform(
    scrollY,
    [beginShrinkPos, endShrinkPos],
    [1, 0]
  );

  const boxOpacity = useTransform(boxTransitionOutProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    const handleResize = () => {
      const bounds = containerRef.current.getBoundingClientRect();
      const beginShrinkPos = bounds.top - TOP_OFFSET + window.scrollY;
      setBeginShrinkPos(beginShrinkPos);
      setEndShrinkPos(beginShrinkPos + bounds.height);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div ref={containerRef} className="sticky top-14">
      {/* background media */}
      <ProjectCard
        opacity={boxOpacity}
        bgColor={isActive ? bgColor : INACTIVE_BG_COLOR}
        textColor={isActive ? textColor : INACTIVE_TEXT_COLOR}
        projectTitle={projectTitle}
        projectType={projectType}
        isFirstRow={isFirstRow}
        slug={slug}
      ></ProjectCard>
    </motion.div>
  );
};

type Props = {
  isViewing: boolean;
  isViewingTopBar: boolean;
  projects: any[];
};
const ProjectGrid = ({ isViewing, isViewingTopBar, projects }: Props) => {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 pt-4 px-6 grid grid-cols-3"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isViewingTopBar ? 0.4 : 0,
        }}
        whileHover={{
          opacity: isViewingTopBar ? 1 : 0,
        }}
        transition={{
          duration: 0.15,
          ease: "linear",
        }}
      >
        <div className="text-white text-left">Instagram</div>
        <div className="text-white text-center">Alvin Leung</div>
        <div className="text-white text-right">alvinleung2009@gmail.com</div>
      </motion.div>
      <motion.div className="grid grid-cols-3 gap-4 z-20 px-6 pb-8">
        {projects.map((project, index) => (
          <ProjectGridItem
            key={index}
            isFirstRow={index < 3}
            slug={project.slug}
            textColor={project.meta.thumbnailTextColor}
            bgColor={project.meta.thumbnailBgColor}
            projectTitle={project.meta.title}
            projectType={project.meta.tags && project.meta.tags.split(",")}
            isActive={isViewing}
          />
        ))}
      </motion.div>
    </>
  );
};

export default ProjectGrid;
