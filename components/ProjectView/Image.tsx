import React from "react";
import NextImage from "next/future/image";
import { motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { Figure } from "./FigureWrapper";
import ReactiveTapArea from "../ReactiveTapArea/ReactiveTapArea";

type Props = {
  width: number;
  height: number;
  src: string;
  caption?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
};

const Image = ({ src, width, height, fullWidth, caption, children }: Props) => {
  return (
    <Figure>
      <NextImage
        className="w-full object-cover rounded-xl"
        src={src}
        width={width}
        height={height}
      />
      {children}
    </Figure>
  );
};

export default Image;
