import { useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollDirection,
  useContainerScroll,
} from "../components/ScrollContainer/ScrollContainer";

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

  const overscrollReadyDelay = 1000;
  const [isOverscrollReady, setIsOverscrollReady] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsOverscrollReady(true), overscrollReadyDelay);
  }, []);

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
      }, 140),
    []
  );

  useEffect(() => {
    if (isOverscrollComplete === true) completeRef.current = true;
  }, [isOverscrollComplete]);

  // effect to set if the overscroll engaged or not
  useEffect(() => {
    if (!isOverscrollReady) return;
    const unobserve = scrollYProgress.onChange((val) => {
      if (direction === OverscrollDirection.UP && val <= 0) {
        setIsActive(true);
        return;
      }
      if (direction === OverscrollDirection.DOWN && val >= 0.999) {
        setIsActive(true);
        return;
      }
      setIsActive(false);
    });
    return () => {
      unobserve();
    };
  }, [scrollYProgress, direction, isOverscrollReady]);

  useEffect(() => {
    if (!isActive || !isOverscrollReady) return;

    const handleWheel = (e: WheelEvent) => {
      setIsOverscrollStarted(true);

      let deltaAmount = 0;
      if (direction === OverscrollDirection.UP)
        deltaAmount = overScroll.get() - e.deltaY;
      else deltaAmount = overScroll.get() + e.deltaY;

      if (completeRef.current) {
        return;
      }
      overScroll.set(deltaAmount);
      resetOverscroll();
    };

    const unobserve = overscrollProgress.onChange((val) => {
      if (val >= 1) {
        setIsOverscrollComplete(true);
        return;
      }
      setIsOverscrollComplete(false);
    });

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      unobserve();

      if (!completeRef.current) overScroll.set(0);
    };
  }, [
    isActive,
    scrollContainerRef,
    overscrollProgress,
    direction,
    isOverscrollReady,
  ]);

  return { isOverscrollComplete, overscrollProgress, isOverscrollStarted };
}
