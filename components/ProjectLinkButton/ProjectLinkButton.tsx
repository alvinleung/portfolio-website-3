import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  slug: string;
  projectName: string;
  bgColor?: string;
  onColor?: string;

  scrolled: boolean;
};

const ProjectLinkButton = ({
  slug,
  projectName,
  bgColor,
  onColor,
  scrolled,
}: Props) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link href={`/projects/${slug}`}>
      <motion.a
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
          backgroundColor: isHovering ? "#292C12" : "rgba(50,50,50,.6)",
          color: isHovering ? "#EBFC30" : "rgba(255,255,255,1)",
        }}
        className="inline-flex justify-center rounded-full leading-none py-3 px-4 bg-[#292C12] text-[#EBFC30] cursor-pointer backdrop-blur-md"
      >
        <motion.div
          className="w-[1em] h-[1em] mr-3 rounded-full"
          animate={{
            backgroundColor: "#EBFC30",
          }}
        ></motion.div>
        {projectName}
      </motion.a>
    </Link>
  );
};

export default ProjectLinkButton;
