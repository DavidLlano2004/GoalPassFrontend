import React from "react";

interface Props {
  titleCard: string;
  iconCard: string;
  subtitleCard?: string;
  wordStand?: string;
  stand?: string;
  soccerStand?: boolean;
}

export const CardReports = ({
  titleCard,
  iconCard,
  subtitleCard,
  wordStand = "",
  soccerStand = false,
  stand = "",
}: Props) => {
  return (
    <div className="rounded-[15px] bg-black-2-custom h-[126px] p-6 flex flex-col gap-4 justify-center xl:col-span-1 lg:col-span-2 col-span-full">
      <div className="flex justify-between items-center">
        <p className="text-[14px]">{titleCard}</p>
        <div className="w-9 h-9 rounded-full bg-green-1-custom grid place-items-center">
          <i className={`${iconCard} text-[18px] flex`}></i>
        </div>
      </div>
      {soccerStand ? (
        <div className="min-h-[30px] flex items-center gap-2">
          <div className="w-[30px] h-[30px] rounded-full bg-yellow-1-custom grid place-items-center">
            <p className="font-bold text-[18px]">{wordStand}</p>
          </div>
          <p className="font-bold text-[20px]">{stand}</p>
        </div>
      ) : (
        <h1 className="font-bold text-[20px]">{subtitleCard}</h1>
      )}
    </div>
  );
};
