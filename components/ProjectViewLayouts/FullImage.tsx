import React from "react";
import Image from "next/image";

type Props = {
  src: string;
};

const FullImage = ({ src }: Props) => {
  return <img src={src} className="w-full col-span-full" />;
};

export default FullImage;
