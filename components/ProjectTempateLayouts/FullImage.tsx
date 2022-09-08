import React from "react";
import Image from "next/image";

type Props = {
  src: string;
};

const Fullimage = ({ src }: Props) => {
  return <img src={src} className="w-full" />;
};

export default Fullimage;
