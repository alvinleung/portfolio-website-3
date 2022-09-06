import { motion } from "framer-motion";
import React, { useState } from "react";
import { ProjectGridItem } from "./ProjectGridItem";

type Props = {
  isViewing: boolean;
  projects: any[];
};
const ProjectGrid = ({ isViewing, projects }: Props) => {
  const [selectedProject, setSelectedProject] = useState("");
  return (
    <>
      <motion.div className="grid grid-cols-3 gap-4 z-20 px-6 pb-8">
        {projects.map((project, index) => (
          <ProjectGridItem
            key={index}
            isActive={isViewing}
            onSelect={setSelectedProject}
            isSelected={selectedProject === project.slug}
            isFirstRow={index < 3}
            projectInfo={{
              slug: project.slug,
              title: project.meta.title,
              tags: project.meta.tags && project.meta.tags.split(","),
            }}
            projectStyle={{
              bgColor: project.meta.thumbnailBgColor,
              textColor: project.meta.thumbnailTextColor,
            }}
          />
        ))}
      </motion.div>
    </>
  );
};

export default ProjectGrid;
