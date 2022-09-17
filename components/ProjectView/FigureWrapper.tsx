import React from "react";

type FigureWrapperProps = {
  children: React.ReactNode;
};

export const Figure = ({ children }: FigureWrapperProps) => {
  return (
    <figure className="relative overflow-hidden rounded-xl self-start">
      {children}
    </figure>
  );
};

type FigCaptionProps = {
  label?: string;
  text: string;
  wideSpacing: boolean;
};

export const Caption = ({ label, text, wideSpacing }: FigCaptionProps) => {
  const labelSpacing = wideSpacing
    ? "w-[14vw] lg:w-[7vw] 2xl:w-[14vw] opacity-50"
    : "w-[14vw] lg:w-[7vw] 2xl:w-[7vw] opacity-50";

  return (
    <figcaption className="flex flex-row gap-4 text-sm top-0 my-2">
      {/* one column around 7vw */}
      {label && <div className={labelSpacing}>{label}</div>}
      <div className="opacity-50 max-w-[70vw] sm:max-w-[49vw] 2xl:max-w-[28vw]">
        {text}
      </div>
    </figcaption>
  );
};
