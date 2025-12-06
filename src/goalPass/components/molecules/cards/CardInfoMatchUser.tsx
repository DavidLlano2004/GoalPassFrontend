import { generatePath, useNavigate } from "react-router";
import { paths } from "../../../../routes/paths";
import { ButtonSimple } from "../../../../shared/components/molecules/buttons/ButtonSimple";
import { useQueryTickets } from "../../../hooks/useQueryTickets.hook";
import { SkeletonTicketsByMatchUser } from "../../../../shared/components/organims/skeletons/SkeletonTicketsByMatchUser";
import { useFormatNumber } from "../../../../shared/hooks/useFormatNumber";

interface Props {
  match: ResponseMatch;
}

export interface ResponseMatch {
  id: string;
  id_team_local: string;
  id_team_visitor: string;
  match_date: Date;
  match_hour: string;
  state: string;
  stadium: string;
  created_at: Date;
  updated_at: null;
  local: Local;
  visitor: Local;
}

export interface Local {
  id: string;
  name: string;
  city: string;
  stadium: string;
  image_url: string;
  foundation: string;
  created_at: Date;
}

export const CardInfoMatchUser = ({ match }: Props) => {
  const { formatNumber } = useFormatNumber();
  const { getTicketsByMatchQuery } = useQueryTickets(match?.id);

  const navigate = useNavigate();

  const navigateInfoMatch = () => {
    const id = match?.id;
    const path = generatePath(paths.MatchByIdUser, { id });
    navigate(path);
  };

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

  const colorChip = () => {
    switch (getTicketsByMatchQuery.data?.response.status) {
      case "Disponibles":
        return {
          containerChip:
            "bg-green-1-custom/30 border-green-1-custom shadow-green-1-custom",
          textChipColor: "text-green-1-custom",
        };
      case "Pocos cupos":
        return {
          containerChip:
            "bg-yellow-1-custom/30 border-yellow-1-custom shadow-yellow-1-custom",
          textChipColor: "text-[#FFD600]",
        };

      default:
        return {
          containerChip:
            "bg-red-1-custom/30 border-red-1-custom shadow-red-1-custom",
          textChipColor: "text-red-1-custom",
        };
    }
  };

  return (
    <div className="flex-1 h-auto bg-black-2-custom rounded-[15px] px-10 py-8 border border-transparent hover:border-green-1-custom hover:shadow hover:shadow-green-1-custom transition-all duration-200 ease-in-out">
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
          <p className="text-[12px] text-white font-light">{match?.stadium}</p>
        </span>
      </div>
      {getTicketsByMatchQuery.isLoading ? (
        <SkeletonTicketsByMatchUser />
      ) : (
        <>
          <div className=" mt-8">
            <div className="flex justify-between items-center">
              <p className="text-[14px] text-white font-extralight">
                Disponibilidad
              </p>
              <p className="text-[14px] text-white font-bold">
                {Math.round(
                  getTicketsByMatchQuery.data?.response.available_percentage ??
                    0
                )}
                %
              </p>
            </div>
            <div className="w-full bg-[#676767] rounded-lg h-2 my-2">
              <div
                style={{
                  width:
                    getTicketsByMatchQuery.data?.response.available_percentage +
                    "%",
                }}
                className=" bg-linear-to-r from-blue-1-custom to-green-1-custom rounded-lg h-2"
              ></div>
            </div>
          </div>

          <div className="flex justify-center items-center py-5">
            <div
              className={`w-[120px] h-[30px] rounded-lg border shadow grid place-items-center ${
                colorChip().containerChip
              }`}
            >
              <p
                className={`font-normal text-[14px] ${colorChip().textChipColor}`}
              >
                {getTicketsByMatchQuery.data?.response.status}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-4">
            <p className="text-[14px] font-light">Desde</p>
            <p className=" font-extrabold sm:text-[26px] text-[24px]">
              $
              {formatNumber(
                getTicketsByMatchQuery?.data?.response?.lowest_price ?? 0
              )}
            </p>
          </div>
        </>
      )}

      <div className={`mt-6`}>
        <ButtonSimple
          isDisabled={getTicketsByMatchQuery.isLoading}
          actionButton={() => navigateInfoMatch()}
          startContent={
            <i className="fi fi-tr-cart-shopping-fast text-[20px] text-white flex"></i>
          }
          textButton="Comprar boletas"
          widthButton="w-full"
          heightButton="h-[50px]"
        />
      </div>
    </div>
  );
};
