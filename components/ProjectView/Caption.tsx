import { useMemo } from "react";

type CaptionProps = {
  label?: string;
  text: string;
  wideSpacing?: boolean;
  overlay?: boolean;
  topPadding?: boolean;
};

export const Caption = ({
  label,
  text,
  wideSpacing,
  overlay = true,
  topPadding = false,
}: CaptionProps) => {
  const labelSpacing = wideSpacing
    ? "w-[14vw] lg:w-[7vw] 2xl:w-[14vw] opacity-50"
    : "w-[14vw] lg:w-[7vw] 2xl:w-[7vw] opacity-50";

  const layout = useMemo(() => {
    if (overlay) {
      return "md:absolute mt-3";
    }
    if (topPadding) {
      return "md:col-start-1 row-start-1 md:row-start-auto mt-3";
    }
    return "md:col-start-1 row-start-1 md:row-start-auto";
  }, [topPadding, overlay]);

  return (
    <figcaption
      className={`${layout} ${
        wideSpacing ? `flex flex-row xl:grid xl:grid-cols-6` : `flex flex-row`
      } gap-4 text-sm leading-5 top-0 mb-6 w-full`}
    >
      {/* one column around 7vw */}
      {label && (
        <div className={`${labelSpacing} ${overlay && "md:ml-4"}`}>{label}</div>
      )}
      <div
        className={`opacity-60 w-full ${
          wideSpacing && "xl:col-span-2"
        } max-w-[70vw] sm:max-w-[49vw] 2xl:max-w-[21vw]`}
      >
        {text}
      </div>
    </figcaption>
  );
};
