import React, { useMemo } from "react";

type Props = {
  children: React.ReactNode;
  grid?: string;
  extraMargin?: boolean;
};

export const LayoutFull = ({ children, grid, extraMargin }: Props) => {
  const gridTemplateStringArr =
    grid && grid.split("/").map((str) => str.trim());

  return (
    <div
      className={`col-start-1 col-span-full grid gap-x-4 ${
        extraMargin ? "mt-20" : "mt-4"
      }`}
      style={{
        gridTemplateColumns: gridTemplateStringArr
          ? gridTemplateStringArr.reduce(
              (prev, curr) => `${prev} ${curr}fr`,
              ""
            )
          : "1fr",
      }}
    >
      {children}
    </div>
  );
};

// grid = 1/2
export const LayoutMainContent = ({ children, grid, extraMargin }: Props) => {
  const gridTemplateStringArr =
    grid && grid.split("/").map((str) => str.trim());
  return (
    <div
      className={`col-start-2 col-span-full grid gap-x-4 ${
        extraMargin ? "mt-12" : "mt-4"
      }`}
      style={{
        gridTemplateColumns: gridTemplateStringArr
          ? gridTemplateStringArr.reduce(
              (prev, curr) => `${prev}${curr}fr `,
              ""
            )
          : "1fr",
      }}
    >
      {children}
    </div>
  );
};
