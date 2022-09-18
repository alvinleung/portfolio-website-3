import React from "react";

type FigureWrapperProps = {
  children: React.ReactNode;
};

export const Figure = ({ children }: FigureWrapperProps) => {
  return (
    <figure className="relative overflow-hidden rounded-xl">{children}</figure>
  );
};
