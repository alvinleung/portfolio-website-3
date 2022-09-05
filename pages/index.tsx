import { motion, useScroll, useTransform } from "framer-motion";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import LandingHero from "../components/Layouts/LandingHero";
import ProjectGrid from "../components/Layouts/ProjectGrid";

const Home: NextPage = () => {
  const { scrollY } = useScroll();

  const [isViewingGrid, setIsViewingGrid] = useState(false);

  useEffect(() => {
    scrollY.onChange((amount) => {
      if (amount > 200) {
        setIsViewingGrid(true);
      } else {
        setIsViewingGrid(false);
      }
    });
  }, []);

  console.log("re render");

  return (
    <>
      <LandingHero />
      <ProjectGrid isViewing={isViewingGrid} />
    </>
  );
};

export default Home;
