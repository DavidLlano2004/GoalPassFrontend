import React from "react";

interface Props {
  title: string;
  subtitle: string;
  iconCard: string;
}

export const CardStadisticsProfile = ({ title, subtitle, iconCard }: Props) => {
  return (
    <div className="w-full min-h-[66px] bg-gray-2-custom rounded-[15px] flex items-center gap-3 p-4">
      <span>
        <i
          className={`${iconCard} text-transparent bg-clip-text bg-linear-to-r from-blue-1-custom to-green-1-custom text-[34px] flex`}
        ></i>
      </span>
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-[14px] font-light">{subtitle}</p>
      </div>
    </div>
  );
};
