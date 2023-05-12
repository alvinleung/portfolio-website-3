import React, {
  MutableRefObject,
  useEffect,
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
  const gridItemHeight = useBreakpointValues(
    {
      md: windowDimension.width * 0.55,
      lg: windowDimension.width * 0.37,
      default: windowDimension.width * 0.9,
    },
    [windowDimension.width]
  );

  useEffect(() => {
    const bound = gridBeginRef.current?.getBoundingClientRect();
    setTopOffset(bound?.top as number);
  }, [currentBreakpoint]);

  // console.log(gridItemHeight == windowDimension.width * 0.37);

  // const gridItemHeight = useMemo(() => {
  //   if (currentBreakpoint > breakpoints.md) return windowDimension.width * 0.37;
  //   if (currentBreakpoint > breakpoints.sm) return windowDimension.width * 0.55;
  //   return 550;
  // }, [currentBreakpoint]);

  // const gridTopOffset = useMemo(() => {
  //   if (currentBreakpoint > breakpoints.md) return 50;
  //   if (currentBreakpoint > breakpoints.sm) return 50;
  //   return 550;
  // }, [currentBreakpoint]);

  return (
    <div className="flex gap-4">
      <div>
        <div className="sticky top-4" style={{ writingMode: "vertical-rl" }}>
          Selected Works
        </div>
      </div>
      <div
        className="grid gap-4 w-full"
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
