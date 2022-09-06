import { useScroll } from "framer-motion";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useEffect, useState } from "react";
import LandingHero from "../components/Layouts/LandingHero";
import ProjectGrid from "../components/Layouts/ProjectGrid";
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
  const { scrollY } = useScroll();

  const [isViewingGrid, setIsViewingGrid] = useState(false);

  useEffect(() => {
    console.log(projects);

    scrollY.onChange((amount) => {
      if (amount > 400) {
        setIsViewingGrid(true);
      } else {
        setIsViewingGrid(false);
      }
    });
  }, []);

  return (
    <>
      <LandingHero />
      <ProjectGrid isViewing={isViewingGrid} projects={projects} />
    </>
  );
};

export default Home;
