import { motion } from "framer-motion";
import { CardReports } from "../components/molecules/cards/CardReports";
import { CardChartsReport } from "../components/molecules/cards/CardChartsReport";
import { CardTopReport } from "../components/molecules/cards/CardTopReport";
import { ComponentEmpty } from "../../shared/components/molecules/empty/ComponentEmpty";
import { useQueryReport } from "../hooks/useQueryReports.hook";
import { Spinner } from "@heroui/spinner";
import { useFormatNumber } from "../../shared/hooks/useFormatNumber";
import { useCapitalizeWord } from "../../shared/hooks/useCapitalizeWord";
import LineChart from "../../shared/components/organims/charts/LineChart";
import BarChart from "../../shared/components/organims/charts/BarChart";
import PieChart2 from "../../shared/components/organims/charts/PieChart2";

export const ReportsPage = () => {
  const { capitalized } = useCapitalizeWord();
  const { formatNumber } = useFormatNumber();
  const { getInfoReportsQuery } = useQueryReport();
  if (getInfoReportsQuery.isLoading) {
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
            Reportes y estadísticas
          </h1>
          <p className="text-white font-extralight">Analisis de ventas</p>
        </div>
        {(getInfoReportsQuery.data?.data?.totalStats?.totalTicketsSold ?? 0) >
        0 ? (
          <div className="mt-6 grid grid-cols-4 gap-3">
            <CardReports
              titleCard="Total de ingresos (COP)"
              subtitleCard={`$ ${formatNumber(getInfoReportsQuery.data?.data?.totalStats?.totalRevenue ?? 0)}`}
              iconCard="fi fi-rr-dollar"
            />

            <CardReports
              titleCard="Boletas vendidas"
              subtitleCard={`${formatNumber(getInfoReportsQuery.data?.data?.totalStats?.totalTicketsSold ?? 0)}`}
              iconCard="fi fi-ss-ticket"
            />
            <CardReports
              titleCard="Total de ocupación"
              subtitleCard={`${formatNumber(getInfoReportsQuery.data?.data?.totalStats?.totalOccupancyPercentage ?? 0)}%`}
              iconCard="fi fi-tr-chart-pie-alt"
            />
            <CardReports
              titleCard="Grada más popular"
              iconCard="fi fi-rr-trophy"
              soccerStand
              wordStand={`${capitalized(getInfoReportsQuery.data?.data?.totalStats?.mostPopularStand ?? "")}`}
              stand={
                getInfoReportsQuery.data?.data?.totalStats?.mostPopularStand
              }
            />

            <CardChartsReport
              title="Ventas por día (COP)"
              subTitle="Tendencia de ventas"
            >
              <LineChart data={getInfoReportsQuery.data?.data?.revenueByDay} />
            </CardChartsReport>

            <CardChartsReport
              title="Ingresos por grada (COP)"
              subTitle="Comparativa de ingreso por sección"
            >
              <BarChart data={getInfoReportsQuery.data?.data?.revenueByStand} />
            </CardChartsReport>

            <CardChartsReport
              title="Ventas por grada"
              subTitle="Porcentaje de boletas vendidas"
            >
              <PieChart2
                data={getInfoReportsQuery.data?.data?.ticketsByStand}
              />
            </CardChartsReport>

            <CardChartsReport
              title="Top 3 partidos más vendidos"
              subTitle="Mayor compra de boletas"
            >
              <div className="flex flex-col h-full justify-between gap-4">
                {getInfoReportsQuery.data?.data.matchesDetails.map((match) => (
                  <CardTopReport key={match?.match_id} match={match} />
                ))}
              </div>
            </CardChartsReport>
          </div>
        ) : (
          <div className="mt-4  flex-1 grid place-items-center">
            <ComponentEmpty textComponentEmpty="Aún no hay reportes" />
          </div>
        )}
      </div>
    </motion.div>
  );
};
