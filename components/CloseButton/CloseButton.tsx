import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AnimationConfig } from "../AnimationConfig";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { CloseIcon } from "./Icon";

type Props = {
  overscrollProgress: MotionValue;
};

const CloseButton = ({ overscrollProgress }: Props) => {
  const rotation = useTransform(overscrollProgress, [0, 1], [0, 90]);
  const scale = useTransform(overscrollProgress, [0, 1], [1, 0.9]);
  const bgColor = useTransform(
    overscrollProgress,
    [0, 0.1, 1],
    ["rgba(50,50,50,.5)", "rgba(60,60,60,.9)", "rgba(60,60,60,.9)"]
  );

  return (
    <Link href="/">
      <motion.a
        className="inline-block rounded-full p-2 bg-[rgba(50,50,50,.6)] cursor-pointer"
        style={{
          rotate: rotation,
          scale: scale,
          backgroundColor: bgColor,
        }}
        // initial={{
        //   rotate: 90,
        // }}
        // animate={{
        //   rotate: 0,
        // }}
        whileHover={
          {
            // rotate: 90,
            // backgroundColor: "rgba(60,60,60,.9)",
          }
        }
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
