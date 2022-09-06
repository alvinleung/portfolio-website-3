import { motion, useScroll, useTransform } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";

interface ProjectGridItemProps {
  isActive: boolean;
  isFirstRow: boolean;
  textColor: string;
  bgColor: string;
  projectTitle: string;
  projectType?: string[];
}

const INACTIVE_TEXT_COLOR = "#1e4852";
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

const ProjectGridItem: React.FC<ProjectGridItemProps> = ({
  bgColor,
  textColor,
  projectTitle,
  projectType,
  isActive,
  isFirstRow,
}) => {
  const { scrollY } = useScroll();

  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const TOP_OFFSET = 64;

  const [beginShrinkPos, setBeginShrinkPos] = useState(100);
  const [endShrinkPos, setEndShrinkPos] = useState(200);

  const boxTransitionOutProgress = useTransform(
    scrollY,
    [beginShrinkPos, endShrinkPos],
    [1, 0]
  );

  const boxOpacity = useTransform(boxTransitionOutProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    const handleResize = () => {
      const bounds = containerRef.current.getBoundingClientRect();
      const beginShrinkPos = bounds.top - TOP_OFFSET + window.scrollY;
      setBeginShrinkPos(beginShrinkPos);
      setEndShrinkPos(beginShrinkPos + bounds.height);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div ref={containerRef} className="sticky top-14">
      {/* background media */}
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
            opacity: boxOpacity,
          }}
          animate={{
            backgroundColor: isActive ? bgColor : INACTIVE_BG_COLOR,
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
              color: isActive ? textColor : INACTIVE_TEXT_COLOR,
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
                  projectType.map((type) => {
                    return <div>{type}</div>;
                  })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

type Props = {
  isViewing: boolean;
  isViewingTopBar: boolean;
  projects: any[];
};
const ProjectGrid = ({ isViewing, isViewingTopBar, projects }: Props) => {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 pt-4 px-6 grid grid-cols-3"
        animate={{
          opacity: isViewingTopBar ? 0.4 : 0,
        }}
        whileHover={{
          opacity: isViewingTopBar ? 1 : 0,
        }}
        transition={{
          duration: 0.15,
          ease: "linear",
        }}
      >
        <div className="text-white text-left">Instagram</div>
        <div className="text-white text-center">Alvin Leung</div>
        <div className="text-white text-right">alvinleung2009@gmail.com</div>
      </motion.div>
      <motion.div className="grid grid-cols-3 gap-4 z-20 px-6 pb-8">
        {projects.map((project, index) => (
          <ProjectGridItem
            key={index}
            isFirstRow={index < 3}
            textColor={project.meta.thumbnailTextColor}
            bgColor={project.meta.thumbnailBgColor}
            projectTitle={project.meta.title}
            projectType={project.meta.tags && project.meta.tags.split(",")}
            isActive={isViewing}
          />
        ))}
      </motion.div>
    </>
  );
};

export default ProjectGrid;
