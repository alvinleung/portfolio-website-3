import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ProjectInfo,
  ProjectStyle,
  getProjectCover,
} from "../../lib/ProjectInfo";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import Link from "next/link";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import ReactiveTapArea from "../ReactiveTapArea/ReactiveTapArea";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  projectStyle: ProjectStyle;
  projectInfo: ProjectInfo;
  projectRow: number;
  isWide: boolean;
  cardHeight: number;
  firstRowHeight: number;
  topOffset: number;
};

const INACTIVE_BG_COLOR = "rgb(37, 55, 52)";

const TRANSPARENT_IMAGE = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`;

const ProjectGridItem = ({
  projectInfo,
  projectStyle,
  projectRow,
  firstRowHeight,
  cardHeight,
  topOffset,
  isWide,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isLoading = useMemo(
    () => !isImageLoaded && !isWide,
    [isImageLoaded, isWide]
  );

  const [isHovering, setIsHovering] = useState(false);

  const { scrollY } = useContainerScroll();
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [beginShrinkPos, setBeginShrinkPos] = useState(100);
  const [endShrinkPos, setEndShrinkPos] = useState(200);
  const [boxContainerHeight, setBoxContainerHeight] = useState(1000);
  const boxTransitionOutProgress = useTransform(
    scrollY,
    [beginShrinkPos, endShrinkPos],
    [1, 0]
  );

  const boxHeight = useTransform(boxTransitionOutProgress, (val) => {
    return val * boxContainerHeight;
  });
  const parallaxY = useTransform(boxTransitionOutProgress, (val) => {
    return (1 - val) * -boxContainerHeight * 1;
  });

  const headingOpacity = useTransform(
    boxTransitionOutProgress,
    [0.2, 0.1],
    [1, 0]
  );

  useLayoutEffect(() => {
    const projectGridGap = 16 / 2;
    const marginTop = 16;

    const firstRow = firstRowHeight + projectGridGap;
    const beginShrinkPos =
      firstRow +
      (projectRow - 1) * (cardHeight + projectGridGap) -
      marginTop +
      topOffset;

    setBeginShrinkPos(beginShrinkPos);
    setEndShrinkPos(beginShrinkPos + cardHeight);
    setBoxContainerHeight(cardHeight);
  }, [projectRow, cardHeight, topOffset, firstRowHeight]);

  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;
  useEffect(() => {
    if (!videoRef.current) return;

    if (isWide) {
      videoRef.current.play();
      return;
    }

    if (isHovering) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isHovering, isWide]);

  return (
    <motion.div
      className="sticky top-4 overflow-hidden"
      style={{
        gridColumnStart: isWide ? 1 : "auto",
        gridColumnEnd: isWide ? 3 : "auto",
        height: cardHeight,
      }}
    >
      <ReactiveTapArea>
        <motion.div
          ref={containerRef}
          className="relative h-[50vw] overflow-hidden rounded-xl"
          style={{
            height: boxHeight,
            backgroundColor: INACTIVE_BG_COLOR,
          }}
        >
          <Link
            href={`projects/${projectInfo.slug}`}
            scroll={false}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              style={{
                y: parallaxY,
              }}
              animate={{
                opacity: !isLoading ? 1 : 0,
              }}
              transition={{
                duration: AnimationConfig.NORMAL,
                ease: AnimationConfig.EASING_DRAMATIC,
              }}
            >
              <Image
                src={getProjectCover(projectInfo.slug)}
                width={582}
                height={767}
                className="w-full "
                alt={""}
                onLoad={() => setIsImageLoaded(true)}
              />
              {projectInfo.previewVideo !== undefined && (
                <motion.video
                  disablePictureInPicture
                  transition={{
                    duration: AnimationConfig.NORMAL,
                    ease: AnimationConfig.EASING_DRAMATIC,
                  }}
                  style={{
                    opacity: isHovering || isWide ? 1 : 0,
                    height: cardHeight,
                  }}
                  ref={videoRef}
                  src={projectInfo.previewVideo}
                  autoPlay
                  muted
                  loop
                  className="w-full object-cover object-center absolute top-0 left-0 right-0"
                />
              )}
            </motion.div>
            <motion.div
              className="absolute top-0 left-0 right-0 mx-4 my-3 text-l tracking-tight grid grid-cols-2"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: isImageLoaded ? 1 : 0,
              }}
              style={{
                color: projectStyle.getTextColor(),
                opacity: headingOpacity,
              }}
            >
              <div className="mb-1 leading-tight">{projectInfo.title}</div>
              <div className="opacity-60 leading-tight">
                {!isHovering
                  ? projectInfo.tags?.map((tag, index) => (
                      <div className="" key={index}>
                        {tag}
                      </div>
                    ))
                  : projectInfo.description}
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </ReactiveTapArea>
    </motion.div>
  );
};

export default ProjectGridItem;
