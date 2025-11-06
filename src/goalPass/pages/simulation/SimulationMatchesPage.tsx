import React from "react";
import { CardMatchSimulation } from "../../components/molecules/cards/CardMatchSimulation";

interface Props {
  setCurrentSection?: (section: number) => void;
}

export const SimulationMatchesPage = ({
  setCurrentSection = () => {},
}: Props) => {
  return (
    <div className=" grid lg:grid-cols-2 grid-cols-1 mt-4 gap-4">
      {[1, 2, 3].map((data, i) => (
        <CardMatchSimulation
          key={data}
          index={i}
          actionCard={() => setCurrentSection(1)}
        />
      ))}
    </div>
  );
};
