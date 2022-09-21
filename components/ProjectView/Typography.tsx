import { createParagraphProcessor } from "./ParagraphProcessor";

export const ParagraphBig = (children: any) => (
  <p className="col-start-1 sm:col-start-2 col-span-full md:col-start-2 md:col-span-3 mt-48 mb-32 text-3xl leading-none font-normal lg:text-4xl xl:text-5xl md:font-normal">
    {children}
  </p>
);
export const Quote = ({ children, who = "", title = "" }: any) => (
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

export const paragraphLayout =
  "col-start-1 col-span-full sm:col-start-3 sm:col-span-4 md:col-start-2 md:col-span-3 lg:col-start-2 lg:col-span-3 xl:col-start-2 xl:col-span-2";

export const Paragraph = (children: any) => (
  <p
    className={`${paragraphLayout} leading-[1.2em] md:leading-[1.116em] opacity-60 pt-[1em]`}
  >
    {children}
  </p>
);
export const Header2 = ({ children }: any) => (
  <h2 className={`${paragraphLayout} md:leading-[1.116em] md:text-xl pt-48`}>
    {children}
  </h2>
);

export const paragraphProcessor = createParagraphProcessor(
  [
    {
      token: "--",
      output: ParagraphBig,
    },
  ],
  Paragraph
);
