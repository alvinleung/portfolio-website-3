import React from "react";

type FigureWrapperProps = {
  children: React.ReactNode;
  rowSpan: number;
};

export const Figure = ({ children, rowSpan }: FigureWrapperProps) => {
  return (
    <figure
      className={`relative overflow-hidden rounded-xl md:row-start-1 md:row-[var(--row-span)]`}
      style={
        {
          "--row-span": `span ${rowSpan}/ span ${rowSpan}`,
        } as React.CSSProperties
      }
    >
      {children}
    </figure>
  );
};
