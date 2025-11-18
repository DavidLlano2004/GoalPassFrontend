import { Button, Tooltip } from "@heroui/react";

interface Props {
  dataTeam?: {
    strTeam?: string;
    strLocation?: string;
    strStadium?: string;
    intFormedYear?: string;
    strBadge?: string;
  };
}

export const CardInfoTeam = ({ dataTeam }: Props) => {
  return (
    <div className="flex-1 bg-black-2-custom rounded-[15px] min-h-[285px] p-7 border border-transparent hover:border-green-1-custom hover:shadow hover:shadow-green-1-custom transition-all duration-200">
      <div className="flex justify-between">
        <div>
          <div className="h-[85px]">
            <img className="h-full" src={dataTeam?.strBadge} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {/* <Tooltip content="Editar">
            <Button className="max-w-[30px] w-full h-[30px] rounded-lg border border-white bg-gray-2-custom">
              <i className="fi fi-rr-edit text-[16px] text-white flex"></i>
            </Button>
          </Tooltip> */}
          <Tooltip classNames={{ content:"bg-red-800 text-white"}} content="Borrar equipo">
            <Button className="max-w-[30px] w-full h-[30px] rounded-lg bg-red-1-custom">
              <i className="fi fi-rr-trash text-[16px] text-white flex"></i>
            </Button>
          </Tooltip>
        </div>
      </div>
      <h1 className="mt-5 font-bold text-[20px]">{dataTeam?.strTeam}</h1>
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-light">Ciudad:</p>
          <p className="font-bold">{dataTeam?.strLocation}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-light">Estadio:</p>
          <p className="font-bold text-end w-[80%]">{dataTeam?.strStadium}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-light">Fundado:</p>
          <p className="font-bold">Año {dataTeam?.intFormedYear}</p>
        </div>
      </div>
    </div>
  );
};
