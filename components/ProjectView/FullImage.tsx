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
      className="block w-full col-start-1 col-span-full"
      src={src}
      width={width}
      height={height}
    />
  );
};

export default FullImage;
