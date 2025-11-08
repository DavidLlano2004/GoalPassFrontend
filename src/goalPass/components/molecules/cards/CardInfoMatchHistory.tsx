import { Images } from "../../../../assets/images/ImagesProvider";

const { ImageOnceCaldas, ImageNacional } = Images;

interface Props {
  stateMatch: string;
}

export const CardInfoMatchHistory = ({ stateMatch }: Props) => {
  return (
    <div className="bg-black-2-custom rounded-[15px] w-full min-h-[254px] py-6 px-10 flex flex-col justify-center">
      <div
        className={`w-[100px] h-[30px] rounded-[18px] border shadow ${
          stateMatch === "Finalizado"
            ? "shadow-gray-1-custom border-gray-1-custom bg-gray-1-custom/30 text-gray-1-custom"
            : "shadow-red-1-custom border-red-1-custom bg-red-1-custom/30 text-red-1-custom"
        } grid place-items-center`}
      >
        <p className="font-bold text-[12px]">{stateMatch}</p>
      </div>

      <div className=" mt-8 xl:flex-row flex-col flex items-center justify-between">
        <div className="lg:flex-row flex-col flex items-center lg:gap-16 gap-8">
          <div className="lg:flex-row flex-col flex items-center gap-4">
            <span>
              <img className="h-[65px]" src={ImageOnceCaldas} alt="" />
            </span>
            <p className="font-bold">Once Caldas</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[32px] font-extrabold">2 - 1</p>
            <p className="text-[14px] font-light">Resultado final</p>
          </div>

          <div className="lg:flex-row flex-col flex items-center gap-4">
            <p className="font-bold">Atletico Nacional</p>
            <span>
              <img className="h-[65px]" src={ImageNacional} alt="" />
            </span>
          </div>
        </div>

        <div className="flex xl:w-auto w-full my-8">
          <div className="xl:h-[65px] h-0.5 xl:w-0.5 w-full xl:bg-linear-to-b bg-linear-to-l from-blue-1-custom to-green-1-custom"></div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col gap-1 items-center">
            <p className="font-light text-[14px]">Asistencia</p>
            <p className="font-bold">28,500</p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <p className="font-light text-[14px]">Boletas</p>
            <p className="font-bold">28,500</p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <p className="font-light text-[14px]">Ingresos</p>
            <p className="font-bold text-green-1-custom">$427M</p>
          </div>
        </div>
      </div>

      <div className=" flex sm:gap-10 gap-4 flex-wrap mt-10">
        <div className="flex items-center gap-2">
          <i className="fi fi-tr-calendar-day flex text-[14px]"></i>
          <p className="text-[14px]">15 Nov 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <i className="fi fi-tr-clock-five flex text-[14px]"></i>
          <p className="text-[14px]">08:00 am</p>
        </div>
        <div className="flex items-center gap-2">
          <i className="fi fi-rr-marker flex text-[14px]"></i>
          <p className="text-[14px]">Estadio Palogrande</p>
        </div>
      </div>
    </div>
  );
};
