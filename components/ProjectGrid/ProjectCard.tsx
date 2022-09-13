import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { MutableRefObject, useState } from "react";
import { useBoundingBox } from "../../hooks/useBoundingClientRect";
import { AnimationConfig } from "../AnimationConfig";
import {
  getProjectCover,
  ProjectInfo,
  ProjectStyle,
} from "../../lib/Project_Info";

const INACTIVE_TEXT_COLOR = "#4f5c5f";
const INACTIVE_BG_COLOR = "#1E2222";

const RoundedCornerSVGLeft = ({ size = 12 }) => (
  <svg
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -top-3 left-0"
    style={{
      width: size,
      height: size,
    }}
  >
    <path d="M0 0V6H6C2.68555 6 0 3.31445 0 0Z" fill="#0E1010" />
  </svg>
);

const RoundedCornerSVGRight = ({ size = 12 }) => (
  <svg
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -top-3 right-0"
    style={{
      width: size,
      height: size,
    }}
  >
    <path d="M0 6L6 6L6 -2.62268e-07C6 3.31445 3.31445 6 0 6Z" fill="#0E1010" />
  </svg>
);

type Props = {
  isFirstRow: boolean;
  isActive: boolean;
  projectInfo: ProjectInfo;
  projectStyle: ProjectStyle;
  opacity: MotionValue;
  height: MotionValue;
  cardRef: MutableRefObject<HTMLDivElement>;
};

const ProjectCard = ({
  isFirstRow,
  projectInfo,
  projectStyle,
  opacity,
  height,
  isActive,
  cardRef,
}: Props) => {
  const [cursorOffsetFromCenter, setCursorOffsetFromCenter] = useState({
    x: 0,
    y: 0,
  });

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
      >
        {!isFirstRow && (
          <div
            className={`absolute top-[-1rem] left-0 right-0 h-8 bg-brand-dark`}
          >
            <RoundedCornerSVGLeft />
            <RoundedCornerSVGRight />
          </div>
        )}
        <motion.div
          style={{
            transformPerspective: "100vw",
            translateZ: "0vw",
          }}
          whileTap={{
            rotateY: cursorOffsetFromCenter.x * 5,
            rotateX: -cursorOffsetFromCenter.y * 7,
            translateZ: "-.5vw",
          }}
          transition={{
            duration: AnimationConfig.FAST,
            ease: AnimationConfig.EASING,
          }}
        >
          <motion.div
            className="relative h-full rounded-xl overflow-hidden"
            style={{
              opacity: opacity,
              height: height,
            }}
            initial={{
              backgroundColor: isActive
                ? projectStyle.getBgColor()
                : INACTIVE_BG_COLOR,
            }}
            animate={{
              backgroundColor: isActive
                ? projectStyle.getBgColor()
                : INACTIVE_BG_COLOR,
            }}
            transition={{
              duration: AnimationConfig.NORMAL,
              ease: "linear",
            }}
            ref={cardRef}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isActive ? 1 : 0.05,
              }}
              transition={{
                duration: AnimationConfig.NORMAL,
                ease: "linear",
              }}
            >
              <Image
                src={getProjectCover(projectInfo.slug)}
                width={582}
                height={767}
              />
            </motion.div>
            {/* content */}
            <motion.div
              className="absolute left-0 right-0 top-0"
              initial={{
                color: isActive
                  ? projectStyle.getTextColor()
                  : INACTIVE_TEXT_COLOR,
              }}
              animate={{
                // backgroundColor: isActive ? bgColor : INACTIVE_BG_COLOR,
                color: isActive
                  ? projectStyle.getTextColor()
                  : INACTIVE_TEXT_COLOR,
              }}
              transition={{
                duration: AnimationConfig.NORMAL,
                ease: "linear",
              }}
            >
              <div className="grid grid-cols-2 py-3 px-4">
                <div className="leading-tight">{projectInfo.title}</div>
                <div className="leading-tight">
                  {projectInfo.tags &&
                    projectInfo.tags.map((tag, index) => {
                      return <div key={index}>{tag}</div>;
                    })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </a>
    </Link>
  );
};

export default ProjectCard;
