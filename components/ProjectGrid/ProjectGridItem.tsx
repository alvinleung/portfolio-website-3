import { motion, useScroll, useTransform } from "framer-motion";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePageTransition } from "../PageTransition/PageTransitionContext";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import {
  getProjectStyle,
  ProjectInfo,
  ProjectStyle,
} from "../../lib/ProjectInfo";
import ProjectCard from "./ProjectGridCard";
import { useMobileBreakpoint } from "../../hooks/useBreakpoints";

interface ProjectGridItemProps {
  gridBoundTop: number;
  projectRow: number;
  isActive: boolean;
  // isFirstRow: boolean;
  index: number;
  selectedProject: string;
  projectStyle: ProjectStyle;
  projectInfo: ProjectInfo;
  onSelect?: (slug: string) => void;
}

export const ProjectGridItem: React.FC<ProjectGridItemProps> = ({
  projectStyle,
  projectRow,
  projectInfo,
  isActive,
  // isFirstRow,
  gridBoundTop,
  onSelect,
  selectedProject,
  index,
}) => {
  const { scrollY } = useContainerScroll();
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const TOP_OFFSET = 58;
  const [beginShrinkPos, setBeginShrinkPos] = useState(100);
  const [endShrinkPos, setEndShrinkPos] = useState(200);
  const [boxContainerHeight, setBoxContainerHeight] = useState(1000);
  const boxTransitionOutProgress = useTransform(
    scrollY,
    [beginShrinkPos, endShrinkPos],
    [1, 0]
  );

  const isBiggerThanMobile = useMobileBreakpoint();
  const boxOpacity = useTransform(boxTransitionOutProgress, [0, 0.1], [0, 1]);
  const boxHeight = useTransform(boxTransitionOutProgress, (val) => {
    return val * boxContainerHeight;
  });
  const parallaxY = useTransform(boxTransitionOutProgress, (val) => {
    return isBiggerThanMobile ? (1 - val) * -boxContainerHeight * 0.5 : 0;
  });

  const cardRef = useRef() as MutableRefObject<HTMLDivElement>;
  // const { prevCardRef } = usePageTransition();
  // useEffect(() => {
  //   if (prevCardRef && selectedProject === projectInfo.slug) {
  //     prevCardRef.current = cardRef.current;
  //   }
  // }, [selectedProject]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const projectGridGap = 16;
      const heroSectionHeightVH = 0.2;

      const bounds = containerRef.current.getBoundingClientRect();
      const beginShrinkPos =
        window.innerHeight * heroSectionHeightVH +
        projectRow * (bounds.height + projectGridGap) -
        TOP_OFFSET;
      setBeginShrinkPos(beginShrinkPos);
      setEndShrinkPos(beginShrinkPos + bounds.height);
      setBoxContainerHeight(bounds.height);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [projectRow]);

  return (
    <motion.div
      ref={containerRef}
      className="sticky top-14 h-[110vw] md:h-[60vw] lg:h-[48vw]"
      onClick={() => onSelect?.(projectInfo.slug)}
      exit={{
        opacity: 0,
        // opacity: selectedProject === projectInfo.slug ? 1 : 0,
      }}
    >
      {/* background media */}
      <ProjectCard
        index={index}
        cardRef={cardRef}
        opacity={boxOpacity}
        parallaxY={parallaxY}
        height={boxHeight}
        projectInfo={projectInfo}
        projectStyle={projectStyle}
        isActive={isActive}
      ></ProjectCard>
    </motion.div>
  );
};
