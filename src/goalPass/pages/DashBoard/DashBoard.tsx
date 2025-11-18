import { motion } from "framer-motion";
import { CardChartsDashboard } from "../../components/molecules/cards/CardChartsDashboard";
import { CardDashboard } from "../../components/molecules/cards/CardDashboard";
import { CardNextMatches } from "../../components/molecules/cards/CardNextMatches";
import { ComponentWelcomeDash } from "../../components/organims/ComponentWelcomeDash";

export const DashBoard = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto flex-1 sm:p-6 p-4 "
    >
      <div className="w-full max-w-[1123px] mx-auto flex-1 flex flex-col">
        {[].length > 0 ? (
          <>
            <div className="flex justify-between items-center gap-3 flex-wrap">
              <CardDashboard
                titleCard="Ventas de hoy"
                subTitleCard="$430,000"
                percentage="+12.5%"
              />
              <CardDashboard
                titleCard="Próximos partidos"
                percentage=""
                subTitleCard="8"
                bgContainerIcon="bg-blue-1-custom/30"
                cardIcon="fi fi-br-calendar-day"
                colorIcon="text-blue-1-custom"
              />
              <CardDashboard
                titleCard="Boletas vendidas"
                subTitleCard="2,530"
                percentage="+1.2%"
                cardIcon="fi fi-sr-ticket"
              />
              <CardDashboard
                cardIcon="fi fi-ts-arrow-trend-up"
                bgContainerIcon="bg-red-1-custom/30"
                colorIcon="text-red-1-custom"
                colorPercentage="text-red-1-custom"
                percentage="-3.5%"
                titleCard="Ingresos del mes"
                subTitleCard="$892,800"
              />
            </div>
            <div className="mt-3 flex-wrap justify-between items-center flex flex-row gap-3 w-full">
              <CardChartsDashboard />
              <CardChartsDashboard />
            </div>
            <div className="bg-black-2-custom w-full min-h-[410px] h-auto mt-3 rounded-[15px] p-6">
              <h1 className="text-base font-bold text-white">
                Próximos partidos
              </h1>
              <p className="text-[15px] font-light text-white mt-1">
                Estado de venta para los próximos partidos
              </p>
              <div className="mt-6 flex flex-col gap-6">
                <CardNextMatches />
                <CardNextMatches textChip="Crítico" />
                <CardNextMatches textChip="Atención" />
                <CardNextMatches />
              </div>
            </div>
          </>
        ) : (
          <ComponentWelcomeDash />
        )}
      </div>
    </motion.div>
  );
};
