import React from "react";

interface Teammate {
  name: string;
  position: string;
}

type Props = {
  teammates: Teammate[];
};

const Team = ({ teammates }: Props) => {
  return (
    <>
      <h3 className="col-start-2 pb-6 text-[1rem] leading-none">Team</h3>
      <div className="col-start-2 grid-span-1 grid grid-cols-2 text-[1rem] leading-[120%] mb-48">
        {teammates.map((teammate, index) => (
          <React.Fragment key={index}>
            <div className="col-start-1">{teammate.name}</div>
            {teammate.position && (
              <div className="col-start-2">{teammate.position}</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Team;
