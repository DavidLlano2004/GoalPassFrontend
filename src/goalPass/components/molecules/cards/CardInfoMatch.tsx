import { Button } from "@heroui/react";
import { generatePath, useNavigate } from "react-router";
import { paths } from "../../../../routes/paths";
import { useQueryTickets } from "../../../hooks/useQueryTickets.hook";
import { SkeletonTicketsByMatch } from "../../../../shared/components/organims/skeletons/SkeletonTicketsByMatch";
import { useFormatNumber } from "../../../../shared/hooks/useFormatNumber";

interface Props {
  textChip?: string;
  match: any;
}

export const CardInfoMatch = ({ textChip = "En venta", match }: Props) => {
  const { formatNumber } = useFormatNumber();
  const { getTicketsByMatchQuery } = useQueryTickets(match?.id);

  const navigate = useNavigate();

  const formattedBirthday = match?.match_date
    ? new Date(match?.match_date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const formatTo12Hour = (time: string) => {
    if (!time) return "";

    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);

    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    if (hour === 0) hour = 12;

    const hourFormatted = String(hour).padStart(2, "0");

    return `${hourFormatted}:${minute} ${ampm}`;
  };

  const navigateInfoMatch = () => {
    const id = match?.id;
    const path = generatePath(paths.MatchesId, { id });
    navigate(path);
  };

  const colorChip = () => {
    switch (textChip) {
      case "en_venta":
        return {
          containerChip:
            "bg-green-1-custom/30 border-green-1-custom shadow-green-1-custom",
          textChipColor: "text-green-1-custom",
          textChipFunction: "En venta",
        };
      case "programado":
        return {
          containerChip:
            "bg-blue-1-custom/30 border-blue-1-custom shadow-blue-1-custom",
          textChipColor: "text-[#0055FF]",
          textChipFunction: "Programado",
        };

      default:
        return {
          containerChip:
            "bg-red-1-custom/30 border-red-1-custom shadow-red-1-custom",
          textChipColor: "text-red-1-custom",
          textChipFunction:
            match?.state === "cancelado" ? "Cancelado" : "Agotado",
        };
    }
  };
  return (
    <div className="flex-1 bg-black-2-custom rounded-[15px] px-10 py-8 border max-h-[490px] border-transparent hover:border-green-1-custom hover:shadow hover:shadow-green-1-custom transition-all duration-200 ease-in-out flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1 items-center  flex-1">
            <img className="h-[60px]" src={match?.local?.image_url} alt="" />
            <p className="text-white text-[14px] font-semibold   min-h-11 text-center">
              {match?.local?.name}
            </p>
          </div>
          <div className="">
            <h1 className="text-[20px] font-black">VS</h1>
          </div>
          <div className="flex flex-col gap-1 items-center  flex-1">
            <img className="h-[60px]" src={match?.visitor?.image_url} alt="" />
            <p className="text-white text-[14px] font-semibold  text-center min-h-11">
              {match?.visitor?.name}
            </p>
          </div>
        </div>

        <div className="flex gap-6 justify-center mt-6 flex-wrap">
          <span className="flex items-center gap-2">
            <i className="fi fi-tr-calendar-day text-[12px] flex"></i>
            <p className="text-[12px] text-white font-light">
              {formattedBirthday} - {formatTo12Hour(match?.match_hour)}
            </p>
          </span>
          <span className="flex items-center gap-2">
            <i className="fi fi-rs-marker text-[12px] flex"></i>
            <p className="text-[12px] text-white font-light">
              {match?.stadium}
            </p>
          </span>
        </div>
        <div className="flex justify-center items-center py-8">
          <div
            className={`w-[120px] h-[30px] rounded-lg border grid place-items-center ${
              colorChip().containerChip
            }`}
          >
            <p
              className={`font-normal text-[14px] ${colorChip().textChipColor}`}
            >
              {colorChip().textChipFunction}
            </p>
          </div>
        </div>

        {getTicketsByMatchQuery.isLoading ? (
          <SkeletonTicketsByMatch />
        ) : (
          <div className="">
            <div className="flex justify-between items-center">
              <p className="text-[14px] text-white font-extralight">
                Boletas vendidas
              </p>
              <p className="text-[14px] text-white font-bold">
                {formatNumber(
                  getTicketsByMatchQuery?.data?.response?.tickets_sold ?? 0
                )}{" "}
                /{" "}
                {formatNumber(
                  getTicketsByMatchQuery?.data?.response?.total_capacity ?? 0
                )}
              </p>
            </div>

            <div className="w-full bg-[#676767] rounded-lg h-2 my-2">
              <div
                style={{
                  width: `${getTicketsByMatchQuery?.data?.response?.occupancy_percentage ?? 0}%`,
                }}
                className={` bg-linear-to-r from-blue-1-custom to-green-1-custom rounded-lg h-2`}
              ></div>
            </div>

            <p className=" text-white font-bold text-[14px] text-center">
              {getTicketsByMatchQuery?.data?.response?.occupancy_percentage ??
                0}{" "}
              % vendido
            </p>
          </div>
        )}
      </div>
      <div className=" mt-8 grid grid-cols-1">
        <Button
          isDisabled={getTicketsByMatchQuery.isLoading}
          onPress={() => navigateInfoMatch()}
          className="w-full h-10 rounded-lg border border-white bg-gray-2-custom"
        >
          <i className="fi fi-rr-eye text-[18px] text-white flex"></i>
          <p className=" font-bold text-white ">Ver detalles</p>
        </Button>
      </div>
    </div>
  );
};
