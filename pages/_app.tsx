import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { WindowDimensionContextProvider } from "../hooks/useWindowDimension";
import { ScrollContainer } from "../components/ScrollContainer/ScrollContainer";
import { PageTransitionProvider } from "../components/PageTransition/PageTransitionContext";
import { HomeScrollPositionContextProvider } from "../components/HomeScrollPositionContext";
import { useImagePreload } from "../hooks/useImagePreload";

const IMAGE_PRELOAD_LIST = [
  "/project-assets/tedxsfu/intro.jpg",
  "/project-assets/whatif/intro.jpg",
  "/project-assets/idagio/intro.jpg",
];

function MyApp({ Component, pageProps, router }: AppProps) {
  const isRouteHome = router.asPath === "/";
  const isAllImagesLoaded = useImagePreload(IMAGE_PRELOAD_LIST);

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
