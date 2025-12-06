import React from "react";

export const CardChartsDashboard = ({ children, title, subtitle }: any) => {
  return (
    <div className="bg-black-2-custom min-h-80 rounded-[15px] lg:flex-1 w-full p-6 flex flex-col">
      <h1 className="text-base font-bold text-white">{title}</h1>
      <p className="text-[15px] font-light text-white mt-1">{subtitle}</p>
      <div className="flex-1">{children}</div>
    </div>
  );
};
