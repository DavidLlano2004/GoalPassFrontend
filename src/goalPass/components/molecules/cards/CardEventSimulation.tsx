import React from "react";

export const CardEventSimulation = ({ eventInfo }: any) => {
  return (
    <div className="w-full rounded-[15px] bg-gray-2-custom h-auto p-4 flex items-center justify-between gap-5 flex-wrap">
      <div className="flex gap-5 items-center">
        <div className="w-11 h-11 bg-gray-3-custom rounded-full grid place-items-center">
          <p className="font-bold">{eventInfo?.minute}'</p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            {eventInfo?.type === "Gol" ? (
              <i className="fi fi-rr-football flex"></i>
            ) : (
              <div
                className={`w-3.5 h-[18px] rounded-xs ${eventInfo?.type === "Tarjeta amarilla" ? "bg-yellow-1-custom" : "bg-red-1-custom"}`}
              ></div>
            )}

            <p className=" font-bold">{eventInfo?.player}</p>
          </div>
          <p className="text-[14px] font-light">
            {eventInfo?.team?.name} - {eventInfo?.type}
          </p>
        </div>
      </div>
      <img className="w-10" src={eventInfo?.team?.image_url} alt="" />
    </div>
  );
};
