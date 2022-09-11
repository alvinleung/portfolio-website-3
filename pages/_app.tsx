import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { WindowDimensionContextProvider } from "../hooks/useWindowDimension";
import { ScrollContainer } from "../components/ScrollContainer/ScrollContainer";
import { PageTransitionProvider } from "../components/PageTransition/PageTransitionContext";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <WindowDimensionContextProvider>
      <PageTransitionProvider>
        <AnimatePresence>
          <ScrollContainer
            key={router.asPath}
            zIndex={router.asPath === "/" ? 10 : 100}
          >
            <Component {...pageProps} />
          </ScrollContainer>
        </AnimatePresence>
      </PageTransitionProvider>
    </WindowDimensionContextProvider>
  );
}

export default MyApp;
