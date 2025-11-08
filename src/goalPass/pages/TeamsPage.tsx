import { InputSimple } from "../../shared/components/molecules/input/InputSimple";
import { useForm } from "react-hook-form";
import { ButtonSimple } from "../../shared/components/molecules/buttons/ButtonSimple";
import { CardInfoTeam } from "../components/molecules/cards/CardInfoTeam";
import { useApiTeams } from "../../apiTeams/useApiTeams";
import { ModalCustom } from "../../shared/components/organims/modals/ModalCustom";
import { useDisclosure } from "@heroui/react";
import { SelectSimple } from "../../shared/components/molecules/select/SelectSimple";
import { SkeletonTeams } from "../../shared/components/organims/skeletons/SkeletonTeams";
import { motion } from "framer-motion";
import { ComponentEmpty } from "../../shared/components/molecules/empty/ComponentEmpty";

export const TeamsPage = () => {
  const { getTeamsByApiQuery } = useApiTeams();

  const {
    isOpen: isOpenModalCreateTeam,
    onOpen: onOpenModalCreateTeam,
    onClose: onCloseModalCreateTeam,
  } = useDisclosure();

  const { control } = useForm();

  if (getTeamsByApiQuery.isLoading) {
    return <SkeletonTeams />;
  }

  console.log(getTeamsByApiQuery.data);

  const dataSelectTeams =
    getTeamsByApiQuery.data?.map((team: any) => ({
      key: team?.strTeam,
      label: team?.strTeam,
      iconSelect: team?.strBadge,
    })) ?? [];

  console.log(dataSelectTeams);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto flex-1 sm:p-6 p-4 flex flex-col"
    >
      <div className="flex items-center justify-between sm:flex-nowrap flex-wrap">
        <div className="">
          <h1 className="text-[20px] text-white font-bold">
            Configuración de equipos
          </h1>
          <p className="text-white font-extralight">
            Gestiona los equipos del sistema
          </p>
        </div>
        <div className="sm:mt-0 mt-6 sm:w-auto w-full">
          <ButtonSimple
            startContent={
              <i className="fi fi-rr-plus-small text-[20px] text-white flex"></i>
            }
            actionButton={() => onOpenModalCreateTeam()}
            textButton="Crear equipo"
            widthButton="min-w-[190px] w-full"
          />
        </div>
      </div>

      {[].length > 0 ? (
        <>
          <div className=" bg-black-2-custom w-full min-h-[100px] h-auto rounded-[15px] p-6 flex gap-4 flex-wrap mt-6">
            <div className="w-full">
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
          </div>
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 flex-wrap mt-4">
            {getTeamsByApiQuery.data?.map((dataTeam: any) => (
              <CardInfoTeam key={dataTeam?.strTeam} dataTeam={dataTeam} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-4  flex-1 grid place-items-center">
          <ComponentEmpty textComponentEmpty="No hay equipos creados" />
        </div>
      )}

      <ModalCustom
        // onSubmitModal={handleCreateMatch(onSubmitCreateMatch)}
        isOpen={isOpenModalCreateTeam}
        onClose={onCloseModalCreateTeam}
        textButton="Crear"
        titleModal={"Crear equipo"}
      >
        <SelectSimple
          iconItem
          control={control}
          nameRegister="rol"
          label="Equipos disponibles"
          options={dataSelectTeams}
          validations={{ required: "Seleccione un rol" }}
          labelOption={""}
          uppercase={false}
        />
      </ModalCustom>
    </motion.div>
  );
};
