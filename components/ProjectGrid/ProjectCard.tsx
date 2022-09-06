import { motion, MotionValue } from "framer-motion";
import Link from "next/link";
import React from "react";
import { ProjectInfo, ProjectStyle } from "./Project";

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
  projectInfo: ProjectInfo;
  projectStyle: ProjectStyle;
  opacity: MotionValue;
};

const ProjectCard = ({
  isFirstRow,
  projectInfo,
  projectStyle,
  opacity,
}: Props) => {
  return (
    <Link href={`projects/${projectInfo.slug}`}>
      <a className="relative block h-[40vw]">
        {!isFirstRow && (
          <div
            className={`absolute top-[-1rem] left-0 right-0 h-8 bg-brand-dark`}
          >
            <RoundedCornerSVGLeft />
            <RoundedCornerSVGRight />
          </div>
        )}
        <motion.div
          className="relative h-full rounded-xl"
          style={{
            opacity: opacity,
          }}
          initial={{
            backgroundColor: projectStyle.bgColor,
          }}
          animate={{
            backgroundColor: projectStyle.bgColor,
          }}
          transition={{
            duration: 0.3,
            ease: "linear",
          }}
        >
          {/* content */}
          <motion.div
            className="absolute left-0 right-0 top-0"
            initial={{
              color: projectStyle.textColor,
            }}
            animate={{
              // backgroundColor: isActive ? bgColor : INACTIVE_BG_COLOR,
              color: projectStyle.textColor,
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
          >
            <div className="grid grid-cols-2 p-4">
              <div>{projectInfo.title}</div>
              <div>
                {projectInfo.tags &&
                  projectInfo.tags.map((tag, index) => {
                    return <div key={index}>{tag}</div>;
                  })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </a>
    </Link>
  );
};

export default ProjectCard;
