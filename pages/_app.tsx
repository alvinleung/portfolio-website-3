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
      {/* <!-- Default Statcounter code for portfolio https://alvinn.design --> */}
      <script type="text/javascript">
      var sc_project=12719687;
      var sc_invisible=1;
      var sc_security="ce1e7f94";
      </script>
      <script type="text/javascript"
      src="https://www.statcounter.com/counter/counter.js" async></script>
      <noscript><div class="statcounter"><a title="Web Analytics"
      href="https://statcounter.com/" target="_blank"><img class="statcounter"
      src="https://c.statcounter.com/12719687/0/ce1e7f94/1/" alt="Web Analytics"
      referrerPolicy="no-referrer-when-downgrade"></a></div></noscript>
      {/* <!-- End of Statcounter Code --> */}
    </>
  );
}

export default MyApp;
