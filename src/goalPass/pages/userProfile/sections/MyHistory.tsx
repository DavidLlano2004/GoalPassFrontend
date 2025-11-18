import { Images } from "../../../../assets/images/ImagesProvider";

const { ImageNacional, ImageOnceCaldas } = Images;

export const MyHistory = () => {
  return (
    <div className="flex-1 max-h-full overflow-hidden flex flex-col">
      <h1 className="font-bold text-[18px] mt-2">Partidos asistidos</h1>
      <div className=" max-h-full overflow-y-auto flex-1 flex flex-col gap-6 mt-6 pr-4">
        <div className="w-full rounded-[15px] bg-gray-2-custom min-h-[116px] p-6 flex items-center justify-between gap-8 sm:gap-4 flex-wrap">
          <div className="sm:flex-row flex-col flex items-center justify-center sm:w-auto w-full gap-6">
            <div className="flex flex-col items-center">
              <img className="h-[60px]" src={ImageOnceCaldas} alt="" />
              <p>Once Caldas</p>
            </div>
            <div className="">
              <h1 className="text-[18px] font-bold">VS</h1>
            </div>
            <div className="flex flex-col items-center">
              <img className="h-[60px]" src={ImageNacional} alt="" />
              <p>Atlético Nacional</p>

            </div>
          </div>
          <div className="flex flex-col items-start">
            <h1 className="font-bol text-[18px]">
              Once Caldas vs Atlético Nacional
            </h1>
            <div className=" flex gap-4 flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <i className="fi fi-tr-calendar-day flex text-[14px]"></i>
                <p className="text-[14px]">15 Nov 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fi fi-rr-marker flex text-[14px]"></i>
                <p className="text-[14px]">Occidental</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full justify-end">
            <p className="font-bold text-[20px]">2 - 1</p>
            <div className="rounded-[10px] bg-green-1-custom p-2 min-w-20 grid place-items-center">
              <p className=" font-bold text-xs">Asistido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
