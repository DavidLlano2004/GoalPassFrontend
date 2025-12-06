import React from "react";
import { useFormatNumberWord } from "../../../../shared/hooks/useFormatNumberWord";

interface Props {
  match: MatchDetailsTop;
}

interface MatchDetailsTop {
  match_capacity: number;
  match_id: string;
  match_name: string;
  match_revenue: number;
  occupancy_percentage: number;
  tickets_sold: number;
}

export const CardTopReport = ({ match }: Props) => {
  const { formatCurrency } = useFormatNumberWord();

  return (
    <div className="w-full min-h-20 bg-gray-2-custom rounded-[15px] py-4 px-6 flex justify-between flex-wrap sm:gap-0 gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-extrabold bg-linear-to-r from-green-1-custom to-blue-1-custom bg-clip-text text-transparent text-[18px]">
            #1
          </p>
          <p>{match?.match_name}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-[14px] font-light">
            {match?.tickets_sold} boletas
          </p>
          <p className="text-[14px] font-light">
            {formatCurrency(match?.match_revenue)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 sm:w-auto w-full items-end">
        <p className={`text-[20px] font-bold text-green-1-custom lg:text-end`}>
          {Math.round(match?.occupancy_percentage)}%
        </p>
        <p className="text-[14px] font-light">Ocupación</p>
      </div>
    </div>
  );
};
