import React from "react";

type TitleType = "Todos los partidos" | "Ingresos totales" | "Asistencia total";

interface Props {
  title: TitleType;
  subtitle: string;
  className?: string;
}

export const CardHistorySmall = ({ title, subtitle, className }: Props) => {
  const getStylesCard = () => {
    switch (title) {
      case "Todos los partidos":
        return {
          bgChip: "bg-blue-1-custom/30 text-[#3075FF]",
          icon: "fi fi-rr-trophy",
        };
      case "Ingresos totales":
        return {
          bgChip: "bg-green-1-custom/30 text-green-1-custom",
          icon: "fi fi-tr-arrow-trend-up",
        };

      default:
        return {
          bgChip: "bg-orange-1-custom/30 text-orange-1-custom",
          icon: "fi fi-tr-users",
        };
    }
  };

  return (
    <div
      className={`w-full min-h-[70px] bg-black-2-custom rounded-[15px] flex gap-4 items-center py-3 px-4 ${className}`}
    >
      <div
        className={`w-14 h-14 rounded-[10px] grid place-items-center ${
          getStylesCard().bgChip
        }`}
      >
        <i className={` ${getStylesCard().icon} text-[20px] flex`}></i>
      </div>
      <div>
        <p className="text-[15px] font-light">{title}</p>
        <p className="font-bold text-[18px]">{subtitle}</p>
      </div>
    </div>
  );
};
