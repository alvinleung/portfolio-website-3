import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useBoundingBox } from "../../hooks/useBoundingClientRect";
import { AnimationConfig } from "../AnimationConfig";
import {
  getProjectCover,
  ProjectInfo,
  ProjectStyle,
} from "../../lib/ProjectInfo";
import { useHomeScrollPosition } from "../HomeScrollPositionContext";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { usePageTransition } from "../PageTransition/PageTransitionContext";

const INACTIVE_TEXT_COLOR = "rgb(159, 238, 220)";
const INACTIVE_BG_COLOR = "rgb(26, 41, 39)";

type Props = {
  isActive: boolean;
  index: number;
  projectInfo: ProjectInfo;
  projectStyle: ProjectStyle;
  opacity: MotionValue;
  height: MotionValue;
  parallaxY: MotionValue;
  cardRef: MutableRefObject<HTMLDivElement>;
};

const ProjectGridCard = ({
  projectInfo,
  projectStyle,
  opacity,
  parallaxY,
  height,
  isActive,
  cardRef,
  index,
}: Props) => {
  const [cursorOffsetFromCenter, setCursorOffsetFromCenter] = useState({
    x: 0,
    y: 0,
  });
  const cardYOffset = useMemo(() => {
    if (typeof window === "undefined") return 500;
    return window.innerHeight * 0.5;
  }, []);

  const [isHovering, setIsHovering] = useState(false);

  const { prevCardRef } = usePageTransition();

  // const mouseDelta = useRef(0);
  // const prevMousePos = useRef({ x: 0, y: 0 });
  // const handleMouseEnter = (e: React.MouseEvent) => {
  //   prevMousePos.current.x = e.clientX;
  //   prevMousePos.current.y = e.clientY;
  // };
  // const handleMouseMove = useCallback(
  //   (e: React.MouseEvent) => {
  //     const currX = e.clientX;
  //     const currY = e.clientY;

  //     const delta =
  //       Math.pow(prevMousePos.current.x - currX, 2) +
  //       Math.pow(prevMousePos.current.y - currY, 2);

  //     if (delta > 30) videoRef.current.currentTime += delta * 0.0005;

  //     prevMousePos.current.x = currX;
  //     prevMousePos.current.y = currY;
  //   },
  //   [isHovering]
  // );

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
    <Link href={`projects/${projectInfo.slug}`} scroll={false}>
      <a
        className="relative block h-full"
        onMouseDown={(e) => {
          const target = e.currentTarget as HTMLAnchorElement;
          const bounds = target.getBoundingClientRect();
          setCursorOffsetFromCenter({
            x: (e.clientX - bounds.x) / bounds.width - 0.5,
            y: (e.clientY - bounds.y) / bounds.height - 0.5,
          });
        }}
        // onClickCapture={(e) => {
        //   prevCardRef.current = cardRef.current;
        // }}
        style={{
          pointerEvents: isActive ? "all" : "none",
          cursor: isActive ? "pointer" : "auto",
        }}
        // onMouseMove={handleMouseMove}
        onMouseEnter={(e) => {
          setIsHovering(true);
          // handleMouseEnter(e);
        }}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          // className="rounded-xl overflow-hidden"
          style={{
            transformPerspective: "100vw",
            translateZ: "0vw",
          }}
          whileTap={{
            rotateY: cursorOffsetFromCenter.x * 7,
            rotateX: -cursorOffsetFromCenter.y * 10,
            translateZ: "-5vw",
          }}
          transition={{
            duration: AnimationConfig.FAST,
            ease: AnimationConfig.EASING,
          }}
        >
          <motion.div
            className="relative flex flex-col items-center h-full rounded-xl overflow-hidden"
            style={{
              opacity: opacity,
              height: height,
              maskImage: "-webkit-radial-gradient(white, black)",
              willChange: "height, opacity",
              // backgroundColor: INACTIVE_BG_COLOR,
            }}
            animate={{
              y: isActive ? 0 : cardYOffset,
              // scale: isActive ? 1 : 0.98,
            }}
            transition={{
              duration: isActive ? 0.4 : AnimationConfig.FAST,
              ease: isActive ? [0.62, 0, 0.02, 1] : AnimationConfig.EASING,
              // delay: isActive ? index * 0.05 : 0,
            }}
            ref={cardRef}
          >
            <motion.img
              style={{ y: parallaxY, willChange: "transform" }}
              src={getProjectCover(projectInfo.slug)}
              className="w-full object-cover object-center"
              animate={
                {
                  // backgroundColor: projectStyle.getBgColor(),
                  // opacity: isActive ? 1 : 0.05,
                }
              }
              initial={{
                scale: 1,
              }}
              whileTap={{
                scale: 1.03,
              }}
              transition={{
                duration: AnimationConfig.FAST,
                ease: AnimationConfig.EASING,
              }}
            />

            {projectInfo.previewVideo && (
              <motion.video
                disablePictureInPicture
                style={{
                  y: parallaxY,
                  willChange: "transform",
                  display: isHovering ? "block" : "none",
                }}
                ref={videoRef}
                src={projectInfo.previewVideo}
                autoPlay
                muted
                loop
                className="w-full object-cover object-center absolute top-0 left-0 right-0"
                animate={
                  {
                    // backgroundColor: projectStyle.getBgColor(),
                    // opacity: isActive ? 1 : 0.05,
                  }
                }
                initial={{
                  scale: 1,
                }}
                whileTap={{
                  scale: 1.03,
                }}
                transition={{
                  duration: AnimationConfig.FAST,
                  ease: AnimationConfig.EASING,
                }}
              />
            )}
            {/* content */}
            <motion.div
              className="absolute left-0 right-0 top-0 pointer-events-none"
              style={{ color: projectStyle.getTextColor() }}
              // initial={{
              //   opacity: isActive ? 1 : 0,
              // }}
              animate={{
                opacity: isActive ? 1 : 0,
              }}
              transition={{
                duration: AnimationConfig.NORMAL,
                ease: "linear",
              }}
            >
              <div className="grid grid-cols-2 py-3 px-4">
                {isHovering && (
                  <>
                    <div className="leading-tight">{projectInfo.title}</div>
                    <div className="leading-tight max-w-[32ch]">
                      {projectInfo.description}
                    </div>
                  </>
                )}
                {!isHovering && (
                  <>
                    <div className="leading-tight">{projectInfo.title}</div>
                    <div className="leading-tight">
                      {projectInfo.tags &&
                        projectInfo.tags.map((tag, index) => {
                          return <div key={index}>{tag}</div>;
                        })}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </a>
    </Link>
  );
};

export default ProjectGridCard;
