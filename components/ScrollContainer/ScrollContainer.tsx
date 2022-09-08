import { motion, MotionValue, useScroll } from "framer-motion";
import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

type Props = {
  children: React.ReactNode;
};

interface ScrollContextInfo {
  scrollX: MotionValue;
  scrollY: MotionValue;
  scrollXProgress: MotionValue;
  scrollYProgress: MotionValue;
  setCanScroll: Dispatch<SetStateAction<boolean>>;
}

export const ScrollContext = createContext<ScrollContextInfo>({
  scrollX: new MotionValue(),
  scrollY: new MotionValue(),
  scrollXProgress: new MotionValue(),
  scrollYProgress: new MotionValue(),
  setCanScroll: () => {},
});

export const ScrollContainer = ({ children }: Props) => {
  const scrollContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [canScroll, setCanScroll] = useState(true);
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
        setCanScroll,
      }}
    >
      <motion.div
        className={`fixed left-0 top-0 right-0 bottom-0 h-screen ${
          canScroll ? "overflow-auto" : "overflow-hidden"
        } `}
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
