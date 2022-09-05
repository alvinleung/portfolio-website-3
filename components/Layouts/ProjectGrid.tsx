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
};
const ProjectGrid = ({ isViewing }: Props) => {
  return (
    <motion.div className="grid grid-cols-3 gap-4 z-20 px-6">
      <ProjectGridItem
        textColor="#1C1E26"
        bgColor="#F1F1F1"
        projectTitle="iDAGIO"
        projectType={["Experience Design"]}
        isActive={isViewing}
      />
      <ProjectGridItem
        textColor="#EDFF31"
        bgColor="#292C12"
        projectTitle="What If?"
        projectType={["Interaction Design"]}
        isActive={isViewing}
      />
      <ProjectGridItem
        textColor="#FFF"
        bgColor="#020202"
        projectTitle="TEDxSFU"
        projectType={["Art Direction", "Interaction Desgin", "Web Dev"]}
        isActive={isViewing}
      />
      <ProjectGridItem
        textColor="#1C1E26"
        bgColor="#F1F1F1"
        projectTitle="Daybreak Studio"
        projectType={["Interaction Design", "Web Dev"]}
        isActive={isViewing}
      />
      <ProjectGridItem
        textColor="#F1F1F1"
        bgColor="#020202"
        projectTitle="Creative Coding Experiments"
        isActive={isViewing}
      />
      <ProjectGridItem
        textColor="#F1F1F1"
        bgColor="#020202"
        projectTitle="Posters a Day (2022)"
        isActive={isViewing}
      />
      <ProjectGridItem
        textColor="#F1F1F1"
        bgColor="#020202"
        projectTitle="Visual Design Projects (2018-2022)"
        isActive={isViewing}
      />
    </motion.div>
  );
};

export default ProjectGrid;
