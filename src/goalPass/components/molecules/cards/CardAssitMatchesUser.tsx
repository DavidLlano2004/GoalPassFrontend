import React from "react";

export const CardAssitMatchesUser = ({ match }: any) => {
  return (
    <div className="w-full rounded-[15px] bg-gray-2-custom min-h-[116px] p-6 flex items-center justify-between gap-8 sm:gap-4 flex-wrap">
      <div className="sm:flex-row flex-col flex items-center justify-center sm:w-auto w-full gap-6">
        <div className="flex flex-col items-center w-[150px]">
          <img className="h-[60px]" src={match?.local_team?.image_url} alt="" />
          <p>{match?.local_team?.name}</p>
        </div>
        <div className="">
          <h1 className="text-[18px] font-bold">VS</h1>
        </div>
        <div className="flex flex-col items-center">
          <img
            className="h-[60px]"
            src={match?.visitor_team?.image_url}
            alt=""
          />
          <p>{match?.visitor_team?.name}</p>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <h1 className="font-bol text-[18px]">
          {match?.local_team?.name} vs {match?.visitor_team?.name}
        </h1>
        <div className=" flex gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <i className="fi fi-tr-calendar-day flex text-[14px]"></i>
            <p className="text-[14px]">{match?.date_formatted}</p>
          </div>
          <div className="flex items-center gap-2">
            <i className="fi fi-ts-clock-three flex text-[14px]"></i>
            <p className="text-[14px]">{match?.time_formatted}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
