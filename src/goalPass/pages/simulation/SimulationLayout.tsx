import { useState } from "react";
import { SimulationMatchesPage } from "./SimulationMatchesPage";
import { SimulationInfoMatchPage } from "./SimulationInfoMatchPage";
import { motion } from "framer-motion";
import { SimulationResults } from "./SimulationResults";
import { ComponentEmpty } from "../../../shared/components/molecules/empty/ComponentEmpty";

export const SimulationLayout = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const SIMULATION_PAGES = {
    0: <SimulationMatchesPage setCurrentSection={setCurrentSection} />,
    1: <SimulationInfoMatchPage setCurrentSection={setCurrentSection} />,
    2: <SimulationResults setCurrentSection={setCurrentSection} />,
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto flex-1 sm:p-6 p-4 flex flex-col"
    >
      <div className="">
        <h1 className="text-[20px] text-white font-bold">
          Simulador de partidos
        </h1>
        <p className="text-white font-extralight">
          Selecciona un partido y simula el resultado
        </p>
      </div>
      {[].length > 0 ? (
        Object.entries(SIMULATION_PAGES).map(([dataId, dataComponent]) => {
          const data = currentSection === Number(dataId);
          return data ? <div key={dataId}>{dataComponent}</div> : null;
        })
      ) : (
        <div className="mt-4  flex-1 grid place-items-center">
          <ComponentEmpty textComponentEmpty="Aún no hay partidos para simular" />
        </div>
      )}
    </motion.div>
  );
};
