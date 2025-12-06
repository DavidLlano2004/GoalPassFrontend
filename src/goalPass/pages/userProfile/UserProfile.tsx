import { motion } from "framer-motion";
import { MyInformation } from "./sections/MyInformation";
import { MyTickets } from "./sections/MyTickets";
import { MyHistory } from "./sections/MyHistory";
import { useState } from "react";
import { CardStadisticsProfile } from "../../components/molecules/cards/CardStadisticsProfile";
import { useQueryMe } from "../../hooks/useQueryMe.hook";
import { Spinner } from "@heroui/spinner";
import { useQueryMatches } from "../../hooks";
import { useCapitalizeWord } from "../../../shared/hooks/useCapitalizeWord";

export const UserProfile = () => {
  const { capitalized } = useCapitalizeWord();
  const { getMeQuery } = useQueryMe();
  const { getHistoryPurchaseMatchesQuery } = useQueryMatches();
  const [currentSection, setCurrentSection] = useState(0);

  const optionsSection = [
    {
      id: 0,
      sectionName: "Mis datos",
      sectionIcon: "fi fi-rr-user",
    },
    {
      id: 1,
      sectionName: "Mis boletas",
      sectionIcon: "fi fi-sr-ticket",
    },
    {
      id: 2,
      sectionName: "Historial",
      sectionIcon: "fi fi-rr-time-past",
    },
  ];
  const SECTIONS_PROFILE = {
    0: <MyInformation userInformation={getMeQuery.data?.user} />,
    1: <MyTickets />,
    2: (
      <MyHistory matches={getHistoryPurchaseMatchesQuery.data?.data?.matches} />
    ),
  };

  let isLoading =
    getHistoryPurchaseMatchesQuery.isLoading || getMeQuery.isLoading;

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Spinner size="lg" color="white" label="Cargando..." />
      </div>
    );
  }

  console.log("====================================");
  console.log(getHistoryPurchaseMatchesQuery.data?.data);
  console.log("====================================");

  console.log(getMeQuery.data?.user);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto flex-1 sm:p-6 p-4 flex flex-col items-center"
    >
      <div className="rounded-[15px] bg-black-2-custom min-h-[321px] w-full max-w-[1123px] relative">
        <div className="bg-gray-2-custom h-[161px] rounded-tr-[15px] rounded-tl-[15px]"></div>
        <div className=" absolute w-full h-full top-0 flex flex-col justify-center px-14">
          <div className="flex items-end sm:gap-6 gap-2 flex-wrap ">
            <div className="w-[110px] h-[110px] rounded-full bg-[#B0B0B0] border-8 border-black-2-custom grid place-items-center">
              <p className="font-bold text-[32px]">
                {capitalized(getMeQuery.data?.user?.name ?? "")}
              </p>
            </div>
            <div className=" translate-y-4">
              <h1 className="text-[24px] font-extrabold">
                {getMeQuery.data?.user?.name} {getMeQuery.data?.user?.last_name}
              </h1>
              <span className="flex items-center gap-3">
                <i className="fi fi-tr-envelope text-white text-[16px] flex"></i>
                <p className="font-light">{getMeQuery.data?.user?.email}</p>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1123px] mt-3 xl:flex-row flex flex-col justify-between gap-3">
        <div
          className={`xl:max-w-[769px] w-full flex flex-col overflow-hidden ${currentSection === 0 ? "min-h-[710px]" : "h-[710px]"} rounded-[15px] bg-black-2-custom sm:p-10 p-8 xl:order-1 order-2`}
        >
          <div className="flex gap-3 overflow-x-auto pb-3">
            {optionsSection?.map((data, i) => (
              <button
                key={data.id}
                onClick={() => setCurrentSection(data.id)}
                className={`cursor-pointer min-w-[190px] h-[45px] hover:bg-white/30 transition-all duration-200 ${
                  currentSection === i
                    ? "bg-linear-to-l from-green-1-custom to-blue-1-custom"
                    : "bg-transparent sm:border-0 border"
                } rounded-[15px] flex items-center justify-center gap-2`}
              >
                <i
                  className={`${data.sectionIcon} text-white text-[16px] flex`}
                ></i>
                <p className="text-[16px] font-bold">{data.sectionName}</p>
              </button>
            ))}
          </div>
          <div className="mt-6 flex-1 max-h-full flex flex-col overflow-hidden ">
            {Object.entries(SECTIONS_PROFILE).map(([dataId, dataComponent]) => {
              const data = currentSection === Number(dataId);
              return data ? (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  key={dataId}
                  className="flex-1 max-h-full flex flex-col overflow-hidden"
                >
                  {dataComponent}
                </motion.div>
              ) : null;
            })}
          </div>
        </div>

        <div className="xl:max-w-[333px] w-full bg-black-2-custom h-fit rounded-[15px] p-8 xl:order-2 order-1">
          <h1 className="text-[18px] font-bold">Estadisticas personales</h1>
          <div className="mt-4 flex flex-col gap-3">
            <CardStadisticsProfile
              subtitle="Partidos asistidos"
              title={`${getHistoryPurchaseMatchesQuery.data?.data?.summary?.total_matches}`}
              iconCard="fi fi-rr-trophy"
            />
            <CardStadisticsProfile
              subtitle="Grada favorita"
              title={`${getHistoryPurchaseMatchesQuery.data?.data?.summary?.favorite_stand?.name || "Sin información"}`}
              iconCard="fi fi-rs-marker"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
