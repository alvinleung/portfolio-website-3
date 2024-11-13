import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { WindowDimensionContextProvider } from "../hooks/useWindowDimension";
import { ScrollContainer } from "../components/ScrollContainer/ScrollContainer";
import { PageTransitionProvider } from "../components/PageTransition/PageTransitionContext";
import { HomeScrollPositionContextProvider } from "../components/HomeScrollPositionContext";
import { useImagePreload } from "../hooks/useImagePreload";
import { HistoryProvider } from "../contexts/History";
import Head from "next/head";

const IMAGE_PRELOAD_LIST: string[] = [
  "/_next/image?url=%2Fproject-assets%2Fwhatif%2Fintro.jpg&w=3840&q=75",
  "/_next/image?url=%2Fproject-assets%2Ftedxsfu%2Fintro.jpg&w=3840&q=75",
  "/_next/image?url=%2Fproject-assets%2Fidagio%2Fintro.jpg&w=3840&q=75",
  "/_next/image?url=%2Fproject-assets%2Fkitchen-experiment%2Fintro-scroll2.jpg&w=3840&q=75",
  "/_next/image?url=%2Fproject-assets%2Fvisual-design-projects%2Fintro.png&w=3840&q=75",
];

function MyApp({ Component, pageProps, router }: AppProps) {
  const isRouteHome = router.asPath === "/";
  const isAllImagesLoaded = useImagePreload(IMAGE_PRELOAD_LIST);

  return (
    <>
      <Head>
        <meta name="pinterest" content="nopin" />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B56XYR5WW0"
        ></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-B56XYR5WW0');`}
        </script>
      </Head>
      <HistoryProvider>
        <WindowDimensionContextProvider>
          <HomeScrollPositionContextProvider>
            <PageTransitionProvider>
              <AnimatePresence initial={true}>
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
      </HistoryProvider>
    </>
  );
}

export default MyApp;
