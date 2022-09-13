import React from "react";
import Image from "next/image";

type Props = {
  src: string;
  width: number;
  height: number;
};

const FullImage = ({ src, width, height }: Props) => {
  return (
    <img
      src={src}
      width={width}
      height={height}
      className="w-full col-span-full"
    />
  );
};

export default FullImage;
