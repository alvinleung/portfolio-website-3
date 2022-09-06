import { motion } from "framer-motion";
import React, { useState } from "react";
import { ProjectGridItem } from "../ProjectGrid/ProjectGridItem";

type Props = {
  isViewing: boolean;
  isViewingTopBar: boolean;
  projects: any[];
};
const ProjectGrid = ({ isViewing, isViewingTopBar, projects }: Props) => {
  const [selectedProject, setSelectedProject] = useState("");

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
