import { motion } from "framer-motion";
import React, {
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { Figure } from "./FigureWrapper";
import VideoProgressCursor from "../VideoProgressCursor/VideoProgressCursor";
import { ProgressRing } from "../VideoProgressCursor/ProgressRing";
import ReactiveTapArea from "../ReactiveTapArea/ReactiveTapArea";
import { useWindowDimension } from "../../hooks/useWindowDimension";

type HoveringVideoTarget = HTMLVideoElement | null;
type VideoContextProps = {
  hoveringVideo: HoveringVideoTarget;
  setHoveringVideo: (target: HoveringVideoTarget) => void;
  clearHoveringVideo: () => void;
};
export const VideoHoverContext = createContext<VideoContextProps>({
  hoveringVideo: null,
  setHoveringVideo: () => {},
  clearHoveringVideo: () => {},
});
export const VideoHoverContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hoveringVideo, setHoveringVideo] = useState<HoveringVideoTarget>(null);
  const clearHoveringVideo = () => setHoveringVideo(null);

  return (
    <VideoHoverContext.Provider
      value={{ hoveringVideo, setHoveringVideo, clearHoveringVideo }}
    >
      {children}
    </VideoHoverContext.Provider>
  );
};

type Props = {
  src: string;
  width: number;
  height: number;
  seekOnScroll: boolean;
  canScrub?: boolean;
  fillHeight?: boolean;
  frameRate: number;
  rowSpan?: number;
  children?: React.ReactNode;
  darkMode: boolean;
  preload: string;
  cursorColor?: string;
};

const Video = ({
  src,
  width,
  height,
  seekOnScroll,
  canScrub = true,
  frameRate = 12,
  fillHeight,
  children,
  rowSpan = 1,
  preload = "metadata",
  darkMode,
  cursorColor = "#b7b7b7",
}: Props) => {
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const playerRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const { scrollY } = useContainerScroll();
  const windowDimension = useWindowDimension();

  const { clearHoveringVideo, setHoveringVideo, hoveringVideo } =
    useContext(VideoHoverContext);

  useEffect(() => {
    if (hoveringVideo === null) {
      if (isInView) {
        setShouldPlay(true);
        return;
      }
      setShouldPlay(false);
    }

    if (!isInView) return;
    if (hoveringVideo === playerRef.current) {
      setShouldPlay(true);
      return;
    }
    setShouldPlay(false);
  }, [isInView, hoveringVideo]);

  useEffect(() => {
    if (!seekOnScroll) return;
    if (!shouldPlay) return;

    const initialScrollPos = scrollY.get();
    const unobserveScroll = scrollY.onChange((scrollPos) => {
      const offset = Math.abs(initialScrollPos - scrollPos);
      const adjustedOffset = offset / 2000;

      const vidDuration = playerRef.current.duration;
      if (!vidDuration) return;

      const targetTime =
        adjustedOffset / vidDuration - Math.floor(adjustedOffset / vidDuration);
      const targetFrame = Math.floor(targetTime * frameRate);

      setCurrentFrame(targetFrame);
    });

    return () => {
      unobserveScroll();
    };
  }, [shouldPlay, frameRate, seekOnScroll]);

  useEffect(() => {
    if (!seekOnScroll) return;

    const animFrame = requestAnimationFrame(() => {
      if (!playerRef.current) return;

      playerRef.current.currentTime = currentFrame / frameRate;
    });
    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [currentFrame, seekOnScroll]);

  useEffect(() => {
    if (!playerRef.current || seekOnScroll) return;

    if (shouldPlay) {
      playerRef.current.play();
      return;
    }
    playerRef.current.pause();
  }, [shouldPlay, playerRef, seekOnScroll]);

  const [isScrubbing, setIsScrubbing] = useState(false);
  useEffect(() => {
    if (seekOnScroll || !canScrub) return;

    let isDragging = false;

    const handleDragStart = (e: PointerEvent) => {
      isDragging = true;
      playerRef.current.pause();
      setIsScrubbing(true);
    };
    const handleDragMove = (e: PointerEvent) => {
      if (!isDragging || !playerRef.current) return;

      const offset = e.movementX;
      playerRef.current.currentTime += offset / 100;
    };
    const handleDragEnd = () => {
      isDragging = false;
      playerRef.current.play();
      setIsScrubbing(false);
    };

    playerRef.current.addEventListener("pointerdown", handleDragStart);
    window.addEventListener("pointermove", handleDragMove);
    playerRef.current.addEventListener("pointerup", handleDragEnd);

    return () => {
      if (!playerRef.current) return;

      playerRef.current.removeEventListener("pointerdown", handleDragStart);
      window.removeEventListener("pointermove", handleDragMove);
      playerRef.current.removeEventListener("pointerup", handleDragEnd);
    };
  }, [playerRef.current, windowDimension.width, seekOnScroll, canScrub]);

  useEffect(() => {
    if (!isScrubbing) {
      document.exitPointerLock();
      return;
    }

    playerRef.current.requestPointerLock();
  }, [isScrubbing]);

  return (
    <Figure rowSpan={rowSpan}>
      {!seekOnScroll && canScrub && (
        <VideoProgressCursor
          playerRef={playerRef}
          isScrubbing={isScrubbing}
          // fill={"rgb(242, 84, 16)"}
          fill={cursorColor}
          idleTimer={500}
        />
      )}
      {/* <ReactiveTapArea
        className={`w-full ${fillHeight ? "md:h-full" : ""} md:object-cover`}
        // startFromCenter
      > */}
      <motion.video
        onMouseEnter={() => setHoveringVideo(playerRef.current)}
        onMouseLeave={() => clearHoveringVideo()}
        className={`w-full ${
          fillHeight ? "md:h-full" : ""
        } md:object-cover rounded-xl`}
        ref={playerRef}
        style={{
          visibility: isInView ? "visible" : "hidden",
          cursor: seekOnScroll || !canScrub ? "auto" : "ew-resize",
        }}
        animate={{
          opacity: seekOnScroll || shouldPlay ? 1 : 0.5,
          transition: {
            duration: 0.2,
            ease: "linear",
          },
        }}
        onViewportEnter={() => setIsInView(true)}
        onViewportLeave={() => setIsInView(false)}
        // whileTap={{
        //   scale: 1.01,
        // }}
        src={src}
        width={width}
        height={height}
        preload={seekOnScroll ? "auto" : preload}
        autoPlay={seekOnScroll ? false : true}
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
      />
      {children}
      {/* </ReactiveTapArea> */}
    </Figure>
  );
};

export default Video;
