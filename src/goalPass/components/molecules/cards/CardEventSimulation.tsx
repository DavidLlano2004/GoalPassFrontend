import React from "react";

export const CardEventSimulation = () => {
  return (
    <div className="w-full rounded-[15px] bg-gray-2-custom h-auto p-4 flex items-center gap-5 flex-wrap">
      <div className="w-11 h-11 bg-gray-3-custom rounded-full grid place-items-center">
        <p className="font-bold">31'</p>
      </div>
      <div>
        <div className="flex gap-2 items-center">
          <div className="w-3.5 h-[18px] rounded-xs bg-red-1-custom"></div>

          <p className=" font-bold">Torres</p>
        </div>
        <p className="text-[14px] font-light">
          Atletico nacional - Tarjeta roja
        </p>
      </div>
    </div>
  );
};
