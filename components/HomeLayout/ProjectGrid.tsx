import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ProjectGridItem from "./ProjectGridItem";
import { getProjectInfo, getProjectStyle } from "../../lib/ProjectInfo";
import {
  breakpoints,
  useAllBreakpoints,
  useBreakpoint,
  useBreakpointValues,
} from "../../hooks/useBreakpoints";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import { useBoundingBox } from "../../hooks/useBoundingClientRect";
import { motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  projects: any[];
};

export enum GridLayoutState {
  lg = "large",
  md = "medium",
  sm = "small",
}

const ProjectGrid = ({ projects }: Props) => {
  const currentBreakpoint = useAllBreakpoints();
  const shouldEmphasiseFirst = currentBreakpoint > breakpoints.md;
  const rowOffset = shouldEmphasiseFirst ? 1 : 0;
  const isTwoColumns = currentBreakpoint > breakpoints.sm;

  const windowDimension = useWindowDimension();
  const gridBeginRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [topOffset, setTopOffset] = useState(0);
  const [gridItemHeight, setGridItemHeight] = useState(550);

  useEffect(() => {
    if (currentBreakpoint >= breakpoints.lg) {
      setGridItemHeight(windowDimension.width * 0.37);
      return;
    }
    if (currentBreakpoint >= breakpoints.md) {
      setGridItemHeight(windowDimension.width * 0.55);
      return;
    }

    setGridItemHeight(windowDimension.width * 0.9);
  }, [windowDimension.width, currentBreakpoint]);

  useEffect(() => {
    setTopOffset(currentBreakpoint < breakpoints.lg ? 336 : 0);
  }, [currentBreakpoint]);

  return (
    <div className="flex gap-4">
      <div>
        <motion.div
          className="sticky top-4"
          style={{ writingMode: "vertical-rl" }}
        >
          Selected Works
        </motion.div>
      </div>
      <div
        className="grid gap-2 w-full"
        ref={gridBeginRef}
        style={{
          gridTemplateColumns: isTwoColumns ? "1fr 1fr" : "1fr",
        }}
      >
        {projects.map((project, index) => {
          const projectInfo = getProjectInfo(project.meta);
          const projectStyle = getProjectStyle(project.meta);
          const currentRow = isTwoColumns
            ? Math.floor((index + rowOffset) / 2)
            : index;

          return (
            <ProjectGridItem
              cardHeight={gridItemHeight}
              projectRow={currentRow}
              projectStyle={projectStyle}
              projectInfo={projectInfo}
              topOffset={topOffset}
              isWide={shouldEmphasiseFirst && index === 0}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGrid;
