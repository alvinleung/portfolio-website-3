import { motion } from "framer-motion";
import React from "react";
import { getProjectLogo, ProjectInfo } from "../../lib/ProjectInfo";

type Props = {
  projectInfo: ProjectInfo;
};

const ProjectHeader = ({ projectInfo }: Props) => {
  return (
    <motion.div className="absolute left-0 right-0 top-0 px-8 py-8 grid grid-cols-[2fr_1fr]">
      <img src={getProjectLogo(projectInfo.slug)} className="h-12" />
      <div>
        <h1 className="text-2xl text-normal tracking-tightest leading-[1em] max-w-[432px]">
          {projectInfo.description}
        </h1>
        <div className="mt-8 opacity-50 leading-tight">{projectInfo.scope}</div>
        {projectInfo.tags && (
          <div className="mt-6 opacity-50 leading-tight">
            {projectInfo.tags.map((tag: string, index: number) => {
              return <div key={index}>{tag}</div>;
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectHeader;
