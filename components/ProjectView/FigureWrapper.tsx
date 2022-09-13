import React from "react";

type FigureWrapperProps = {
  children: React.ReactNode;
  caption?: string;
};

export const Figure = ({ children, caption }: FigureWrapperProps) => {
  return <figure className="overflow-hidden rounded-xl">{children}</figure>;
};

type FigCaptionProps = {
  children: string;
};

export const FigCaption = ({ children }: FigCaptionProps) => {
  return <figcaption className="relative">{children}</figcaption>;
};
