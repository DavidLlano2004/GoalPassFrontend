import { motion } from "framer-motion";
import { Images } from "../../../../assets/images/ImagesProvider";
import type { Match } from "../../../interfaces/getMatches.interfacce";

interface Props {
  actionCard?: () => void;
  match: Match;
}

export const CardMatchSimulation = ({
  actionCard = () => {},
  match,
}: Props) => {
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
  return (
    <motion.div
      onClick={() => actionCard()}
      className="flex-1 active:scale-[0.98] bg-black-2-custom rounded-[15px] min-h-[170px] p-8 cursor-pointer border border-transparent hover:border-green-1-custom transition ease-in duration-200 hover:shadow hover:shadow-green-1-custom"
    >
      <div className="flex sm:flex-row flex-col sm:gap-0 gap-4 justify-between items-center">
        <div className="flex sm:flex-row flex-col items-center gap-4">
          <img className="h-[55px]" src={match?.local?.image_url} alt="" />
          <p className="text-white font-bold text-start">
            {match?.local?.name}
          </p>
        </div>
        <div>
          <p className="text-white font-semibold text-[20px]">VS</p>
        </div>
        <div className="flex sm:flex-row flex-col items-center gap-4">
          <p className="text-white font-bold text-end">
            {match?.visitor?.name}
          </p>
          <img className="h-[55px]" src={match?.visitor?.image_url} alt="" />
        </div>
      </div>
      <div className="w-ful h-px bg-linear-to-r from-blue-1-custom to-green-1-custom my-6"></div>
      <div className=" flex sm:gap-6 gap-4 flex-wrap">
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
