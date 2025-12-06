import { useState } from "react";
import { SimulationMatchesPage } from "./SimulationMatchesPage";
import { SimulationInfoMatchPage } from "./SimulationInfoMatchPage";
import { motion } from "framer-motion";
import { SimulationResults } from "./SimulationResults";
import { ComponentEmpty } from "../../../shared/components/molecules/empty/ComponentEmpty";
import { useQueryMatches } from "../../hooks";
import { Spinner } from "@heroui/spinner";
import { useMutationSimulation } from "../../hooks/useMutationSimulation.hooks";

export const SimulationLayout = () => {
  const { createSimulationMatchMutation } = useMutationSimulation();
  const { getMatchesQuery } = useQueryMatches();
  const [currentSection, setCurrentSection] = useState(0);
  const [dataMatch, setDataMatch] = useState(null);

  const filterMatches = getMatchesQuery.data?.matches.filter(
    (match) => match?.state === "en_venta"
  );

  const chooseMatch = (match: any) => {
    setDataMatch(match);
    setCurrentSection(1);
  };

  const changeMatch = () => {
    setDataMatch(null);
    setCurrentSection(0);
  };

  const createSimulationFunction = () => {
    createSimulationMatchMutation.mutate(dataMatch?.id, {
      onSuccess: () => {
        setCurrentSection(2);
      },
    });
  };


  const SIMULATION_PAGES = {
    0: (
      <SimulationMatchesPage
        matches={filterMatches ?? []}
        actionCard={chooseMatch}
      />
    ),
    1: (
      <SimulationInfoMatchPage
        dataMatch={dataMatch}
        setCurrentSection={setCurrentSection}
        changeMatch={changeMatch}
        simulateFunction={createSimulationFunction}
        isLoadingButton={createSimulationMatchMutation.isPending}
      />
    ),
    2: (
      <SimulationResults
        matchId={dataMatch?.id}
        setCurrentSection={setCurrentSection}
      />
    ),
  };

  if (getMatchesQuery.isLoading) {
    return (
      <div className="flex-1 w-full max-w-[1123px] mx-auto flex justify-center items-center">
        <Spinner size="lg" color="white" label="Cargando..." />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto flex-1 sm:p-6 p-4 flex flex-col "
    >
      <div className="w-full max-w-[1123px] mx-auto flex-1 flex flex-col">
        <div className="">
          <h1 className="text-[20px] text-white font-bold">
            Simulador de partidos
          </h1>
          <p className="text-white font-extralight">
            Selecciona un partido y simula el resultado
          </p>
        </div>
        {(filterMatches?.length ?? 0) > 0 ? (
          Object.entries(SIMULATION_PAGES).map(([dataId, dataComponent]) => {
            const data = currentSection === Number(dataId);
            return data ? <div key={dataId}>{dataComponent}</div> : null;
          })
        ) : (
          <div className="mt-4  flex-1 grid place-items-center">
            <ComponentEmpty textComponentEmpty="Aún no hay partidos para simular" />
          </div>
        )}
      </div>
    </motion.div>
  );
};
