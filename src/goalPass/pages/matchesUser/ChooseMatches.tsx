import { motion } from "framer-motion";
import { Images } from "../../../assets/images/ImagesProvider";
import { InputSimple } from "../../../shared/components/molecules/input/InputSimple";
import { SelectSimple } from "../../../shared/components/molecules/select/SelectSimple";
import { useForm } from "react-hook-form";
import { CardInfoMatchUser } from "../../components/molecules/cards/CardInfoMatchUser";
const { ImageBgAuth } = Images;

export const ChooseMatches = () => {
  const { control } = useForm();
  return (
    <div
      style={{
        background: `url(${ImageBgAuth})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover"
      }}
      className="overflow-hidden flex-1 flex flex-col"
    >
      <div className="flex-1 overflow-y-auto sm:px-6 pb-6 sm:pt-16 pt-6 px-4 bg-black/50">
        <motion.div
        className=" w-full max-w-[1123px] m-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[28px] font-extrabold">Próximos partidos</h1>
            <p className="text-[18px] font-light">
              Estadio palogrande - Manizales
            </p>
          </div>
          <div className=" bg-black-2-custom w-full min-h-[100px] h-auto rounded-[15px] p-6 flex gap-4 flex-wrap mt-8">
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
          <div className="mt-4 flex-1 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 auto-rows-auto">
            <CardInfoMatchUser textChip="Pocos cupos" />
            <CardInfoMatchUser textChip="Agotado" />
            <CardInfoMatchUser />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
