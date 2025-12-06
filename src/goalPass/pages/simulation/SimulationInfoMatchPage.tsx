import { motion } from "framer-motion";
import { Images } from "../../../assets/images/ImagesProvider";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";

interface Props {
  changeMatch?: () => void;
  simulateFunction?: () => void;
  dataMatch: any;
  isLoadingButton: boolean;
}

export const SimulationInfoMatchPage = ({
  changeMatch = () => {},
  simulateFunction = () => {},
  dataMatch,
  isLoadingButton,
}: Props) => {
  const formattedBirthday = dataMatch?.match_date
    ? new Date(dataMatch?.match_date).toLocaleDateString("es-ES", {
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
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4"
    >
      <div className="w-full bg-black-2-custom min-h-[400px] rounded-[15px] p-8">
        <div className=" max-w-[350px] w-full h-[42px] rounded-[15px] bg-blue-1-custom/30 m-auto flex items-center justify-center px-5 gap-3">
          <div className="flex items-center gap-2 justify-center">
            <i className="fi fi-tr-calendar-day flex text-[14px]"></i>
            <p className="text-[14px]">
              {formattedBirthday} - {formatTo12Hour(dataMatch?.match_hour)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-center">
          <div className="flex flex-col justify-center items-center flex-1 ">
            <div className=" flex flex-col items-center gap-3">
              <span>
                <img
                  className="sm:h-[100px] h-20"
                  src={dataMatch?.local?.image_url}
                  alt=""
                />
              </span>
              <p className="text-white font-bold text-[20px]">
                {dataMatch?.local?.name}
              </p>
            </div>
          </div>

          <div className="">
            <h1 className="text-[40px] font-bold bg-linear-to-r from-green-1-custom to-blue-1-custom bg-clip-text text-transparent">
              VS
            </h1>
          </div>

          <div className="flex flex-col justify-center items-center flex-1 ">
            <div className=" flex flex-col items-center gap-3">
              <span>
                <img
                  className="sm:h-[100px] h-20"
                  src={dataMatch?.visitor?.image_url}
                  alt=""
                />
              </span>
              <p className="text-white font-bold text-[20px]">
                {dataMatch?.visitor?.name}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4 flex-wrap">
            <ButtonSimple
              actionButton={() => changeMatch()}
              borderGradient
              textButton="Cambiar partido"
              widthButton="sm:w-[172px] w-full"
              heightButton="h-[50px]"
              bgColorButton="bg-gray-2-custom"
              isDisabled={isLoadingButton}
            />
            <ButtonSimple
              actionButton={() => simulateFunction()}
              startContent={
                <i className="fi fi-rr-football text-[20px] text-white flex"></i>
              }
              textButton="Simular partido"
              widthButton="sm:w-[193px] w-full"
              heightButton="h-[50px]"
              isLoading={isLoadingButton}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
