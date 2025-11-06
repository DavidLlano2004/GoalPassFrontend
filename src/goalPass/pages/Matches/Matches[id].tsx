import { useNavigate } from "react-router";
import { Images } from "../../../assets/images/ImagesProvider";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { CardSoccerStands } from "../../components/molecules/cards/CardSoccerStands";
const { ImageOnceCaldas, ImageNacional } = Images;

export const InfoOneMatch = () => {
  const navigate = useNavigate();
  let textChip = "En venta";
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
    <div className="overflow-y-auto flex-1 p-6 flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center w-[170px] gap-3 cursor-pointer"
      >
        <i className="fi fi-rr-arrow-small-left text-[25px] flex"></i>
        <p className="font-extrabold">Volver a partidos</p>
      </button>

      <div className=" bg-black-2-custom w-full h-auto relative rounded-[15px] mt-6 flex justify-between items-center py-6 px-10">
        <div className="w-full flex lg:flex-row flex-col justify-between">
          <div className="flex sm:flex-row flex-col items-center gap-10 flex-1">
            <div className="flex sm:hidden gap-3 justify-center mt-6 flex-wrap">
              <span className="flex items-center gap-2">
                <i className="fi fi-tr-calendar-day text-[14px] flex"></i>
                <p className="text-[14px] text-white font-light">
                  15 Nov 2025 - 08:00 am
                </p>
              </span>
              <span className="flex items-center gap-2">
                <i className="fi fi-rs-marker text-[14px] flex"></i>
                <p className="text-[14px] text-white font-light">Palogrande</p>
              </span>
            </div>
            <div className="flex flex-col items-center gap-2  flex-1">
              <img className="h-[85px]" src={ImageOnceCaldas} alt="" />
              <p className="font-extrabold text-white text-[16px] text-center  min-h-[50px]">
                Once Caldas
              </p>
            </div>
            <div className=" flex flex-col items-center flex-[1.2]">
              <p className=" font-extrabold text-[20px]">VS</p>
              <div className="sm:flex flex-col hidden gap-1 justify-center mt-6 flex-wrap">
                <span className="flex items-center gap-2">
                  <i className="fi fi-tr-calendar-day text-[12px] flex"></i>
                  <p className="text-[12px] text-white font-light">
                    15 Nov 2025 - 08:00 am
                  </p>
                </span>
                <span className="flex items-center gap-2">
                  <i className="fi fi-rs-marker text-[12px] flex"></i>
                  <p className="text-[12px] text-white font-light">
                    Palogrande
                  </p>
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2  flex-1">
              <img className="h-[85px]" src={ImageNacional} alt="" />
              <p className="font-extrabold text-white text-[16px] text-center  min-h-[50px]">
                Atletico Nacional
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between lg:items-end items-center flex-1 lg:mt-0 mt-6 lg:gap-0 gap-3">
            <div
              className={`w-[120px] h-[30px] rounded-lg border grid place-items-center ${
                colorChip().containerChip
              }`}
            >
              <p className={`font-normal text-[14px] ${colorChip().textChip}`}>
                {textChip}
              </p>
            </div>
            <div className=" flex flex-col">
              <p className="text-white font-extrabold lg:text-end text-center">
                1200/2000
              </p>
              <p className="text-white font-extralight text-end">
                Boletas vendidas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex lg:flex-row flex-col gap-4 mt-4 ">
        <div className=" bg-black-2-custom flex-[1.35] h-auto rounded-[15px] p-8 lg:order-1 order-2">
          <div className="flex items-center gap-3">
            <i className="fi fi-tr-court-sport text-[30px] text-white flex"></i>
            <h1 className="text-[20px] text-white font-bold">
              Mapa del estadio
            </h1>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <CardSoccerStands />
            <CardSoccerStands
              nameSoccerStand="Oriental"
              textChip="Disponibles"
            />
            <CardSoccerStands
              nameSoccerStand="Norte"
              textChip="Pocas disponibles"
            />
            <CardSoccerStands
              nameSoccerStand="Sur"
              textChip="Sin disponibilidad"
            />
            <div
              className="w-full sm:h-[100px] min-h-[100px] rounded-[15px] p-px"
              style={{
                background: "linear-gradient(to left, #00C853, #0038A8)",
              }}
            >
              <div className="w-full h-full rounded-[13px] bg-gray-2-custom flex sm:justify-between justify-center sm:gap-0 gap-4 items-center px-10 sm:py-0 py-10 flex-wrap">
                <div className="flex flex-col items-center">
                  <p className="text-[14px] font-light text-white">
                    Total vendidas
                  </p>
                  <h1 className="text-[20px] font-bold">11,800</h1>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-[14px] font-light text-white">
                    Ocupación
                  </p>
                  <h1 className="text-[20px] font-bold">72.5%</h1>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-[14px] font-light text-white">
                    Ingresos totales
                  </p>
                  <h1 className="text-[20px] font-bold">$526M</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 lg:order-2 order-1">
          <div className="bg-black-2-custom rounded-[15px] h-[340px] sm:order-1 order-2"></div>
          <div className="bg-black-2-custom rounded-[15px] min-h-[295px] p-8 sm:order-2 order-1">
            <h1 className="text-white font-bold text-[20px]">Acciones</h1>
            <div className="mt-6 flex flex-col gap-6">
              <ButtonSimple
                startContent={
                  <i className="fi fi-rr-edit text-[20px] text-white flex"></i>
                }
                textButton="Editar partido"
                widthButton="min-w-[190px] w-full"
                heightButton="h-[45px]"
              />
              <ButtonSimple
                startContent={
                  <i className="fi fi-ts-arrow-trend-up text-[20px] text-white flex"></i>
                }
                borderGradient
                textButton="Ver ventas detalladas"
                widthButton="min-w-[190px] w-full"
                heightButton="h-[45px]"
                bgColorButton="bg-gray-2-custom"
              />
              <ButtonSimple
                startContent={
                  <i className="fi fi-rr-ban text-[20px] text-white flex"></i>
                }
                bgColorButton="bg-red-1-custom/30 border-red-1-custom border"
                textButton="Cancelar partido"
                widthButton="min-w-[190px] w-full"
                heightButton="h-[45px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
