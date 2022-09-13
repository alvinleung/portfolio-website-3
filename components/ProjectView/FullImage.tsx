import React from "react";
import Image from "next/image";

type Props = {
  src: string;
  width: number;
  height: number;
  caption?: string;
};

const FullImage = ({ src, width, height, caption }: Props) => {
  return (
    <img
      className="block w-full col-start-1 col-span-full"
      src={src}
      width={width}
      height={height}
      alt={caption ? caption : ""}
    />
  );
};

export default FullImage;
