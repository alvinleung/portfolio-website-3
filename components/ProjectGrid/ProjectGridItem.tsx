import { motion, useScroll, useTransform } from "framer-motion";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ProjectInfo, ProjectStyle } from "./Project";
import ProjectCard from "./ProjectCard";

interface ProjectGridItemProps {
  isActive: boolean;
  isFirstRow: boolean;
  isSelected: boolean;
  projectStyle: ProjectStyle;
  projectInfo: ProjectInfo;
  onSelect?: (slug: string) => void;
}

const INACTIVE_TEXT_COLOR = "#3c4d51";
const INACTIVE_BG_COLOR = "#1E2222";

export const ProjectGridItem: React.FC<ProjectGridItemProps> = ({
  projectStyle,
  projectInfo,
  isActive,
  isFirstRow,
  onSelect,
}) => {
  const { scrollY } = useScroll();
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
    >
      {/* background media */}
      <ProjectCard
        opacity={boxOpacity}
        height={boxHeight}
        projectInfo={projectInfo}
        isFirstRow={isFirstRow}
        projectStyle={{
          textColor: isActive ? projectStyle.textColor : INACTIVE_TEXT_COLOR,
          bgColor: isActive ? projectStyle.bgColor : INACTIVE_BG_COLOR,
        }}
        isActive={isActive}
      ></ProjectCard>
    </motion.div>
  );
};
