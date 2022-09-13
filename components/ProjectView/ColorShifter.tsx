import { motion } from "framer-motion";
import React, { createContext, useContext, useEffect, useState } from "react";

const ColorContext = createContext({
  currentColor: "#FFF",
  pushColor: (str: string) => {},
  popColor: () => {},
});

export const ColorShifterContextProvider = ({
  children,
  initialColor,
}: any) => {
  const [colorStack, setColorStack] = useState([initialColor]);

  const pushColor = (color: string) => {
    setColorStack([...colorStack, color]);
  };
  const popColor = () => {
    if (colorStack.length === 1) return;
    setColorStack(colorStack.slice(0, -1));
  };

  return (
    <ColorContext.Provider
      value={{
        currentColor: colorStack[colorStack.length - 1],
        pushColor,
        popColor,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  return useContext(ColorContext);
};

type Props = {
  color: string;
};
export const ColorShifter = (props: Props) => {
  const { pushColor, popColor } = useContext(ColorContext);
  const [isOverThreshold, setIsOverThreshold] = useState(false);

  useEffect(() => {
    if (isOverThreshold) {
      pushColor(props.color);
      return;
    }
    popColor();
  }, [isOverThreshold]);

  const handleViewportEnter = (e: IntersectionObserverEntry | null) => {
    if (!e) return;
    console.log(e?.boundingClientRect);
    if (e?.boundingClientRect.y > 0) {
      setIsOverThreshold(true);
    }
  };
  const handleViewportLeave = (e: IntersectionObserverEntry | null) => {
    console.log(e?.boundingClientRect);
    if (!e) return;
    // console.log(e?.boundingClientRect);
    if (e?.boundingClientRect.y > 0) {
      setIsOverThreshold(false);
    }
  };

  return (
    <motion.div
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
    />
  );
};
