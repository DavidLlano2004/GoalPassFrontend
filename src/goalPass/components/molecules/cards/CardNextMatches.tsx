
interface Props {
  textChip?: string;
}

export const CardNextMatches = ({ textChip = "Excelente" }: Props) => {
  const colorChip = () => {
    switch (textChip) {
      case "Excelente":
        return {
          containerChip:
            "bg-green-1-custom/30 border-green-1-custom shadow-green-1-custom",
          textChip: "text-green-1-custom",
        };
      case "Atención":
        return {
          containerChip:
            "bg-blue-1-custom/30 border-blue-1-custom shadow-blue-1-custom",
          textChip: "text-[#0055FF]",
        };

      default:
        return {
          containerChip:
            "bg-red-1-custom/30 border-red-1-custom shadow-red-1-custom",
          textChip: "text-red-1-custom",
        };
    }
  };

  return (
    <div className="w-full rounded-[10px] border border-white min-h-[66px] h-auto bg-gray-2-custom px-5 sm:py-3 py-6 flex items-center">
      <div className="flex justify-between items-center w-full flex-wrap">

        <div className="flex flex-col gap-2">
          <div>
            <p className="text-[14px] text-white font-bold">
              Once caldas vs America de cali
            </p>
          </div>
          <div className="flex sm:gap-6 gap-2 flex-wrap">
            <span className="flex items-center gap-2">
              <i className="fi fi-tr-calendar-day sm:text-[14px] text-[12px] flex"></i>
              <p className="sm:text-[14px] text-[12px] text-white font-light">
                15 Nov 2025 - 08:00 am
              </p>
            </span>
            <span className="flex items-center gap-2">
              <i className="fi fi-rs-marker sm:text-[14px] text-[12px] flex"></i>
              <p className="sm:text-[14px] text-[12px] text-white font-light">
                Palogrande
              </p>
            </span>
          </div>
        </div>

        <div className="flex sm:gap-6 gap-3 items-center lg:mt-0 mt-4 flex-wrap">
          <div className=" flex flex-col justify-center items-center">
            <h1 className="text-base font-extrabold text-white">85%</h1>
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
                className={`text-[14px]  font-semibold ${colorChip().textChip}`}
              >
                {textChip}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
