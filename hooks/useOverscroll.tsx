import { useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useContainerScroll } from "../components/ScrollContainer/ScrollContainer";

import debounce from "../lib/debounce";

export function useOverscroll() {
  const { scrollYProgress, scrollContainerRef } = useContainerScroll();
  const overScroll = useSpring(0, { stiffness: 1500, damping: 200 });
  const maxDist = 200;
  const overscrollProgress = useTransform(overScroll, [0, maxDist], [0, 1]);

  const [isActive, setIsActive] = useState(true);

  const [isOverscrollComplete, setIsOverscrollComplete] = useState(false);
  const [isOverscrollStarted, setIsOverscrollStarted] = useState(false);

  const resetOverscroll = useMemo(
    () =>
      debounce(() => {
        overScroll.set(0);
        setIsOverscrollStarted(false);
      }, 100),
    []
  );

  useEffect(() => {
    const unobserve = scrollYProgress.onChange((val) => {
      if (val <= 0) {
        setIsActive(true);
        return;
      }
      setIsActive(false);
    });
    return () => {
      unobserve();
    };
  }, [scrollYProgress]);

  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e: WheelEvent) => {
      setIsOverscrollStarted(true);
      overScroll.set(overScroll.get() - e.deltaY);
      resetOverscroll();
    };

    const unobserve = overscrollProgress.onChange((val) => {
      if (val >= 1) {
        setIsOverscrollComplete(true);
      } else {
        setIsOverscrollComplete(false);
      }
    });

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      unobserve();
      overScroll.set(0);
    };
  }, [isActive, scrollContainerRef, overscrollProgress]);

  return { isOverscrollComplete, overscrollProgress, isOverscrollStarted };
}
