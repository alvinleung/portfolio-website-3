import { motion } from "framer-motion";
import Link from "next/link";
import React, { MutableRefObject, useRef } from "react";
import { AnimationConfig } from "../AnimationConfig";
import ProjectHeader from "../Layouts/ProjectHeader";
import { usePageTransition } from "../PageTransition/PageTransitionContext";

type Props = {
  isShowing: boolean;
};

const ProjectLinkCard = ({ isShowing }: Props) => {
  const linkRef = useRef() as MutableRefObject<HTMLAnchorElement>;
  const { prevCardRef } = usePageTransition();
  const handleClick = () => {
    prevCardRef.current = linkRef.current;
  };

  return (
    <Link href="/projects/whatif">
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
          className="block h-64 rounded-tl-xl rounded-tr-xl relative cursor-pointer"
          style={{ backgroundColor: "#EBFC30", color: "#000" }}
          onClickCapture={handleClick}
          ref={linkRef}
          whileTap={{
            scale: 0.99,
          }}
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
