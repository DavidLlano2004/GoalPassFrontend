import { motion } from "framer-motion";
import { CardHistorySmall } from "../components/molecules/cards/CardHistorySmall";
import { InputSimple } from "../../shared/components/molecules/input/InputSimple";
import { SelectSimple } from "../../shared/components/molecules/select/SelectSimple";
import { useForm } from "react-hook-form";
import { Images } from "../../assets/images/ImagesProvider";
import { CardInfoMatchHistory } from "../components/molecules/cards/CardInfoMatchHistory";
import { ComponentEmpty } from "../../shared/components/molecules/empty/ComponentEmpty";

export const HistoryMacthes = () => {
  const { control } = useForm();
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto flex-1 sm:p-6 p-4 flex flex-col"
    >
      <div className="w-full max-w-[1123px] mx-auto flex-1 flex flex-col">
        <div className="">
          <h1 className="text-[20px] text-white font-bold">
            Historial de partidos
          </h1>
          <p className="text-white font-extralight">
            Registro de partidos simulados.
          </p>
        </div>

        {[1].length > 0 ? (
          <>
            <div className="mt-6 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full max-w-[800px] gap-4">
              <CardHistorySmall title="Todos los partidos" subtitle="8" />
              <CardHistorySmall title="Ingresos totales" subtitle="$180M" />
              <CardHistorySmall
                title="Asistencia total"
                subtitle="$121K"
                className="lg:col-span-1 col-span-full"
              />
            </div>

            <div className=" bg-black-2-custom w-full h-auto rounded-[15px] justify-between p-6 flex lg:flex-row flex-col gap-4 flex-wrap mt-4">
              <div className="flex-1">
                <InputSimple
                  endContent={
                    <div className="flex items-center justify-center h-full">
                      <i className="fi fi-rr-search text-[18px] text-gray-3-custom flex" />
                    </div>
                  }
                  control={control}
                  nameRegister="name"
                  label="Buscar partido...."
                  validations={{ required: "El nombre es requerido" }}
                />
              </div>
              <div className="lg:w-[214px] w-full">
                <SelectSimple
                  control={control}
                  nameRegister="rol"
                  label="Estado del partido"
                  options={[]}
                  validations={{ required: "Seleccione un rol" }}
                  labelOption={""}
                  uppercase={false}
                />
              </div>
            </div>

            <div className="flex flex-col mt-4 gap-4">
              <CardInfoMatchHistory stateMatch="Finalizado" />
              <CardInfoMatchHistory stateMatch="Cancelado" />
            </div>
          </>
        ) : (
          <div className="mt-4  flex-1 grid place-items-center">
            <ComponentEmpty textComponentEmpty="Aún no hay historial de partidos" />
          </div>
        )}
      </div>
    </motion.div>
  );
};
