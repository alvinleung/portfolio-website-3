import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { WindowDimensionContextProvider } from "../hooks/useWindowDimension";
import { ScrollContainer } from "../components/ScrollContainer/ScrollContainer";
import { PageTransitionProvider } from "../components/PageTransition/PageTransitionContext";

function MyApp({ Component, pageProps, router }: AppProps) {
  const isRouteHome = router.asPath === "/";

  return (
    <WindowDimensionContextProvider>
      <PageTransitionProvider>
        <AnimatePresence initial={false}>
          <ScrollContainer key={router.asPath} zIndex={isRouteHome ? 10 : 100}>
            <Component {...pageProps} />
          </ScrollContainer>
        </AnimatePresence>
      </PageTransitionProvider>
    </WindowDimensionContextProvider>
  );
}

export default MyApp;
