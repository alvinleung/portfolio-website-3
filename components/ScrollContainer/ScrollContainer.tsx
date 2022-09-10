import { motion, MotionValue, useScroll } from "framer-motion";
import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindowDimension } from "../../hooks/useWindowDimension";

type Props = {
  children: React.ReactNode;
};

interface ScrollContextInfo {
  scrollWidth: number;
  scrollX: MotionValue;
  scrollY: MotionValue;
  scrollXProgress: MotionValue;
  scrollYProgress: MotionValue;
  setCanScroll: Dispatch<SetStateAction<boolean>>;
}

export const ScrollContext = createContext<ScrollContextInfo>({
  scrollWidth: 0,
  scrollX: new MotionValue(),
  scrollY: new MotionValue(),
  scrollXProgress: new MotionValue(),
  scrollYProgress: new MotionValue(),
  setCanScroll: () => {},
});

export const ScrollContainer = ({ children }: Props) => {
  const scrollContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [canScroll, setCanScroll] = useState(true);
  const [scrollWidth, setScrollWidth] = useState(0);
  const { scrollX, scrollY, scrollXProgress, scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  const windowDim = useWindowDimension();
  useEffect(() => {
    setScrollWidth(scrollContainerRef.current.scrollWidth);
  }, [windowDim]);

  return (
    <ScrollContext.Provider
      value={{
        scrollWidth,
        scrollX,
        scrollY,
        scrollXProgress,
        scrollYProgress,
        setCanScroll,
      }}
    >
      <motion.div
        className={`fixed left-0 top-0 right-0 bottom-0 h-screen overflow-x-hidden ${
          canScroll ? "overflow-y-auto" : "overflow-y-hidden"
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
