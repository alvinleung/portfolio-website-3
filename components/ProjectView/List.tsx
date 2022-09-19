import React from "react";

type ListProps = {
  children: React.ReactNode;
};

export const List = ({ children }: ListProps) => {
  return <ul className="col-start-2 col-span-2 opacity-60">{children}</ul>;
};

type ListItemProps = {
  children: any;
  label: string;
};

export const ListItem = ({ children, label }: ListItemProps) => {
  return (
    <li className="flex flex-row mt-[1.1em] leading-[1.116em]">
      <div className="block w-[7vw]">{label}</div>
      <div className="block w-full">{children.props.children}</div>
    </li>
  );
};
