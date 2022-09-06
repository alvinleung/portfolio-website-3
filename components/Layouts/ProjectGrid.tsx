import { motion } from "framer-motion";
import React from "react";

interface ProjectGridItemProps {
  isActive: boolean;
  textColor: string;
  bgColor: string;
  projectTitle: string;
  projectType?: string[];
}

const INACTIVE_TEXT_COLOR = "#1e4852";
const INACTIVE_BG_COLOR = "#1E2222";

const ProjectGridItem: React.FC<ProjectGridItemProps> = ({
  bgColor,
  textColor,
  projectTitle,
  projectType,
  isActive,
}) => {
  return (
    <motion.a
      className="relative h-[40vw] rounded-xl"
      animate={{
        backgroundColor: isActive ? bgColor : INACTIVE_BG_COLOR,
      }}
      transition={{
        duration: 0.3,
        ease: "linear",
      }}
    >
      <motion.div
        animate={{
          color: isActive ? textColor : INACTIVE_TEXT_COLOR,
        }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
      >
        <div className="grid grid-cols-2 p-4">
          <div>{projectTitle}</div>
          <div>
            {projectType &&
              projectType.map((type) => {
                return <div>{type}</div>;
              })}
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
};

type Props = {
  isViewing: boolean;
  projects: any[];
};
const ProjectGrid = ({ isViewing, projects }: Props) => {
  return (
    <motion.div className="grid grid-cols-3 gap-4 z-20 px-6">
      {projects.map((project) => (
        <ProjectGridItem
          textColor={project.meta.thumbnailTextColor}
          bgColor={project.meta.thumbnailBgColor}
          projectTitle={project.meta.title}
          projectType={project.meta.tags && project.meta.tags.split(",")}
          isActive={isViewing}
        />
      ))}
    </motion.div>
  );
};

export default ProjectGrid;
