import { Button, Tooltip } from "@heroui/react";

interface Props {
  dataTeam?: {
    name?: string;
    city?: string;
    stadium?: string;
    foundation?: string;
    image_url?: string;
  };
  actionDelete: () => void;
  isLoadingButton: boolean;
}

export const CardInfoTeam = ({
  dataTeam,
  actionDelete = () => {},
  isLoadingButton,
}: Props) => {
  return (
    <div className="flex-1 bg-black-2-custom rounded-[15px] min-h-[285px] p-7 border border-transparent hover:border-green-1-custom hover:shadow hover:shadow-green-1-custom transition-all duration-200">
      <div className="flex justify-between">
        <div>
          <div className="h-[85px]">
            <img className="h-full" src={dataTeam?.image_url} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Tooltip
            classNames={{ content: "bg-red-800 text-white" }}
            content="Borrar equipo"
          >
            <Button
              isLoading={isLoadingButton}
              onPress={actionDelete}
              className="max-w-[30px] w-full h-[30px] rounded-lg bg-red-1-custom"
            >
              {!isLoadingButton && (
                <i className="fi fi-rr-trash text-[16px] text-white flex"></i>
              )}
            </Button>
          </Tooltip>
        </div>
      </div>
      <h1 className="mt-5 font-bold text-[20px]">{dataTeam?.name}</h1>
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-light">Ciudad:</p>
          <p className="font-bold">{dataTeam?.city}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-light">Estadio:</p>
          <p className="font-bold text-end w-[80%]">{dataTeam?.stadium}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-light">Fundado:</p>
          <p className="font-bold">Año {dataTeam?.foundation}</p>
        </div>
      </div>
    </div>
  );
};
