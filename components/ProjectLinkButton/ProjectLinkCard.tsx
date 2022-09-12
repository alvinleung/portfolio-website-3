import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { AnimationConfig } from "../AnimationConfig";
import ProjectHeader from "../Layouts/ProjectHeader";

type Props = {
  isShowing: boolean;
};

const ProjectLinkCard = ({ isShowing }: Props) => {
  return (
    <Link href="/projects/whatif">
      <motion.div
        exit={{ opacity: 0 }}
        animate={{
          scale: isShowing ? 1 : 0.97,
        }}
        transition={{
          duration: 0.4,
          ease: AnimationConfig.EASING_IN_OUT,
        }}
      >
        <motion.a
          className="block mx-6 h-64 rounded-xl relative cursor-pointer"
          style={{ backgroundColor: "#EBFC30", color: "#000" }}
        >
          <ProjectHeader
            projectLogoSource={""}
            meta={{
              description:
                "Expressive post-event microsite for a speculative art exhibition",
              scope: "8 weeks project",
              tags: "Interaction Design, Art Direction",
            }}
          />
        </motion.a>
      </motion.div>
    </Link>
  );
};

export default ProjectLinkCard;
