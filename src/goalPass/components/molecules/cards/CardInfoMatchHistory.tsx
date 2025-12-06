import { generatePath, useNavigate } from "react-router";
import { useFormatNumber } from "../../../../shared/hooks/useFormatNumber";
import type { Match } from "../../../interfaces/getHistoryMatches.interface";
import { paths } from "../../../../routes/paths";
import { motion } from "framer-motion";

interface Props {
  match: Match;
}

export const CardInfoMatchHistory = ({ match }: Props) => {
  const { formatNumber } = useFormatNumber();
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
    const path = generatePath(paths.HistoryPageSimulation, { id });
    navigate(path);
  };

  return (
    <motion.div
      onClick={navigateInfoMatch}
      className={`bg-black-2-custom rounded-[15px] w-full min-h-[254px] py-6 px-10 flex flex-col justify-center border border-transparent ${match?.state != "cancelado" && "hover:border-green-1-custom cursor-pointer"} transition-all ease-in duration-150 active:scale-[0.99]`}
    >
      <div
        className={`w-[100px] h-[30px] rounded-[18px] border shadow ${
          match?.state === "finalizado"
            ? "shadow-gray-1-custom border-gray-1-custom bg-gray-1-custom/30 text-gray-1-custom"
            : "shadow-red-1-custom border-red-1-custom bg-red-1-custom/30 text-red-1-custom"
        } grid place-items-center`}
      >
        <p className="font-bold text-[12px] capitalize">{match?.state}</p>
      </div>

      <div className=" mt-8 xl:flex-row flex-col flex items-center justify-between">
        <div className="lg:flex-row flex-col flex items-center lg:gap-16 gap-8">
          <div className="lg:flex-row flex-col flex items-center gap-4">
            <span>
              <img className="h-[65px]" src={match?.local?.image_url} alt="" />
            </span>
            <p className="font-bold">{match?.local?.name}</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[32px] font-extrabold">
              {match?.state === "cancelado"
                ? "-"
                : `${match?.result?.local_goals} - ${match?.result?.visitor_goals}`}
            </p>
            <p className="text-[14px] font-light">Resultado final</p>
          </div>

          <div className="lg:flex-row flex-col flex items-center gap-4">
            <p className="font-bold">{match?.visitor?.name}</p>
            <span>
              <img
                className="h-[65px]"
                src={match?.visitor?.image_url}
                alt=""
              />
            </span>
          </div>
        </div>

        <div className="flex xl:w-auto w-full my-8">
          <div className="xl:h-[65px] h-0.5 xl:w-0.5 w-full xl:bg-linear-to-b bg-linear-to-l from-blue-1-custom to-green-1-custom"></div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col gap-1 items-center">
            <p className="font-light text-[14px]">Boletas</p>
            <p className="font-bold">
              {formatNumber(match?.total_tickets_sold)}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <p className="font-light text-[14px]">Ingresos</p>
            <p className="font-bold text-green-1-custom">
              $ {formatNumber(match?.total_revenue)}
            </p>
          </div>
        </div>
      </div>

      <div className=" flex sm:gap-10 gap-4 flex-wrap mt-10">
        <div className="flex items-center gap-2">
          <i className="fi fi-tr-calendar-day flex text-[14px]"></i>
          <p className="text-[14px]">{formattedBirthday}</p>
        </div>
        <div className="flex items-center gap-2">
          <i className="fi fi-tr-clock-five flex text-[14px]"></i>
          <p className="text-[14px]">{formatTo12Hour(match?.match_hour)}</p>
        </div>
        <div className="flex items-center gap-2">
          <i className="fi fi-rr-marker flex text-[14px]"></i>
          <p className="text-[14px]">{match?.stadium}</p>
        </div>
      </div>
    </motion.div>
  );
};
