import { motion } from "framer-motion";
import Link from "next/link";
import React, { MutableRefObject, useRef } from "react";
import {
  getProjectLink,
  getProjectLogo,
  ProjectInfo,
  ProjectStyle,
} from "../../lib/Project_Info";
import { AnimationConfig } from "../AnimationConfig";
import ProjectHeader from "../Layouts/ProjectHeader";
import { usePageTransition } from "../PageTransition/PageTransitionContext";

type Props = {
  isShowing: boolean;
  projectStyle: ProjectStyle;
  projectInfo: ProjectInfo;
};

const ProjectLinkCard = ({ isShowing, projectStyle, projectInfo }: Props) => {
  const linkRef = useRef() as MutableRefObject<HTMLAnchorElement>;
  const { prevCardRef } = usePageTransition();
  const handleClick = () => {
    prevCardRef.current = linkRef.current;
  };

  return (
    <Link href={getProjectLink(projectInfo.slug)}>
      <motion.div
        exit={{ opacity: 0 }}
        animate={{
          scale: isShowing ? 1 : 0.9,
          opacity: isShowing ? 1 : 0,
        }}
        transition={{
          duration: AnimationConfig.SLOW,
          ease: AnimationConfig.EASING,
        }}
      >
        <motion.a
          className="block h-72 rounded-tl-xl rounded-tr-xl relative cursor-pointer"
          style={{
            backgroundColor: projectStyle.getBgColor(),
            color: projectStyle.getTextColor(),
          }}
          onClickCapture={handleClick}
          ref={linkRef}
          whileTap={{
            scale: 0.99,
          }}
          transition={{
            duration: AnimationConfig.FAST,
            ease: AnimationConfig.EASING,
          }}
        >
          <ProjectHeader projectInfo={projectInfo} />
        </motion.a>
      </motion.div>
    </Link>
  );
};

export default ProjectLinkCard;
