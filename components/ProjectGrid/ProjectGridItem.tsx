import { motion, useScroll, useTransform } from "framer-motion";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { usePageTransition } from "../PageTransition/PageTransitionContext";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import {
  getProjectStyle,
  ProjectInfo,
  ProjectStyle,
} from "../../lib/ProjectInfo";
import ProjectCard from "./ProjectCard";

interface ProjectGridItemProps {
  isActive: boolean;
  isFirstRow: boolean;
  selectedProject: string;
  projectStyle: ProjectStyle;
  projectInfo: ProjectInfo;
  onSelect?: (slug: string) => void;
}

export const ProjectGridItem: React.FC<ProjectGridItemProps> = ({
  projectStyle,
  projectInfo,
  isActive,
  isFirstRow,
  onSelect,
  selectedProject,
}) => {
  const { scrollY } = useContainerScroll();
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const TOP_OFFSET = 58;
  const [beginShrinkPos, setBeginShrinkPos] = useState(100);
  const [endShrinkPos, setEndShrinkPos] = useState(200);
  const [boxContainerHeight, setBoxContainerHeight] = useState(200);
  const boxTransitionOutProgress = useTransform(
    scrollY,
    [beginShrinkPos, endShrinkPos],
    [1, 0]
  );
  const boxOpacity = useTransform(boxTransitionOutProgress, [0, 0.1], [0, 1]);
  const boxHeight = useTransform(
    boxTransitionOutProgress,
    (val) => val * boxContainerHeight
  );

  const { prevCardRef } = usePageTransition();
  const cardRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    if (prevCardRef && selectedProject === projectInfo.slug) {
      prevCardRef.current = cardRef.current;
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleResize = () => {
      const bounds = containerRef.current.getBoundingClientRect();
      const beginShrinkPos = bounds.top - TOP_OFFSET + window.scrollY;
      setBeginShrinkPos(beginShrinkPos);
      setEndShrinkPos(beginShrinkPos + bounds.height);
      setBoxContainerHeight(bounds.height);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="sticky top-14 h-[40vw]"
      onClick={() => onSelect?.(projectInfo.slug)}
      exit={{
        opacity: selectedProject === projectInfo.slug ? 1 : 0,
      }}
    >
      {/* background media */}
      <ProjectCard
        cardRef={cardRef}
        opacity={boxOpacity}
        height={boxHeight}
        projectInfo={projectInfo}
        isFirstRow={isFirstRow}
        projectStyle={projectStyle}
        isActive={isActive}
      ></ProjectCard>
    </motion.div>
  );
};
