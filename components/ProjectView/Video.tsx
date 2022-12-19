import { motion } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { Figure } from "./FigureWrapper";
import VideoProgressCursor from "../VideoProgressCursor/VideoProgressCursor";
import { ProgressRing } from "../VideoProgressCursor/ProgressRing";
import ReactiveTapArea from "../ReactiveTapArea/ReactiveTapArea";

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
  const [isInView, setIsInView] = useState(false);
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
      if (!vidDuration) return;

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

  const [isScrubbing, setIsScrubbing] = useState(false);
  useEffect(() => {
    let isDragging = false;
    let dragBeginX = 0;
    let initialScrubTime = playerRef.current.currentTime;

    const handleDragStart = (e: PointerEvent) => {
      isDragging = true;
      dragBeginX = e.clientX;
      initialScrubTime = playerRef.current.currentTime;
      playerRef.current.pause();
      setIsScrubbing(true);
    };
    const handleDragMove = (e: PointerEvent) => {
      if (!isDragging || !playerRef.current) return;

      const offset = e.clientX - dragBeginX;
      playerRef.current.currentTime = initialScrubTime + offset / 100;
    };
    const handleDragEnd = () => {
      isDragging = false;
      playerRef.current.play();
      setIsScrubbing(false);
    };

    playerRef.current.addEventListener("pointerdown", handleDragStart);
    window.addEventListener("pointermove", handleDragMove);
    playerRef.current.addEventListener("pointerup", handleDragEnd);

    return () => {
      if (!playerRef.current) return;

      playerRef.current.removeEventListener("pointerdown", handleDragStart);
      window.removeEventListener("pointermove", handleDragMove);
      playerRef.current.removeEventListener("pointerup", handleDragEnd);
    };
  }, [playerRef.current]);

  return (
    <Figure rowSpan={rowSpan}>
      {!seekOnScroll && (
        <VideoProgressCursor playerRef={playerRef} isScrubbing={isScrubbing} />
      )}
      <ReactiveTapArea
        className={`w-full ${
          fillHeight ? "md:h-full" : ""
        } md:object-cover rounded-xl overflow-hidden`}
      >
        <motion.video
          onMouseEnter={() => setShouldPlay(true)}
          onMouseLeave={() => setShouldPlay(false)}
          className={`w-full ${
            fillHeight ? "md:h-full" : ""
          } md:object-cover rounded-xl`}
          ref={playerRef}
          style={{
            visibility: isInView ? "visible" : "hidden",
            cursor: seekOnScroll ? "auto" : "none",
          }}
          // animate={{
          //   opacity: seekOnScroll || shouldPlay ? 1 : 0.5,
          // }}
          onViewportEnter={() => setIsInView(true)}
          onViewportLeave={() => setIsInView(false)}
          // whileTap={{
          //   scale: 1.01,
          // }}
          src={src}
          width={width}
          height={height}
          preload={shouldPlay || seekOnScroll ? "auto" : preload}
          autoPlay={seekOnScroll ? false : true}
          muted
          loop
        />
        {children}
      </ReactiveTapArea>
    </Figure>
  );
};

export default Video;
