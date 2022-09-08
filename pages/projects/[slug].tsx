import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { getAllPostSlugs, getPostBySlug } from "../../lib/projects";
import TestingComponent from "../../components/TestingComponent";
import ProjectTemplate from "../../components/Layouts/ProjectTemplate";
import { motion } from "framer-motion";
import ImageFull from "../../components/ProjectTempateLayouts/ImageFull";

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
  const projectCoverSource = `/project-assets/${slug}/${slug}-cover.png`;

  return (
    <ProjectTemplate
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

      <MDXRemote
        {...source}
        components={{
          TestingComponent,
          ImageFull,
        }}
      />
    </ProjectTemplate>
  );
}
