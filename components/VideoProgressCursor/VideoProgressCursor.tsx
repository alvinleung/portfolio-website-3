import {
  AnimatePresence,
  motion,
  useAnimation,
  useScroll,
} from "framer-motion";
import React, {
  createElement,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { useBoundingBox } from "../../hooks/useBoundingClientRect";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import { AnimationConfig } from "../AnimationConfig";
import ClientOnlyPortal from "../ClientOnlyPortal/ClientOnlyPortal";
import { ProgressRing } from "./ProgressRing";

type Props = {
  playerRef: MutableRefObject<HTMLVideoElement>;
  isScrubbing: boolean;
  fill: string;
};

const VideoProgressCursor = ({
  playerRef,
  isScrubbing,
  fill = "#FFF",
}: Props) => {
  const [progress, setProgress] = useState(0);

  const anim = useAnimation();

  const windowDimension = useWindowDimension();
  const [vidBounds, setVidBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  });
  const [isShowing, setIsShowing] = useState(false);

  const isHovering = useRef(false);
  const isScrubbingRef = useRef(false);
  const cursorPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    isScrubbingRef.current = isScrubbing;
  }, [isScrubbing]);

  useEffect(() => {
    const bound = playerRef.current.getBoundingClientRect();
    setVidBounds({
      left: bound.left,
      right: bound.right,
      top: bound.top,
      bottom: bound.bottom,
      width: bound.width,
      height: bound.height,
    });
  }, [playerRef.current, windowDimension.width, isShowing, isScrubbing]);

  useEffect(() => {
    const handlePointerEnter = (e: MouseEvent) => {
      isHovering.current = true;
      setIsShowing(true);

      anim.set({
        // x: vidBounds.left + vidBounds.width / 2,
        // y: vidBounds.top + vidBounds.height / 2,
        x: e.clientX - 20,
        y: e.clientY - 20,
      });
      anim.start({
        opacity: 1,
      });
    };
    const handlePointerMove = (e: MouseEvent) => {
      if (isHovering.current === false || isScrubbingRef.current === true)
        return;

      cursorPosRef.current = {
        x: e.clientX,
        y: e.clientY,
      };

      anim.start({
        x: e.clientX - 16,
        y: e.clientY - 16,
        transition: {
          duration: 0.1,
          ease: AnimationConfig.EASING,
        },
      });
    };
    const handlePointerLeave = (e: MouseEvent) => {
      isHovering.current = false;
      setIsShowing(false);

      // setMouseOffset({
      //   x: vidBounds.width / 2,
      //   y: vidBounds.height / 2,
      // });

      anim.start({
        opacity: 0,
        // x: vidBounds.left + vidBounds.width / 2,
        // y: vidBounds.top + vidBounds.height / 2,
        transition: {
          duration: 0.2,
          ease: AnimationConfig.EASING,
        },
      });
    };

    playerRef.current.addEventListener("pointerenter", handlePointerEnter);
    window.addEventListener("pointermove", handlePointerMove);
    playerRef.current.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (!playerRef.current) return;

      playerRef.current.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("pointermove", handlePointerMove);
      playerRef.current.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [playerRef.current, vidBounds]);

  useEffect(() => {
    if (!isShowing) return;

    const interval = setInterval(
      () =>
        setProgress(
          (playerRef.current.currentTime / playerRef.current.duration) * 100
        ),
      32
    );

    return () => {
      clearInterval(interval);
    };
  }, [isShowing]);

  useEffect(() => {
    if (isScrubbing) {
      anim.start({
        x: vidBounds.left + vidBounds.width / 2 - 16,
        y: vidBounds.top + vidBounds.height / 2 - 16,
        transition: {
          duration: AnimationConfig.VERY_FAST,
          ease: AnimationConfig.EASING,
        },
      });
      return;
    }

    anim.start({
      x: cursorPosRef.current.x - 16,
      y: cursorPosRef.current.y - 16,
      transition: {
        duration: AnimationConfig.VERY_FAST,
        ease: AnimationConfig.EASING,
      },
    });
  }, [isScrubbing, vidBounds, playerRef]);

  // the feedback of scrubbing

  const [shouldEmphasiseLeft, setShouldEmphasiseLeft] = useState(false);
  const [shouldEmphasiseRight, setShouldEmphasiseRight] = useState(false);
  const lastProgress = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    function reset() {
      setShouldEmphasiseLeft(false);
      setShouldEmphasiseRight(false);
    }

    if (!isScrubbing) {
      reset();
      return;
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(reset, 100);

    if (progress > lastProgress.current) {
      setShouldEmphasiseLeft(false);
      setShouldEmphasiseRight(true);
    } else {
      setShouldEmphasiseLeft(true);
      setShouldEmphasiseRight(false);
    }
    lastProgress.current = progress;
  }, [isScrubbing, progress]);

  return (
    <ClientOnlyPortal selector="body">
      <motion.div
        className="fixed left-0 right-0 z-[100000] pointer-events-none opacity-0"
        animate={anim}
      >
        <ArrowLeft
          show={isShowing}
          fill={fill}
          shouldEmphasise={shouldEmphasiseLeft}
        />
        <ProgressRing progress={progress} strokeColor={fill} radius={16} />
        <ArrowRight
          show={isShowing}
          fill={fill}
          shouldEmphasise={shouldEmphasiseRight}
        />
      </motion.div>
    </ClientOnlyPortal>
  );
};

type ArrowProps = {
  show: boolean;
  fill?: string;
  shouldEmphasise: boolean;
};
const ArrowLeft = ({ show, fill, shouldEmphasise }: ArrowProps) => {
  return (
    <motion.svg
      className="absolute -left-[16px] top-[4px]"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        opacity: show ? 1 : 0,
        x: show ? (shouldEmphasise ? -2 : 0) : 12,
        scale: shouldEmphasise ? 1.3 : 1,
        transition: {
          ease: AnimationConfig.EASING,
          duration: AnimationConfig.FAST,
          // delay: 0.1,
        },
      }}
    >
      <path
        d="M12.3004 15.3L9.70039 12.7C9.60039 12.6 9.52539 12.4917 9.47539 12.375C9.42539 12.2583 9.40039 12.1333 9.40039 12C9.40039 11.8667 9.42539 11.7417 9.47539 11.625C9.52539 11.5083 9.60039 11.4 9.70039 11.3L12.3004 8.70001C12.6171 8.38335 12.9794 8.31268 13.3874 8.48801C13.7961 8.66268 14.0004 8.97501 14.0004 9.42501V14.575C14.0004 15.025 13.7961 15.3373 13.3874 15.512C12.9794 15.6873 12.6171 15.6167 12.3004 15.3V15.3Z"
        fill={fill}
      />
    </motion.svg>
  );
};
const ArrowRight = ({ show, fill = "#FFF", shouldEmphasise }: ArrowProps) => (
  <motion.svg
    className="absolute left-[24px] top-[4px]"
    animate={{
      opacity: show ? 1 : 0,
      x: show ? (shouldEmphasise ? 2 : 0) : -12,
      scale: shouldEmphasise ? 1.3 : 1,
      transition: {
        ease: AnimationConfig.EASING,
        duration: AnimationConfig.FAST,
        // delay: 0.1,
      },
    }}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.7 15.3C11.3833 15.6167 11.021 15.6873 10.613 15.512C10.2043 15.3373 10 15.025 10 14.575V9.42501C10 8.97501 10.2043 8.66268 10.613 8.48801C11.021 8.31268 11.3833 8.38335 11.7 8.70001L14.3 11.3C14.4 11.4 14.475 11.5083 14.525 11.625C14.575 11.7417 14.6 11.8667 14.6 12C14.6 12.1333 14.575 12.2583 14.525 12.375C14.475 12.4917 14.4 12.6 14.3 12.7L11.7 15.3Z"
      fill={fill}
    />
  </motion.svg>
);

export default VideoProgressCursor;
