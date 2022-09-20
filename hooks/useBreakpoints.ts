import { useMemo, useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
//@ts-ignore
import tailwindConfig from "../../tailwind.config.js";

// USAGE
// const isOverBreakpoint = useBreakpoint(breakpointInPixel)
// const isMobile = useMobileBreakpoint();

const fullConfig = resolveConfig(tailwindConfig);

export function useBreakpoint(breakpointSize: number) {
  const [isOverBreakpoint, setIsOverBreakpoint] = useState(false);

  function forceRefreshBreakpoint() {
    setIsOverBreakpoint(window.innerWidth > breakpointSize);
  }

  useEffect(() => {
    function handleResize() {
      const currentScreenWidth = window.innerWidth;
      if (currentScreenWidth > breakpointSize) {
        // only change when it is not the current state
        !isOverBreakpoint && setIsOverBreakpoint(true);
        return;
      }
      isOverBreakpoint && setIsOverBreakpoint(false);
    }
    forceRefreshBreakpoint();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOverBreakpoint]);
  return isOverBreakpoint;
}

// mobild shorthand for "useBreakpoint"
export function useMobileBreakpoint() {
  //@ts-ignore
  return useBreakpoint(parseInt(fullConfig.theme.screens.sm));
}

export const breakpoints = {
  //@ts-ignore
  sm: parseInt(fullConfig.theme.screens.sm),
  //@ts-ignore
  md: parseInt(fullConfig.theme.screens.md),
  //@ts-ignore
  lg: parseInt(fullConfig.theme.screens.lg),
  //@ts-ignore
  xl: parseInt(fullConfig.theme.screens.xl),
  //@ts-ignore
  "2xl": parseInt(fullConfig.theme.screens["2xl"]),
};
