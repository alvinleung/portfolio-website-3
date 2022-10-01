import React, { useState } from "react";
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
  rowSpan?: number;
  children: React.ReactNode;
};

const Image = ({
  src,
  width,
  height,
  fullWidth,
  caption,
  children,
  rowSpan = 1,
}: Props) => {
  return (
    <Figure rowSpan={rowSpan}>
      <NextImage
        className="w-full object-cover rounded-xl invisible"
        src={src}
        width={width}
        height={height}
      />
      {children}
    </Figure>
  );
};

export default Image;
