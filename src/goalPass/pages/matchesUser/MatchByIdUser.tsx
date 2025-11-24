import React, { useState } from "react";
import { Images } from "../../../assets/images/ImagesProvider";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { CardSoccerStandsUser } from "../../components/molecules/cards/CardSoccerStandsUser";
import { EmptyShopping } from "./components/EmptyShopping";
import { StepsPayment } from "./components/stepsPayment/StepsPayment";
const { ImageBgAuth, ImageNacional, ImageOnceCaldas } = Images;
export const MatchByIdUser = () => {
  const navigate = useNavigate();

  const [chooseCardId, setChooseCardId] = useState<number | null>(null);

  const soccerStandsArray = [
    {
      id: 0,
      name: "Occidental",
      textChip: "Disponibles",
    },
    {
      id: 1,
      name: "Oriental",
      textChip: "Agotadas",
    },
    {
      id: 2,
      name: "Norte",
      textChip: "Pocas disponibles",
    },
    {
      id: 3,
      name: "Sur",
      textChip: "Disponibles",
    },
  ];
  return (
    <div
      style={{
        background: `url(${ImageBgAuth})`,
        backgroundPosition: "center",
      }}
      className="overflow-hidden flex-1 flex flex-col bg-no-repeat"
    >
      <div className="flex-1  overflow-y-auto bg-black/70">
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
                  <img className="h-[85px]" src={ImageOnceCaldas} alt="" />
                </span>
                <p className=" font-semibold text-[20px]">Once Caldas</p>
              </div>
              <div>
                <h1 className="text-[32px] font-extrabold">VS</h1>
              </div>
              <div className="flex flex-col justify-center items-center gap-2  min-w-[200px]">
                <span>
                  <img className="h-[85px]" src={ImageNacional} alt="" />
                </span>
                <p className=" font-semibold text-[20px]">Atletico Nacional</p>
              </div>
            </div>
            
            <h1 className="font-extrabold text-[22px] text-center mt-8 mb-4">
              Once Caldas vs Atletico Nacional
            </h1>
            <div className=" flex sm:gap-10 gap-4 flex-wrap justify-center items-center">
              <div className="flex items-center gap-2">
                <i className="fi fi-tr-calendar-day flex text-[14px]"></i>
                <p className="text-[14px]">15 Nov 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fi fi-tr-clock-five flex text-[14px]"></i>
                <p className="text-[14px]">08:00 am</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fi fi-rr-marker flex text-[14px]"></i>
                <p className="text-[14px]">Estadio Palogrande</p>
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
                {soccerStandsArray?.map((data, i) => (
                  <CardSoccerStandsUser
                    key={data?.id}
                    textChip={data.textChip}
                    nameSoccerStand={data.name}
                    chooseCard={chooseCardId === i}
                    actionCard={() => setChooseCardId(data?.id)}
                  />
                ))}
              </div>
            </div>
            <div className="bg-black-2-custom min-h-[354px] rounded-[15px] p-8 flex flex-col h-fit">
              <div className="flex items-center gap-3">
                <i className="fi fi-tr-cart-shopping-fast text-[20px] text-white flex"></i>
                <h1 className="text-[20px] text-white font-bold">
                  Resumen de tu compra
                </h1>
              </div>

              {chooseCardId === null ? <EmptyShopping /> : <StepsPayment />}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
