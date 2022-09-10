import React from "react";
import NextImage from "next/image";

type Props = {
  width: number;
  height: number;
  src: string;
  caption?: string;
  fullWidth?: boolean;
};

const FullImageWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <figure className="col-start-1 col-span-full overflow-hidden rounded-xl mx-6 mt-20 max-h-[95vh]">
      {children}
    </figure>
  );
};

const Image = ({ src, width, height, fullWidth }: Props) => {
  return (
    <FullImageWrapper>
      <img
        className="w-full h-full object-cover"
        src={src}
        width={width}
        height={height}
      />
    </FullImageWrapper>
  );
};

export default Image;
