import React from "react";
import ProjectGridItem from "./ProjectGridItem";
import { getProjectInfo, getProjectStyle } from "../../lib/ProjectInfo";

type Props = {
  projects: any[];
};

const ProjectGrid = ({ projects }: Props) => {
  return (
    <div className="flex gap-4">
      <div>
        <div className="sticky top-4" style={{ writingMode: "vertical-rl" }}>
          Selected Works
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 w-full">
        {projects.map((project, index) => {
          const projectInfo = getProjectInfo(project.meta);
          const projectStyle = getProjectStyle(project.meta);

          return (
            <ProjectGridItem
              projectRow={Math.floor((index + 1) / 2)}
              projectStyle={projectStyle}
              projectInfo={projectInfo}
              isWide={index === 0}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGrid;
