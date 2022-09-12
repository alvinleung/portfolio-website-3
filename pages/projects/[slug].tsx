import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { getAllPostSlugs, getPostBySlug } from "../../lib/projects";
import TestingComponent from "../../components/TestingComponent";
import ProjectView from "../../components/Layouts/ProjectView";
import { motion } from "framer-motion";
import FullImage from "../../components/ProjectViewLayouts/FullImage";
import Team from "../../components/ProjectViewLayouts/Team";
import Image from "../../components/ProjectViewLayouts/Image";
import { createParagraphProcessor } from "../../components/ProjectViewLayouts/ParagraphProcessor";

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
  const mdxSource = await serialize(source.content);

  return {
    props: {
      source: mdxSource,
      meta: source.meta,
      slug: source.slug,
    },
  };
};

// THE TEMPATE
type PostProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function Post({ source, meta, slug }: PostProps) {
  const projectLogoSource = `/project-assets/${slug}/${slug}-logo.png`;

  return (
    <ProjectView
      bgColor={meta.thumbnailBgColor}
      textColor={meta.thumbnailTextColor}
    >
      {/* <h1 className="text-6xl">{meta.title}</h1> */}
      <motion.div className="absolute left-0 right-0 top-0 px-8 py-8 grid grid-cols-[2fr_1fr]">
        <img src={projectLogoSource} className="h-12" />
        <div>
          <p className="text-2xl tracking-tightest leading-none max-w-[432px]">
            {meta.description}
          </p>
          <div className="text-normal mt-8 opacity-50 leading-tight">
            {meta.scope}
          </div>
          {meta.tags && (
            <div className="text-normal mt-6 opacity-50 leading-tight">
              {meta.tags.split(",").map((tag: string, index: number) => {
                return <div key={index}>{tag}</div>;
              })}
            </div>
          )}
        </div>
      </motion.div>

      <main className="grid grid-cols-6 text-2xl">
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
            Team,
          }}
        />
      </main>
    </ProjectView>
  );
}

const ParagraphBig = (children: any) => (
  <p className="col-start-2 col-span-3 mt-48 mb-32 text-5xl font-normal">
    {children}
  </p>
);

const Paragraph = (children: any) => (
  <p className="col-start-2 col-span-2 leading-[1.116em] opacity-70 pb-[1em]">
    {children}
  </p>
);
const Header2 = ({ children }: any) => (
  <h2 className="col-start-2 col-span-2 text-2xl pb-8 pt-24">{children}</h2>
);
