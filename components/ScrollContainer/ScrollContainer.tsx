import { motion, MotionValue, useScroll } from "framer-motion";
import React, {
  createContext,
  MutableRefObject,
  useContext,
  useRef,
} from "react";

type Props = {
  children: React.ReactNode;
};

interface ScrollContextInfo {
  scrollX: MotionValue;
  scrollY: MotionValue;
  scrollXProgress: MotionValue;
  scrollYProgress: MotionValue;
}

export const ScrollContext = createContext<ScrollContextInfo>({
  scrollX: new MotionValue(),
  scrollY: new MotionValue(),
  scrollXProgress: new MotionValue(),
  scrollYProgress: new MotionValue(),
});

export const ScrollContainer = ({ children }: Props) => {
  const scrollContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { scrollX, scrollY, scrollXProgress, scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  return (
    <ScrollContext.Provider
      value={{
        scrollX,
        scrollY,
        scrollXProgress,
        scrollYProgress,
      }}
    >
      <motion.div
        className="fixed left-0 top-0 right-0 bottom-0 h-screen overflow-auto"
        ref={scrollContainerRef}
      >
        {children}
      </motion.div>
    </ScrollContext.Provider>
  );
};

export const useContainerScroll = () => {
  return useContext(ScrollContext);
};
