import { MutableRefObject, useEffect, useRef, useState } from "react";

type BoundingBoxInfo = {
  x: number;
  y: number;
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

type BoundingBoxConfig = [MutableRefObject<HTMLElement>, BoundingBoxInfo];
export function useBoundingBox(dependency?: any[]): BoundingBoxConfig {
  const containerRef = useRef<HTMLElement>() as MutableRefObject<HTMLElement>;
  const [bounds, setBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      const bounds = containerRef.current.getBoundingClientRect();
      setBounds(bounds);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dependency]);

  return [containerRef, bounds];
}
