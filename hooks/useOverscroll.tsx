import { useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useContainerScroll } from "../components/ScrollContainer/ScrollContainer";

import debounce from "../lib/debounce";

export enum OverscrollDirection {
  UP,
  DOWN,
}

export function useOverscroll(
  direction: OverscrollDirection = OverscrollDirection.UP,
  maxDist = 200
) {
  const { scrollYProgress, scrollContainerRef } = useContainerScroll();
  const overScroll = useSpring(0, { stiffness: 1500, damping: 200 });
  const overscrollProgress = useTransform(overScroll, [0, maxDist], [0, 1]);

  const [isActive, setIsActive] = useState(true);

  const [isOverscrollComplete, setIsOverscrollComplete] = useState(false);
  const completeRef = useRef(false);
  const [isOverscrollStarted, setIsOverscrollStarted] = useState(false);

  const resetOverscroll = useMemo(
    () =>
      debounce(() => {
        // done reset if done
        if (completeRef.current === true) return;

        overScroll.set(0);
        setIsOverscrollStarted(false);
      }, 100),
    []
  );

  useEffect(() => {
    if (isOverscrollComplete === true) completeRef.current = true;
  }, [isOverscrollComplete]);

  useEffect(() => {
    const unobserve = scrollYProgress.onChange((val) => {
      if (direction === OverscrollDirection.UP && val <= 0) {
        setIsActive(true);
        return;
      }
      if (direction === OverscrollDirection.DOWN && val >= 1) {
        setIsActive(true);
        return;
      }
      setIsActive(false);
    });
    return () => {
      unobserve();
    };
  }, [scrollYProgress, direction]);

  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e: WheelEvent) => {
      if (completeRef.current) return;

      setIsOverscrollStarted(true);

      if (direction === OverscrollDirection.UP)
        overScroll.set(overScroll.get() - e.deltaY);
      else overScroll.set(overScroll.get() + e.deltaY);

      resetOverscroll();
    };

    const unobserve = overscrollProgress.onChange((val) => {
      if (val >= 1) {
        setIsOverscrollComplete(true);
      }
    });

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      unobserve();
      overScroll.set(0);
    };
  }, [isActive, scrollContainerRef, overscrollProgress, direction]);

  return { isOverscrollComplete, overscrollProgress, isOverscrollStarted };
}
