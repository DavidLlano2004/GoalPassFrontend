import React from "react";
interface Props {
  colorPercentage?: string;
  bgContainerIcon?: string;
  percentage?: string;
  colorIcon?: string;
  cardIcon?: string;
  titleCard?: string;
  subTitleCard?: string;
}

export const CardDashboard = ({
  colorPercentage = "text-green-1-custom",
  bgContainerIcon = "bg-green-1-custom/30",
  colorIcon = "text-green-1-custom",
  cardIcon = "fi fi-rr-dollar",
  percentage = "+12.5%",
  titleCard = "Ventas de hoy",
  subTitleCard = " $430.00",
}: Props) => {
  return (
    <div className="bg-black-2-custom flex-1 min-w-[270px] h-[150px] rounded-[15px] p-6 flex items-center">
      <div className="w-full">
        <div className="flex justify-between">
          <div
            className={`w-8 h-8 rounded-md ${bgContainerIcon} grid place-items-center`}
          >
            <i className={`${cardIcon} text-[14px] ${colorIcon} flex`}></i>
          </div>
          {percentage && (
            <p className={`font-bold text-[14px] ${colorPercentage}`}>
              {percentage}
            </p>
          )}
        </div>
        <div className="">
          <p className="text-[14px] font-normal my-4">{titleCard}</p>
          <p className="font-bold text-[20px]">{subTitleCard}</p>
        </div>
      </div>
    </div>
  );
};
