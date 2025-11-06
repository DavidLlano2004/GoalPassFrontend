import { InputSimple } from "../../../../shared/components/molecules/input/InputSimple";
import { SelectSimple } from "../../../../shared/components/molecules/select/SelectSimple";
import { CardInfoMatch } from "../../../components/molecules/cards/CardInfoMatch";

interface Props {
  control: any;
}

export const ContainerMatchesAndFilters = ({ control }: Props) => {
  return (
    <div className="mt-6 flex-1 flex flex-col">
      <div className=" bg-black-2-custom w-full min-h-[100px] h-auto rounded-[15px] p-6 flex gap-4 flex-wrap">
        <div className="sm:flex-3 max-w-[643px] w-full">
          <InputSimple
            endContent={
              <div className="flex items-center justify-center h-full">
                <i className="fi fi-rr-search text-[18px] text-gray-3-custom flex" />
              </div>
            }
            control={control}
            nameRegister="name"
            label="Buscar equipo...."
            validations={{ required: "El nombre es requerido" }}
          />
        </div>
        <div className="flex-1 min-w-[214px] w-full">
          <SelectSimple
            control={control}
            nameRegister="rol"
            label="Todos lo estados"
            options={[]}
            validations={{ required: "Seleccione un rol" }}
            labelOption={""}
            uppercase={false}
          />
        </div>
        <div className="flex-1 min-w-[214px] w-full">
          <SelectSimple
            control={control}
            nameRegister="rol"
            label="Todos lo estados"
            options={[]}
            validations={{ required: "Seleccione un rol" }}
            labelOption={""}
            uppercase={false}
          />
        </div>
      </div>
      <div className="mt-4 flex-1 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 sm:auto-rows-[430px] min-auto-rows-[430px]">
        <CardInfoMatch />
        <CardInfoMatch textChip="Programado" />
        <CardInfoMatch textChip="Agotado" />
        <CardInfoMatch />
      </div>
    </div>
  );
};
