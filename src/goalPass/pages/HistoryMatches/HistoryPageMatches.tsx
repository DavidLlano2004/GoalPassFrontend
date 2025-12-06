import React from "react";
import { useFormatNumber } from "../../../shared/hooks/useFormatNumber";
import { useQueryMatches } from "../../hooks";
import { Spinner } from "@heroui/spinner";
import { motion } from "framer-motion";
import { CardHistorySmall } from "../../components/molecules/cards/CardHistorySmall";
import { CardInfoMatchHistory } from "../../components/molecules/cards/CardInfoMatchHistory";
import { ComponentEmpty } from "../../../shared/components/molecules/empty/ComponentEmpty";

export const HistoryPageMatches = () => {
  const { formatNumber } = useFormatNumber();
  const { getHistoryMatchesQuery } = useQueryMatches();

  if (getHistoryMatchesQuery.isLoading) {
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
      className="overflow-y-auto flex-1 sm:p-6 p-4 flex flex-col"
    >
      <div className="w-full max-w-[1123px] mx-auto flex-1 flex flex-col">
        <div className="">
          <h1 className="text-[20px] text-white font-bold">
            Historial de partidos
          </h1>
          <p className="text-white font-extralight">
            Registro de partidos simulados.
          </p>
        </div>

        {getHistoryMatchesQuery.data?.matches?.length != 0 ? (
          <>
            <div className="mt-6 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full max-w-[800px] gap-4">
              <CardHistorySmall
                title="Todos los partidos"
                subtitle={`${getHistoryMatchesQuery.data?.summary?.total_matches ?? 0}`}
              />
              <CardHistorySmall
                title="Ingresos totales"
                subtitle={`$ ${formatNumber(getHistoryMatchesQuery.data?.summary?.total_revenue ?? 0)}`}
              />
              <CardHistorySmall
                title="Asistencia total"
                subtitle={`${getHistoryMatchesQuery.data?.summary?.total_tickets_sold ?? 0}`}
                className="lg:col-span-1 col-span-full"
              />
            </div>

            <div className="flex flex-col mt-4 gap-4">
              {getHistoryMatchesQuery.data?.matches?.map((match) => (
                <CardInfoMatchHistory key={match?.id} match={match} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-4  flex-1 grid place-items-center">
            <ComponentEmpty textComponentEmpty="Aún no hay historial de partidos" />
          </div>
        )}
      </div>
    </motion.div>
  );
};
