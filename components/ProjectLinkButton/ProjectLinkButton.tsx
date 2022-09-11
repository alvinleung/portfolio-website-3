import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type Props = {
  slug: string;
  projectName: string;
  bgColor?: string;
  onColor?: string;
};

const ProjectLinkButton = ({ slug, projectName, bgColor, onColor }: Props) => {
  return (
    <Link href={`/projects/${slug}`}>
      <motion.a
        whileTap={{
          scale: 0.95,
        }}
        className="inline-flex justify-center rounded-full leading-none py-3 px-4 bg-[rgba(60,60,60,.7)] cursor-pointer backdrop-blur-md"
      >
        <motion.div
          className="w-[1em] h-[1em] mr-3 rounded-full"
          animate={{ backgroundColor: "#555" }}
        ></motion.div>
        {projectName}
      </motion.a>
    </Link>
  );
};

export default ProjectLinkButton;
