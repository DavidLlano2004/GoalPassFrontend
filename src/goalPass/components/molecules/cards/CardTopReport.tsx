import React from "react";

export const CardTopReport = () => {
  return (
    <div className="w-full min-h-20 bg-gray-2-custom rounded-[15px] py-4 px-6 flex justify-between flex-wrap sm:gap-0 gap-3">

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-extrabold bg-linear-to-r from-green-1-custom to-blue-1-custom bg-clip-text text-transparent text-[18px]">
            #1
          </p>
          <p>Once Caldas vs Atletico Nacional</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-[14px] font-light">8,950 boletas</p>
          <p className="text-[14px] font-light">$10M</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 sm:w-auto w-full items-end">
        <p className={`text-[20px] font-bold text-green-1-custom lg:text-end`}>95%</p>
        <p className="text-[14px] font-light">Ocupación</p>
      </div>
    </div>
  );
};
