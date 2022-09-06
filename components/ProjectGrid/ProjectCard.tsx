import { motion, MotionValue } from "framer-motion";
import React from "react";

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
  textColor: string;
  bgColor: string;
  projectTitle: string;
  projectType?: string[];
  opacity: MotionValue;
};

const ProjectCard = ({
  isFirstRow,
  bgColor,
  textColor,
  projectTitle,
  projectType,
  opacity,
}: Props) => {
  return (
    <div className="relative h-[40vw]">
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
        animate={{
          backgroundColor: bgColor,
        }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
      >
        {/* content */}
        <motion.div
          className="absolute left-0 right-0 top-0"
          animate={{
            // backgroundColor: isActive ? bgColor : INACTIVE_BG_COLOR,
            color: textColor,
          }}
          transition={{
            duration: 0.3,
            ease: "linear",
          }}
        >
          <div className="grid grid-cols-2 p-4">
            <div>{projectTitle}</div>
            <div>
              {projectType &&
                projectType.map((type, index) => {
                  return <div key={index}>{type}</div>;
                })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
