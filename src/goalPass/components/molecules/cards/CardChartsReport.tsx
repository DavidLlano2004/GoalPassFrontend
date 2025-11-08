import React from "react";

interface Props {
  children?: React.ReactNode;
  title: string;
  subTitle: string;
}

export const CardChartsReport = ({ children, title, subTitle }: Props) => {
  return (
    <div className="rounded-[15px] bg-black-2-custom min-h-[400px] flex flex-col xl:col-span-2 col-span-full px-6 py-8">
      <div className="">
        <h1 className="text-[16px] text-white font-bold">{title}</h1>
        <p className="text-white font-extralight text-[14px]">{subTitle}</p>
      </div>
      <div className="mt-4 flex-1">{children}</div>
    </div>
  );
};
