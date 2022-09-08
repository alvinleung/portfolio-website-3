import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { WindowDimensionContextProvider } from "../hooks/useWindowDimension";
import { MutableRefObject, useRef } from "react";
import { ScrollContainer } from "../components/ScrollContainer/ScrollContainer";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <WindowDimensionContextProvider>
      <AnimatePresence>
        <ScrollContainer key={router.route}>
          <Component {...pageProps} />
        </ScrollContainer>
      </AnimatePresence>
    </WindowDimensionContextProvider>
  );
}

export default MyApp;
