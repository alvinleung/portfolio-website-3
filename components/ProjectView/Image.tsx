import React from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { Figure } from "./FigureWrapper";

type Props = {
  width: number;
  height: number;
  src: string;
  caption?: string;
  fullWidth?: boolean;
};

const Image = ({ src, width, height, fullWidth, caption }: Props) => {
  return (
    <Figure caption={caption}>
      <motion.img
        className="w-full h-full object-cover"
        src={src}
        width={width}
        height={height}
      />
    </Figure>
  );
};

export default Image;
