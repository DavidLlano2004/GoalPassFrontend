import { motion } from "framer-motion";
import { CardReports } from "../components/molecules/cards/CardReports";
import { CardChartsReport } from "../components/molecules/cards/CardChartsReport";
import { CardTopReport } from "../components/molecules/cards/CardTopReport";
import { ComponentEmpty } from "../../shared/components/molecules/empty/ComponentEmpty";

export const ReportsPage = () => {
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
          Reportes y estadísticas
        </h1>
        <p className="text-white font-extralight">Analisis de ventas</p>
      </div>
      {[].length > 0 ? (
        <div className="mt-6 grid grid-cols-4 gap-3">
          <CardReports
            titleCard="Total de ingresos"
            subtitleCard="$625,000"
            iconCard="fi fi-rr-dollar"
          />

          <CardReports
            titleCard="Boletas vendidas"
            subtitleCard="10,500"
            iconCard="fi fi-ss-ticket"
          />
          <CardReports
            titleCard="Total de ocupación"
            subtitleCard="87%"
            iconCard="fi fi-tr-chart-pie-alt"
          />
          <CardReports
            titleCard="Grada más popular"
            iconCard="fi fi-rr-trophy"
            soccerStand
          />

          <CardChartsReport
            title="Ventas por día"
            subTitle="Tendencia de ventas"
          />

          <CardChartsReport
            title="Ingresos por grada"
            subTitle="Comparativa de ingreso por sección"
          />

          <CardChartsReport
            title="Ventas por grada"
            subTitle="Porcentaje de boletas vendidas"
          />

          <CardChartsReport
            title="Top 3 partidos más vendidos"
            subTitle="Mayor compra de boletas"
          >
            <div className="flex flex-col h-full justify-between gap-4">
              <CardTopReport />
              <CardTopReport />
              <CardTopReport />
            </div>
          </CardChartsReport>
        </div>
      ) : (
        <div className="mt-4  flex-1 grid place-items-center">
          <ComponentEmpty textComponentEmpty="Aún no hay reportes" />
        </div>
      )}
    </motion.div>
  );
};
