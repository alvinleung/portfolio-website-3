import { useScroll } from "framer-motion";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { useHomeScrollPosition } from "../components/HomeScrollPositionContext";
import LandingHero from "../components/Layouts/LandingHero";
import ProjectGridSection from "../components/Layouts/ProjectGridSection";
import ProjectGrid from "../components/ProjectGrid/ProjectGrid";
import { useContainerScroll } from "../components/ScrollContainer/ScrollContainer";
import useIsFirstRender from "../hooks/useIsFirstRender";
import { getAllPostSlugs, getPostBySlug } from "../lib/projects";
import { NextSeo } from "next-seo";
import debounce from "../lib/debounce";
import { useBoundingBox } from "../hooks/useBoundingClientRect";
import HomeLayout from "../components/HomeLayout/HomeLayout";

export const getStaticProps: GetStaticProps = () => {
  const allProjectsSlugs = getAllPostSlugs();
  return {
    props: {
      projects: allProjectsSlugs
        .map((project) => {
          return getPostBySlug(project.params.slug);
        })
        //@ts-ignore
        .sort((a, b) => {
          return b.meta.weight - a.meta.weight;
        }),
    },
  };
};

const Home: NextPage = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { scrollY, scrollContainerRef } = useContainerScroll();
  // const [isViewingGrid, setIsViewingGrid] = useState(false);
  // const [isViewingGridBar, setIsViewingGridBar] = useState(false);
  const homeScroll = useHomeScrollPosition();

  useEffect(() => {
    scrollContainerRef.current.scrollTo(0, homeScroll.scrollY);
    return () => {
      homeScroll.setScrollY(scrollY.get());
    };
  }, [scrollY]);

  // useEffect(() => {
  //   const cleanupScroll = scrollY.onChange((amount) => {
  //     if (amount > window.innerHeight / 6) {
  //       setIsViewingGrid(true);
  //     } else {
  //       setIsViewingGrid(false);
  //     }
  //     if (amount > window.innerHeight * 0.7) {
  //       setIsViewingGridBar(true);
  //     } else {
  //       setIsViewingGridBar(false);
  //     }
  //   });

  //   return () => {
  //     cleanupScroll();
  //   };
  // }, [scrollY]);

  return (
    <>
      <NextSeo
        title={`Alvin Leung`}
        description={`Alvin Leung is an interaction designer. Informed by business and
              user needs, he thrives in using his aesthetic sensibility and
              prototyping wizardry to bring wild concepts from 0 to 1.
              Currently designing @ Daybreak Studio. Previously @ Dossier Creative`}
      />
      {/* <LandingHero isViewingGrid={isViewingGrid} /> */}
      {/* <div ref={projectRef} /> */}
      {/* <ProjectGridSection
        isViewing={isViewingGrid}
        isViewingTopBar={isViewingGridBar}
        projects={projects}
      /> */}
      <HomeLayout projects={projects} />
    </>
  );
};

export default Home;
