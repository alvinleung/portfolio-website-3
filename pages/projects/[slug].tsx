import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { getAllPostSlugs, getPostBySlug } from "../../lib/projects";
import TestingComponent from "../../components/TestingComponent";

const components = {
  TestingComponent,
};

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
export default function Post({ source, meta }: PostProps) {
  return (
    <div className="wrapper">
      <h1 className="text-6xl">{meta.title}</h1>
      <MDXRemote {...source} components={components} />
    </div>
  );
}
