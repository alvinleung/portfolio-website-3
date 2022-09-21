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
    <div className="min-h-[70vh] col-start-1 col-span-full relative z-10">
      <div className="absolute md:relative -left-6 -right-6">
        <img
          className="block w-[100vw] min-h-[70vh] object-cover"
          src={src}
          width={width}
          height={height}
          alt={caption ? caption : ""}
        />
      </div>
    </div>
  );
};

export default FullImage;
