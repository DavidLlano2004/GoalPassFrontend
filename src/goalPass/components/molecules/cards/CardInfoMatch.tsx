import { Button, Tooltip } from "@heroui/react";
import { Images } from "../../../../assets/images/ImagesProvider";
import { generatePath, useNavigate } from "react-router";
import { paths } from "../../../../routes/paths";
const { ImageOnceCaldas, ImageNacional } = Images;

interface Props {
  textChip?: string;
}

export const CardInfoMatch = ({ textChip = "En venta" }: Props) => {
  const navigate = useNavigate();
  const navigateInfoMatch = () => {
    const id = 1;
    const path = generatePath(paths.MatchesId, { id });
    navigate(path);
  };

  const colorChip = () => {
    switch (textChip) {
      case "En venta":
        return {
          containerChip:
            "bg-green-1-custom/30 border-green-1-custom shadow-green-1-custom",
          textChip: "text-green-1-custom",
        };
      case "Programado":
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
    <div className="flex-1 sm:h-[430px] min-h-[430px] h-auto bg-black-2-custom rounded-[15px] px-10 py-8 border border-transparent hover:border-green-1-custom hover:shadow hover:shadow-green-1-custom transition-all duration-200 ease-in-out">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 items-center  flex-1">
          <img className="h-[60px]" src={ImageOnceCaldas} alt="" />
          <p className="text-white text-[14px] font-semibold">Once caldas</p>
        </div>
        <div className="">
          <h1 className="text-[20px] font-black">VS</h1>
        </div>
        <div className="flex flex-col gap-1 items-center  flex-1">
          <img className="h-[60px]" src={ImageNacional} alt="" />
          <p className="text-white text-[14px] font-semibold">
            Atletico Nacional
          </p>
        </div>
      </div>

      <div className="flex gap-6 justify-center mt-6 flex-wrap">
        <span className="flex items-center gap-2">
          <i className="fi fi-tr-calendar-day text-[12px] flex"></i>
          <p className="text-[12px] text-white font-light">
            15 Nov 2025 - 08:00 am
          </p>
        </span>
        <span className="flex items-center gap-2">
          <i className="fi fi-rs-marker text-[12px] flex"></i>
          <p className="text-[12px] text-white font-light">Palogrande</p>
        </span>
      </div>
      <div className="flex justify-center items-center py-8">
        <div
          className={`w-[120px] h-[30px] rounded-lg border grid place-items-center ${
            colorChip().containerChip
          }`}
        >
          <p className={`font-normal text-[14px] ${colorChip().textChip}`}>
            {textChip}
          </p>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between items-center">
          <p className="text-[14px] text-white font-extralight">
            Boletas vendidas
          </p>
          <p className="text-[14px] text-white font-bold">800/2000</p>
        </div>
        <div className="w-full bg-[#676767] rounded-lg h-2 my-2">
          <div className="w-[60%] bg-linear-to-r from-blue-1-custom to-green-1-custom rounded-lg h-2"></div>
        </div>
        <p className="text-center text-white font-bold text-[14px]">
          60% vendido
        </p>
      </div>
      <div className=" mt-8 flex sm:flex-row flex-col sm:gap-0 gap-4 justify-between items-center">
        <Tooltip content="Editar">
          <Button className="sm:w-[50px] w-full h-10 rounded-lg border border-white bg-gray-2-custom">
            <i className="fi fi-rr-edit text-[18px] text-white flex"></i>
            <p className=" font-bold text-white sm:hidden flex">Editar</p>
          </Button>
        </Tooltip>
        <Tooltip content="Ver detalles">
          <Button
            onPress={() => navigateInfoMatch()}
            className="sm:w-[50px] w-full h-10 rounded-lg border border-white bg-gray-2-custom"
          >
            <i className="fi fi-rr-eye text-[18px] text-white flex"></i>
            <p className=" font-bold text-white sm:hidden flex">Ver detalles</p>

          </Button>
        </Tooltip>
        <Tooltip content="Cancelar partido">
          <Button className="sm:w-[50px] w-full h-10 rounded-lg bg-red-1-custom">
            <i className="fi fi-rr-ban text-[18px] text-white flex"></i>
            <p className=" font-bold text-white sm:hidden flex">Cancelar partido</p>

          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
