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
  zIndex?: number;
};

export enum ScrollDirection {
  DOWN,
  UP,
}

interface ScrollContextInfo {
  scrollWidth: number;
  scrollX: MotionValue;
  scrollY: MotionValue;
  scrollXProgress: MotionValue;
  scrollYProgress: MotionValue;
  scrollDirection: ScrollDirection;
  setCanScroll: Dispatch<SetStateAction<boolean>>;
}

export const ScrollContext = createContext<ScrollContextInfo>({
  scrollWidth: 0,
  scrollX: new MotionValue(),
  scrollY: new MotionValue(),
  scrollXProgress: new MotionValue(),
  scrollYProgress: new MotionValue(),
  scrollDirection: ScrollDirection.DOWN,
  setCanScroll: () => {},
});

export const ScrollContainer = ({ children, zIndex = 0 }: Props) => {
  const scrollContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [canScroll, setCanScroll] = useState(true);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(
    ScrollDirection.DOWN
  );
  const { scrollX, scrollY, scrollXProgress, scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  const windowDim = useWindowDimension();
  useEffect(() => {
    setScrollWidth(scrollContainerRef.current.scrollWidth);
  }, [windowDim]);

  useEffect(() => {
    const unobserveScrollY = scrollY.onChange((val) => {
      if (val > scrollY.getPrevious()) {
        setScrollDirection(ScrollDirection.DOWN);
        return;
      }
      setScrollDirection(ScrollDirection.UP);
    });

    return () => {
      unobserveScrollY();
    };
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        scrollWidth,
        scrollX,
        scrollY,
        scrollXProgress,
        scrollYProgress,
        setCanScroll,
        scrollDirection,
      }}
    >
      <motion.div
        className={`fixed left-0 top-0 right-0 bottom-0 h-screen overflow-x-hidden ${
          canScroll ? "overflow-y-auto" : "overflow-y-hidden"
        } `}
        ref={scrollContainerRef}
        style={{
          zIndex: zIndex,
        }}
      >
        {children}
      </motion.div>
    </ScrollContext.Provider>
  );
};

export const useContainerScroll = () => {
  return useContext(ScrollContext);
};
