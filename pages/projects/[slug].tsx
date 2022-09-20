import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { getAllPostSlugs, getPostBySlug } from "../../lib/projects";
import TestingComponent from "../../components/TestingComponent";
import ProjectView from "../../components/ProjectView/ProjectView";
import { motion } from "framer-motion";
import FullImage from "../../components/ProjectView/FullImage";
import Team from "../../components/ProjectView/Team";
import Image from "../../components/ProjectView/Image";
import { createParagraphProcessor } from "../../components/ProjectView/ParagraphProcessor";
import ProjectHeader from "../../components/Layouts/ProjectHeader";
import {
  getProjectCover,
  getProjectInfo,
  getProjectLogo,
  getProjectStyle,
} from "../../lib/ProjectInfo";
import {
  ColorShifter,
  ColorShifterContextProvider,
} from "../../components/ProjectView/ColorShifter";
import {
  LayoutMainContent,
  LayoutFull,
} from "../../components/ProjectView/Layout";
import { Caption } from "../../components/ProjectView/Caption";
import Video from "../../components/ProjectView/Video";
import { List, ListItem } from "../../components/ProjectView/List";
import SlideShow from "../../components/ProjectView/SlideShow";

export const getStaticPaths: GetStaticPaths = async ({}) => {
  // Return a list of possible value for id
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // MDX text - can be from a local file, database, anywhere
  if (!params) throw "params is empty";

  const source = getPostBySlug(params.slug as string);
  const nextProjectSource = getPostBySlug(source.meta.nextProject as string);
  const mdxSource = await serialize(source.content);

  return {
    props: {
      source: mdxSource,
      meta: source.meta,
      nextProjectMeta: nextProjectSource.meta,
    },
  };
};

// THE TEMPATE
type PostProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function Post({ source, meta, nextProjectMeta }: PostProps) {
  const projectStyle = getProjectStyle(meta);
  const projectInfo = getProjectInfo(meta);
  const projectLogoSource = getProjectLogo(projectInfo.slug);

  const nextProjectStyle = getProjectStyle(nextProjectMeta);
  const nextProjectInfo = getProjectInfo(nextProjectMeta);

  return (
    <ColorShifterContextProvider initialColor={projectStyle.getBgColor()}>
      <ProjectView
        projectInfo={projectInfo}
        projectStyle={projectStyle}
        nextProjectInfo={nextProjectInfo}
        nextProjectStyle={nextProjectStyle}
        coverImage={getProjectCover(projectInfo.slug)}
      >
        {/* <h1 className="text-6xl">{meta.title}</h1> */}
        <ProjectHeader projectInfo={projectInfo} />
        <main className="grid grid-cols-6 gap-x-4 mx-6 2xl:mx-16 text-xl">
          <MDXRemote
            {...source}
            components={{
              TestingComponent,
              FullImage,
              p: createParagraphProcessor(
                [
                  {
                    token: "--",
                    output: ParagraphBig,
                  },
                ],
                Paragraph
              ),
              h2: Header2,
              Image: Image,
              Video: Video,
              Team,
              ColorShifter,
              LayoutFull,
              LayoutMainContent,
              Quote,
              Caption,
              List,
              ListItem,
              SlideShow,
            }}
          />
        </main>
      </ProjectView>
    </ColorShifterContextProvider>
  );
}

const ParagraphBig = (children: any) => (
  <p className="col-start-2 col-span-3 mt-48 mb-32 text-5xl font-normal">
    {children}
  </p>
);
const Quote = ({ children, who = "", title = "" }: any) => (
  <>
    <blockquote className="col-start-2 2xl:col-start-4 col-span-3 mt-48 mb-12 text-5xl font-normal -indent-4">
      “{children}”
    </blockquote>
    <div className="col-start-2 2xl:col-start-4 col-span-1 text-sm mb-24">
      {who}
    </div>
    <div className="col-start-3 2xl:col-start-5 col-span-1 text-sm mb-24">
      {title}
    </div>
    {/* <div className="col-start-2 col-span-1 text-sm">{from}</div>
    <div className="col-start-2 col-span-1 text-sm mb-24">{address}</div> */}
  </>
);

const Paragraph = (children: any) => (
  <p className="col-start-2 col-span-2 leading-[1.116em] opacity-60 pt-[1em]">
    {children}
  </p>
);
const Header2 = ({ children }: any) => (
  <h2 className="col-start-2 col-span-2 leading-[1.116em] text-xl pt-48">
    {children}
  </h2>
);
