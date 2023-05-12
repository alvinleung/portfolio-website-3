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
};

const ProjectGridItem = ({
  projectInfo,
  projectStyle,
  projectRow,
  isWide,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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

  const windowDimension = useWindowDimension();
  const cardHeight = useMemo(() => {
    return windowDimension.width * 0.4;
  }, [windowDimension.width]);

  useLayoutEffect(() => {
    const projectGridGap = 16;
    const heroSectionHeightVH = 0;
    const TOP_OFFSET = 16;

    const beginShrinkPos =
      window.innerHeight * heroSectionHeightVH +
      projectRow * (cardHeight + projectGridGap) -
      TOP_OFFSET;

    setBeginShrinkPos(beginShrinkPos);
    setEndShrinkPos(beginShrinkPos + cardHeight);
    setBoxContainerHeight(cardHeight);
  }, [projectRow, cardHeight]);

  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;
  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovering) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isHovering]);

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
          className="relative h-[50vw] overflow-hidden rounded-lg bg-gray-800"
          style={{
            height: boxHeight,
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
                opacity: isImageLoaded ? 1 : 0,
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
              {projectInfo.previewVideo && (
                <motion.video
                  disablePictureInPicture
                  transition={{
                    duration: AnimationConfig.NORMAL,
                    ease: AnimationConfig.EASING_DRAMATIC,
                  }}
                  style={{
                    opacity: isHovering ? 1 : 0,
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
              className="absolute top-0 m-3 text-xl leading-none tracking-tight"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: isImageLoaded ? 1 : 0,
              }}
              style={{
                color: projectStyle.getTextColor(),
              }}
            >
              <div className="mb-1">{projectInfo.title}</div>
              <div className="opacity-40">{projectInfo.description}</div>
            </motion.div>
          </Link>
        </motion.div>
      </ReactiveTapArea>
    </motion.div>
  );
};

export default ProjectGridItem;
