import React from "react";
import ProjectGrid from "./ProjectGrid";
import { motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { ExternalLink } from "../Layouts/ExternalLink";

type Props = {
  projects: any[];
};

const HomeLayout = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid lg:grid-cols-3 grid-flow-dense gap-4 mx-6 text-cyan-50"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.25,
          duration: AnimationConfig.FAST,
          ease: AnimationConfig.EASING,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          delay: 0.25,
          duration: AnimationConfig.FAST,
          ease: AnimationConfig.EASING_INVERTED,
        },
      }}
    >
      <div className="lg:col-start-3">
        <div className="sticky top-0 py-4 flex flex-col lg:h-screen">
          <div className="text-xl sm:text-2xl lg:text-4xl font-light tracking-[-.047em] lg:leading-[1.08em] ">
            Alvin Leung is an interaction designer. He thrives in bringing wild
            concepts from 0 to 1 using his prototyping wizardry and aesthetic
            sensibility. Previously designed @ Daybreak Studio & Dossier
            Creative.
          </div>
          <div className="mt-4">
            He has worked with clients like <a>Pager</a> and <a>Quirk Chat</a>
          </div>
          <div className="mt-auto">
            <ExternalLink
              href={"https://read.cv/alvinleung"}
              icon={"icon/icon-cv.svg"}
              alt={"My Resume"}
            >
              My CV
            </ExternalLink>
            <ExternalLink
              href={"https://www.instagram.com/alvinn.design/"}
              icon={"icon/icon-instagram.svg"}
              alt={"Visit alvin's instagram"}
            >
              Instagram
            </ExternalLink>
            <ExternalLink
              href={"mailto:alvinleung2009@gmail.com"}
              icon={"icon/icon-mail.svg"}
              alt={"Say Hello!"}
            >
              Email
            </ExternalLink>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 mb-4">
        <ProjectGrid projects={projects} />
      </div>
    </motion.div>
  );
};

export default HomeLayout;
