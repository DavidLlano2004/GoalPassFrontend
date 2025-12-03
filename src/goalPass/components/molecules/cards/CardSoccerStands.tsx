import React from "react";
import { useFormatNumber } from "../../../../shared/hooks/useFormatNumber";

interface Props {
  soccerStand: Stand;
}

interface Stand {
  stand_id: string;
  stand_name: string;
  description: string;
  total_capacity: number;
  price: number;
  tickets_sold: number;
  tickets_available: number;
  occupancy_percentage: number;
  revenue: number;
  availability: string;
}

export const CardSoccerStands = ({ soccerStand }: Props) => {
  const { formatNumber } = useFormatNumber();
  const colorChip = () => {
    switch (soccerStand.availability) {
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
    <div className="w-full border border-white min-h-[194px] rounded-[15px] p-6 bg-gray-2-custom">
      <div className="sm:flex-row flex-col flex justify-between flex-wrap items-center">
        <h1 className="text-[20px] text-white font-bold">
          {soccerStand.stand_name}
        </h1>
        <div
          className={`max-w-36 w-full h-[30px] border rounded-[15px] flex items-center justify-center gap-2 sm:my-0 my-2 ${
            colorChip().containerChip
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${colorChip().bgCircle}`}
          ></div>
          <p className={`text-[12px] ${colorChip().textChip}`}>
            {soccerStand.availability}
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <p className="text-[14px] font-light">
          Capacidad: {formatNumber(soccerStand.total_capacity)} personas
        </p>
        <h1 className="text-[20px] font-extrabold">$ {formatNumber(soccerStand.price)}</h1>
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <p className="text-[14px] text-white font-extralight">
            Vendidas: <b className="font-bold">{formatNumber(soccerStand.tickets_sold)}</b>
          </p>
          <p className="text-[14px] text-white font-extralight">
            Disponibles:{" "}
            <b className={`font-bold ${colorChip().textChip}`}>{formatNumber(soccerStand.tickets_available)}</b>
          </p>
        </div>
        <div className="w-full bg-[#676767] rounded-lg h-2.5 my-2">
          <div style={{width:`${soccerStand.occupancy_percentage ?? 0}%`}} className="bg-linear-to-r from-blue-1-custom to-green-1-custom rounded-lg h-2.5"></div>
        </div>
        <div className="flex justify-between items-center">
          <p className=" text-white font-extralight text-[14px]">
            <b className="font-bold">{formatNumber(soccerStand.occupancy_percentage)}%</b> vendido
          </p>
          <p className=" text-white font-extralight text-[14px]">
            Ingresos: $ {formatNumber(soccerStand.revenue)}
          </p>
        </div>
      </div>
    </div>
  );
};