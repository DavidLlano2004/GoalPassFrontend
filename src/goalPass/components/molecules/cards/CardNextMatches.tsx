interface Props {
  match?: MatchData;
}

interface MatchData {
  formatted_date: string;
  match_hour: string;
  match_id: string;
  match_name: string;
  occupancy_level: string;
  occupancy_percentage: number;
  stadium: string;
  tickets_sold: number;
  total_capacity: number;
}

export const CardNextMatches = ({ match }: Props) => {
  const colorChip = () => {
    switch (match?.occupancy_level) {
      case "Alto":
      case "Sin capacidad":
        return {
          containerChip:
            "bg-green-1-custom/30 border-green-1-custom shadow-green-1-custom",
          textChipColor: "text-green-1-custom",
        };
      case "Medio":
        return {
          containerChip:
            "bg-blue-1-custom/30 border-blue-1-custom shadow-blue-1-custom",
          textChipColor: "text-[#0055FF]",
        };

      default:
        return {
          containerChip:
            "bg-red-1-custom/30 border-red-1-custom shadow-red-1-custom",
          textChipColor: "text-red-1-custom",
        };
    }
  };

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
    <div className="w-full rounded-[10px] border border-white min-h-[66px] h-auto bg-gray-2-custom px-5 sm:py-3 py-6 flex items-center">
      <div className="flex justify-between items-center w-full flex-wrap">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-[14px] text-white font-bold">
              {match?.match_name}
            </p>
          </div>
          <div className="flex sm:gap-6 gap-2 flex-wrap">
            <span className="flex items-center gap-2">
              <i className="fi fi-tr-calendar-day sm:text-[14px] text-[12px] flex"></i>
              <p className="sm:text-[14px] text-[12px] text-white font-light">
                {match?.formatted_date} - {formatTo12Hour(match?.match_hour ?? "")}
              </p>
            </span>
            <span className="flex items-center gap-2">
              <i className="fi fi-rs-marker sm:text-[14px] text-[12px] flex"></i>
              <p className="sm:text-[14px] text-[12px] text-white font-light">
                {match?.stadium}
              </p>
            </span>
          </div>
        </div>

        <div className="flex sm:gap-6 gap-3 items-center lg:mt-0 mt-4 flex-wrap">
          <div className=" flex flex-col justify-center items-center">
            <h1 className="text-base font-extrabold text-white">
              {Math.round(match?.occupancy_percentage ?? 0)}%
            </h1>
            <p className="sm:text-[14px] text-white font-extralight text-[12px]">
              Boletas vendidas
            </p>
          </div>
          <div>
            <div
              className={`h-8 w-[100px]  rounded-[20px] border  shadow  grid place-items-center ${
                colorChip().containerChip
              }`}
            >
              <p
                className={`text-[14px]  font-semibold ${colorChip().textChipColor}`}
              >
                {match?.occupancy_level}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
