import { motion } from "framer-motion";
import { CardChartsDashboard } from "../../components/molecules/cards/CardChartsDashboard";
import { CardDashboard } from "../../components/molecules/cards/CardDashboard";
import { CardNextMatches } from "../../components/molecules/cards/CardNextMatches";
import { ComponentWelcomeDash } from "../../components/organims/ComponentWelcomeDash";
import { useQueryMatches } from "../../hooks";
import { Spinner } from "@heroui/spinner";
import { useQueryDashboard } from "../../hooks/useQueryDashboard.hook";
import { useFormatNumber } from "../../../shared/hooks/useFormatNumber";
import BarChartDouble from "../../../shared/components/organims/charts/BarChartDouble";
import ScatterChart from "../../../shared/components/organims/charts/ScatterChart";

export const DashBoard = () => {
  const { formatNumber } = useFormatNumber();
  const { getMatchesQuery } = useQueryMatches();
  const { getInfoDashboardQuery } = useQueryDashboard();

  let isLoading = getInfoDashboardQuery.isLoading || getMatchesQuery.isLoading;

  if (isLoading) {
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
      className="overflow-y-auto flex-1 sm:p-6 p-4 "
    >
      <div className="w-full max-w-[1123px] mx-auto flex-1 flex flex-col">
        {getMatchesQuery.data?.matches?.length > 0 ? (
          <>
            <div className="flex justify-between items-center gap-3 flex-wrap">
              <CardDashboard
                titleCard="Ventas de hoy"
                subTitleCard={`$ ${formatNumber(getInfoDashboardQuery.data?.data?.dailyRevenue[0]?.daily_revenue ?? 0)}`}
                percentage=""
              />
              <CardDashboard
                titleCard="Próximos partidos"
                percentage=""
                subTitleCard={`${getInfoDashboardQuery.data?.data?.upcomingMatches?.count}`}
                bgContainerIcon="bg-blue-1-custom/30"
                cardIcon="fi fi-br-calendar-day"
                colorIcon="text-blue-1-custom"
              />
              <CardDashboard
                titleCard="Boletas vendidas"
                subTitleCard={`${getInfoDashboardQuery.data?.data?.summary?.total_tickets_sold}`}
                percentage=""
                cardIcon="fi fi-sr-ticket"
              />
              <CardDashboard
                cardIcon="fi fi-ts-arrow-trend-up"
                bgContainerIcon="bg-red-1-custom/30"
                colorIcon="text-red-1-custom"
                colorPercentage="text-red-1-custom"
                percentage=""
                titleCard="Ingresos del mes"
                subTitleCard={`$ ${formatNumber(getInfoDashboardQuery.data?.data?.dailyRevenue[0]?.daily_revenue ?? 0)}`}
              />
            </div>
            <div className="mt-3 flex-wrap justify-between items-center flex flex-row gap-3 w-full">
              <CardChartsDashboard
                title={"Ventas por grada"}
                subtitle={"Boletas vendidas vs capacidad total"}
              >
                <BarChartDouble
                  data={getInfoDashboardQuery.data?.data?.standComparison}
                />
              </CardChartsDashboard>
              <CardChartsDashboard
                title={"Tendencia de ventas"}
                subtitle={"Ventas de la semana"}
              >
                <ScatterChart
                  data={getInfoDashboardQuery.data?.data?.salesTrend}
                />
              </CardChartsDashboard>
            </div>
            {getInfoDashboardQuery.data?.data?.upcomingMatches?.count != 0 && (
              <div className="bg-black-2-custom w-full h-auto mt-3 rounded-[15px] p-6">
                <h1 className="text-base font-bold text-white">
                  Próximos partidos
                </h1>
                <p className="text-[15px] font-light text-white mt-1">
                  Estado de venta para los próximos partidos
                </p>
                <div className="mt-6 flex flex-col gap-6">
                  {getInfoDashboardQuery.data?.data?.upcomingMatches?.matches?.map(
                    (match) => (
                      <CardNextMatches key={match?.match_id} match={match} />
                    )
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <ComponentWelcomeDash />
        )}
      </div>
    </motion.div>
  );
};
