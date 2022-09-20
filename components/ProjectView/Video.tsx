import { motion } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { Figure } from "./FigureWrapper";

type Props = {
  src: string;
  width: number;
  height: number;
  seekOnScroll: boolean;
  fillHeight?: boolean;
  frameRate: number;
  rowSpan?: number;
  children?: React.ReactNode;
  preload: string;
};

const Video = ({
  src,
  width,
  height,
  seekOnScroll,
  frameRate = 12,
  fillHeight,
  children,
  rowSpan = 1,
  preload = "metadata",
}: Props) => {
  const [shouldPlay, setShouldPlay] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const playerRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const { scrollY } = useContainerScroll();

  useEffect(() => {
    if (!seekOnScroll) return;
    if (!shouldPlay) return;

    const initialScrollPos = scrollY.get();
    const unobserveScroll = scrollY.onChange((scrollPos) => {
      const offset = Math.abs(initialScrollPos - scrollPos);
      const adjustedOffset = offset / 2000;

      const vidDuration = playerRef.current.duration;
      const targetTime =
        adjustedOffset / vidDuration - Math.floor(adjustedOffset / vidDuration);
      const targetFrame = Math.floor(targetTime * frameRate);

      setCurrentFrame(targetFrame);
    });

    return () => {
      unobserveScroll();
    };
  }, [shouldPlay, frameRate, seekOnScroll]);

  useEffect(() => {
    if (!seekOnScroll) return;

    const animFrame = requestAnimationFrame(() => {
      if (!playerRef.current) return;

      playerRef.current.currentTime = currentFrame / frameRate;
    });
    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [currentFrame, seekOnScroll]);

  useEffect(() => {
    if (!playerRef.current || seekOnScroll) return;

    if (shouldPlay) {
      playerRef.current.play();
      return;
    }
    playerRef.current.pause();
  }, [shouldPlay, playerRef, seekOnScroll]);

  return (
    <Figure rowSpan={rowSpan}>
      <motion.video
        className={`w-full ${
          fillHeight ? "md:h-full" : ""
        } md:object-cover rounded-xl`}
        ref={playerRef}
        style={{
          visibility: shouldPlay ? "visible" : "hidden",
        }}
        onViewportEnter={() => setShouldPlay(true)}
        onViewportLeave={() => setShouldPlay(false)}
        src={src}
        width={width}
        height={height}
        // autoPlay={seekOnScroll ? false : true}
        muted
        loop
      />
      {children}
    </Figure>
  );
};

export default Video;
