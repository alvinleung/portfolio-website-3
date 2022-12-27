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
import { NextSeo } from "next-seo";

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
import {
  Header2,
  Paragraph,
  ParagraphBig,
  paragraphProcessor,
  Quote,
} from "../../components/ProjectView/Typography";

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

  const paths = getAllPostSlugs();
  const slugTitleMap = paths.map((path) => {
    const post = getPostBySlug(path.params.slug);
    return {
      title: post.meta.title,
      slug: path.params.slug,
    };
  });

  return {
    props: {
      source: mdxSource,
      meta: source.meta,
      nextProjectMeta: nextProjectSource.meta,
      slugTitleMap: slugTitleMap,
    },
  };
};

// THE TEMPATE
type PostProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function Post({
  source,
  meta,
  nextProjectMeta,
  slugTitleMap,
}: PostProps) {
  const projectStyle = getProjectStyle(meta);
  const projectInfo = getProjectInfo(meta);
  const projectLogoSource = getProjectLogo(projectInfo.slug);

  const nextProjectStyle = getProjectStyle(nextProjectMeta);
  const nextProjectInfo = getProjectInfo(nextProjectMeta);

  return (
    <>
      <NextSeo
        title={`${projectInfo.title} — Alvin Leung`}
        description={`${projectInfo.description}`}
      />
      <ColorShifterContextProvider initialColor={projectStyle.getBgColor()}>
        <ProjectView
          projectInfo={projectInfo}
          projectStyle={projectStyle}
          nextProjectInfo={nextProjectInfo}
          nextProjectStyle={nextProjectStyle}
          coverImage={getProjectCover(projectInfo.slug)}
          slugTitleMap={slugTitleMap}
        >
          {/* <h1 className="text-6xl">{meta.title}</h1> */}
          <ProjectHeader projectInfo={projectInfo} />
          <main className="grid grid-cols-6 gap-x-4 mx-6 2xl:mx-16 md:text-xl -tracking-[.016em]">
            <MDXRemote
              {...source}
              components={{
                TestingComponent,
                FullImage,
                p: paragraphProcessor,
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
    </>
  );
}
