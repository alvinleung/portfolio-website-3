import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { AnimationConfig } from "../AnimationConfig";
import { CloseIcon } from "./Icon";

type Props = {};

const CloseButton = (props: Props) => {
  return (
    <Link href="/">
      <motion.a
        className="inline-block rounded-full p-2 bg-[rgba(50,50,50,.6)] cursor-pointer"
        initial={{
          rotate: 90,
        }}
        animate={{
          rotate: 0,
        }}
        whileHover={{
          // rotate: 90,
          backgroundColor: "rgba(60,60,60,.9)",
        }}
        whileTap={{
          scale: 0.95,
        }}
        transition={{
          duration: AnimationConfig.FAST,
          ease: AnimationConfig.EASING,
        }}
      >
        <CloseIcon />
      </motion.a>
    </Link>
  );
};

export default CloseButton;
