import { motion } from "framer-motion";
import Link from "next/link";
import React, { MutableRefObject, useRef, useState } from "react";
import {
  getProjectLink,
  ProjectInfo,
  ProjectStyle,
} from "../../lib/ProjectInfo";
import { AnimationConfig } from "../AnimationConfig";
import { usePageTransition } from "../PageTransition/PageTransitionContext";

type Props = {
  projectStyle: ProjectStyle;
  projectInfo: ProjectInfo;
  scrolled: boolean;
};

const ProjectLinkButton = ({ projectStyle, projectInfo }: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const linkRef = useRef() as MutableRefObject<HTMLAnchorElement>;
  const { prevCardRef } = usePageTransition();

  const handleClick = () => {
    prevCardRef.current = linkRef.current;
  };

  const color = projectStyle.dark;

  return (
    <Link href={getProjectLink(projectInfo.slug)}>
      <motion.a
        onClickCapture={handleClick}
        ref={linkRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        transition={{
          duration: AnimationConfig.FAST,
          ease: AnimationConfig.EASING,
        }}
        whileTap={{
          scale: 0.95,
        }}
        animate={{
          backgroundColor: isHovering ? projectStyle.accent : color,
          // : "rgba(50,50,50,.6)",
          color: isHovering ? color : projectStyle.accent,
        }}
        className="inline-flex justify-center rounded-full leading-none py-3 px-4 cursor-pointer backdrop-blur-md"
      >
        <motion.div
          className="w-[1em] h-[1em] mr-3 rounded-full"
          animate={{
            backgroundColor: isHovering ? color : projectStyle.accent,
          }}
          transition={{
            duration: AnimationConfig.FAST,
            ease: AnimationConfig.EASING,
          }}
        ></motion.div>
        {projectInfo.title}
      </motion.a>
    </Link>
  );
};

export default ProjectLinkButton;
