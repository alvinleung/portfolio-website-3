import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { WindowDimensionContextProvider } from "../hooks/useWindowDimension";
import { MutableRefObject, useRef } from "react";
import { ScrollContainer } from "../components/ScrollContainer/ScrollContainer";
import { PageTransitionProvider } from "../components/PageTransition/PageTransitionContext";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <WindowDimensionContextProvider>
      <PageTransitionProvider>
        <AnimatePresence>
          <ScrollContainer key={router.asPath}>
            <Component {...pageProps} />
          </ScrollContainer>
        </AnimatePresence>
      </PageTransitionProvider>
    </WindowDimensionContextProvider>
  );
}

export default MyApp;
