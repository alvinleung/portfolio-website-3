type CaptionProps = {
  label?: string;
  text: string;
  wideSpacing: boolean;
  forImage: boolean;
};

export const Caption = ({
  label,
  text,
  wideSpacing,
  forImage = true,
}: CaptionProps) => {
  const labelSpacing = wideSpacing
    ? "w-[14vw] lg:w-[7vw] 2xl:w-[14vw] opacity-50"
    : "w-[14vw] lg:w-[7vw] 2xl:w-[7vw] opacity-50";

  return (
    <figcaption
      className={`${
        forImage
          ? "md:absolute mx-4 mt-3"
          : "md:col-start-1 row-start-1 md:row-start-auto"
      } flex flex-row gap-4 text-sm leading-5 top-0 mb-2`}
    >
      {/* one column around 7vw */}
      {label && <div className={labelSpacing}>{label}</div>}
      <div className="opacity-60 w-full max-w-[70vw] sm:max-w-[49vw] 2xl:max-w-[21vw]">
        {text}
      </div>
    </figcaption>
  );
};
