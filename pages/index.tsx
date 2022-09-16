import { useScroll } from "framer-motion";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useEffect, useState } from "react";
import LandingHero from "../components/Layouts/LandingHero";
import ProjectGridSection from "../components/Layouts/ProjectGridSection";
import ProjectGrid from "../components/ProjectGrid/ProjectGrid";
import { useContainerScroll } from "../components/ScrollContainer/ScrollContainer";
import { getAllPostSlugs, getPostBySlug } from "../lib/projects";

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
  const { scrollY } = useContainerScroll();
  const [isViewingGrid, setIsViewingGrid] = useState(false);
  const [isViewingGridBar, setIsViewingGridBar] = useState(false);

  useEffect(() => {
    scrollY.onChange((amount) => {
      if (amount > window.innerHeight / 3) {
        setIsViewingGrid(true);
      } else {
        setIsViewingGrid(false);
      }
      if (amount > window.innerHeight / 1.2) {
        setIsViewingGridBar(true);
      } else {
        setIsViewingGridBar(false);
      }
    });
  }, []);

  return (
    <>
      <LandingHero />
      <ProjectGridSection
        isViewing={isViewingGrid}
        isViewingTopBar={isViewingGridBar}
        projects={projects}
      />
    </>
  );
};

export default Home;
