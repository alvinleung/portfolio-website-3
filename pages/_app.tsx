import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { WindowDimensionContextProvider } from "../hooks/useWindowDimension";
import { ScrollContainer } from "../components/ScrollContainer/ScrollContainer";
import { PageTransitionProvider } from "../components/PageTransition/PageTransitionContext";
import { HomeScrollPositionContextProvider } from "../components/HomeScrollPositionContext";

function MyApp({ Component, pageProps, router }: AppProps) {
  const isRouteHome = router.asPath === "/";

  return (
    <WindowDimensionContextProvider>
      <HomeScrollPositionContextProvider>
        <PageTransitionProvider>
          <AnimatePresence initial={false}>
            <ScrollContainer
              key={router.asPath}
              zIndex={isRouteHome ? 10 : 100}
            >
              <Component {...pageProps} />
            </ScrollContainer>
          </AnimatePresence>
        </PageTransitionProvider>
      </HomeScrollPositionContextProvider>
    </WindowDimensionContextProvider>
  );
}

export default MyApp;
