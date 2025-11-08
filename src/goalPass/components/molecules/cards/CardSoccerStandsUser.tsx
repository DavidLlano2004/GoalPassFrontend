import React from "react";
import { motion } from "framer-motion";

interface Props {
  textChip?: string;
  nameSoccerStand?: string;
  capacitySoccerStand?: string;
  actionCard?: (event: React.MouseEvent<HTMLDivElement>) => void;
  chooseCard: boolean;
}

export const CardSoccerStandsUser = ({
  textChip = "Pocas disponibles",
  nameSoccerStand = "Occidental",
  capacitySoccerStand = "8,000",
  actionCard,
  chooseCard = false,
}: Props) => {
  const colorChip = () => {
    switch (textChip) {
      case "Disponibles":
        return {
          containerChip: "bg-green-1-custom/30 border-green-1-custom ",
          textChip: "text-green-1-custom",
          bgCircle: "bg-green-1-custom",
        };
      case "Pocas disponibles":
        return {
          containerChip: "bg-yellow-1-custom/30 border-yellow-1-custom ",
          textChip: "text-[#FFD600]",
          bgCircle: "bg-yellow-1-custom",
        };

      default:
        return {
          containerChip: "bg-red-1-custom/30 border-red-1-custom ",
          textChip: "text-red-1-custom",
          bgCircle: "bg-red-1-custom",
        };
    }
  };

  return (
    <motion.div
      onClick={actionCard}
      className={`w-full hover:bg-linear-to-r from-blue-1-custom to-green-1-custom active:scale-[1.03] min-h-[194px] transition-all duration-200 ease-in rounded-[15px] p-px cursor-pointer ${
        chooseCard
          ? "bg-linear-to-r from-blue-1-custom to-green-1-custom"
          : "bg-white"
      }`}
    >
      <div className="w-ful h-full bg-gray-2-custom rounded-[15px] p-6">
        <div className="sm:flex-row flex-col flex justify-between flex-wrap items-center">
          <h1 className="text-[20px] text-white font-bold">
            {nameSoccerStand}
          </h1>
          <div
            className={`max-w-36 w-full h-[30px] border rounded-[15px] flex items-center justify-center gap-2 sm:my-0 my-2 ${
              colorChip().containerChip
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${colorChip().bgCircle}`}
            ></div>
            <p className={`text-[12px] ${colorChip().textChip}`}>{textChip}</p>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <p className="text-[14px] font-light">
            Capacidad: {capacitySoccerStand} personas
          </p>
          <h1 className="text-[20px] font-extrabold">$50,000</h1>
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <p className="text-[14px] text-white font-extralight">
              Disponibles: <b className="font-bold">800</b>
            </p>
            <p className="text-[14px] text-white font-extralight">
              84.3% ocupado
            </p>
          </div>
          <div className="w-full bg-[#676767] rounded-lg h-2.5 my-2">
            <div className="w-[60%] bg-linear-to-r from-blue-1-custom to-green-1-custom rounded-lg h-2.5"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
