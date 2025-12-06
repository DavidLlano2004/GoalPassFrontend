import React, { useMemo, useState } from "react";
import { Images } from "../../../assets/images/ImagesProvider";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { CardSoccerStandsUser } from "../../components/molecules/cards/CardSoccerStandsUser";
import { EmptyShopping } from "./components/EmptyShopping";
import { StepsPayment } from "./components/stepsPayment/StepsPayment";
import { useQueryMatches } from "../../hooks";
import { Spinner } from "@heroui/spinner";
import { useQuerySoccerStands } from "../../hooks/useQuerySoccerStands.hook";
import type { Stand } from "../Matches";
const { ImageBgAuth } = Images;

export const MatchByIdUser = () => {
  const { id } = useParams();
  const { getMatchQuery } = useQueryMatches(id!);
  const { getSoccerStandsSummary } = useQuerySoccerStands(id!);

  const navigate = useNavigate();

  const [chooseCardId, setChooseCardId] = useState<string | null>("");
  const [soccerStandInfo, setSoccerStandInfo] = useState<Stand | null>(null);

  const actionChooseSoccerStand = (soccerStand: Stand) => {
    setChooseCardId(soccerStand.stand_id);
    setSoccerStandInfo(soccerStand);
  };

  const formattedBirthday = getMatchQuery?.data?.match?.match_date
    ? new Date(getMatchQuery?.data?.match?.match_date).toLocaleDateString(
        "es-ES",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : null;

  const formatTo12Hour = (time: string) => {
    if (!time) return "";

    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);

    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    if (hour === 0) hour = 12;

    const hourFormatted = String(hour).padStart(2, "0");

    return `${hourFormatted}:${minute} ${ampm}`;
  };

  const getIdStandPrice = useMemo(() => {
    return getMatchQuery?.data?.match?.stand_prices?.find(
      (standPrice) => standPrice?.stand?.id === chooseCardId
    );
  }, [chooseCardId, getMatchQuery?.data?.match?.stand_prices]);

  const isLoading = getMatchQuery.isLoading;

  console.log(getSoccerStandsSummary?.data?.response.stands);
  


  return (
    <div
      style={{
        background: `url(${ImageBgAuth})`,
        backgroundPosition: "center",
      }}
      className="overflow-hidden flex-1 flex flex-col bg-no-repeat"
    >
      <div className="flex-1  overflow-y-auto bg-black/70 flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex justify-center items-center">
            <Spinner size="lg" color="white" label="Cargando..." />
          </div>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="min-h-80 bg-linear-to-b from-blue-1-custom/70 to-green-1-custom/70 p-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center w-[170px] gap-3 cursor-pointer sm:mb-0 mb-10 "
              >
                <i className="fi fi-rr-arrow-small-left text-[25px] flex"></i>
                <p className="font-extrabold">Volver a partidos</p>
              </button>

              <div className=" mt-4 lg:flex-row flex-col flex items-center justify-center sm:gap-12 gap-6">
                <div className="flex flex-col justify-center items-center gap-2  min-w-[200px]">
                  <span>
                    <img
                      className="h-[85px]"
                      src={getMatchQuery?.data?.match?.local?.image_url}
                      alt=""
                    />
                  </span>
                  <p className=" font-semibold text-[20px]">
                    {getMatchQuery?.data?.match?.local?.name}
                  </p>
                </div>
                <div>
                  <h1 className="text-[32px] font-extrabold">VS</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-2  min-w-[200px]">
                  <span>
                    <img
                      className="h-[85px]"
                      src={getMatchQuery?.data?.match?.visitor?.image_url}
                      alt=""
                    />
                  </span>
                  <p className=" font-semibold text-[20px]">
                    {getMatchQuery?.data?.match?.visitor?.name}
                  </p>
                </div>
              </div>

              <h1 className="font-extrabold text-[22px] text-center mt-8 mb-4">
                {getMatchQuery?.data?.match?.local?.name} vs{" "}
                {getMatchQuery?.data?.match?.visitor?.name}
              </h1>
              <div className=" flex sm:gap-10 gap-4 flex-wrap justify-center items-center">
                <div className="flex items-center gap-2">
                  <i className="fi fi-tr-calendar-day flex text-[14px]"></i>
                  <p className="text-[14px]">{formattedBirthday}</p>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fi fi-tr-clock-five flex text-[14px]"></i>
                  <p className="text-[14px]">
                    {formatTo12Hour(
                      getMatchQuery?.data?.match?.match_hour || ""
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fi fi-rr-marker flex text-[14px]"></i>
                  <p className="text-[14px]">
                    {getMatchQuery?.data?.match?.stadium}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid xl:grid-cols-[2fr_1fr] lg:grid-cols-[1.2fr_1fr] grid-cols-1 p-4 gap-4 w-full max-w-[1123px] mx-auto ">
              <div className="bg-black-2-custom min-h-[880px] rounded-[15px] p-8">
                <div className="flex items-center gap-3">
                  <i className="fi fi-tr-cart-shopping-fast text-[20px] text-white flex"></i>
                  <h1 className="text-[20px] text-white font-bold">
                    Selecciona tu ubicación
                  </h1>
                </div>
                <div className="grid grid-cols-1 gap-6 mt-6">
                  {getSoccerStandsSummary?.data?.response.stands?.map(
                    (soccerStand) => (
                      <CardSoccerStandsUser
                        key={soccerStand?.stand_id}
                        chooseCard={chooseCardId === soccerStand.stand_id}
                        actionCard={() => actionChooseSoccerStand(soccerStand)}
                        soccerStand={soccerStand}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="bg-black-2-custom min-h-[354px] rounded-[15px] p-8 flex flex-col h-fit">
                <div className="flex items-center gap-3">
                  <i className="fi fi-tr-cart-shopping-fast text-[20px] text-white flex"></i>
                  <h1 className="text-[20px] text-white font-bold">
                    Resumen de tu compra
                  </h1>
                </div>

                {chooseCardId === "" ? (
                  <EmptyShopping />
                ) : (
                  <StepsPayment
                    matchId={id!}
                    soccerStandInfo={soccerStandInfo}
                    standPriceId={getIdStandPrice?.id!}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
