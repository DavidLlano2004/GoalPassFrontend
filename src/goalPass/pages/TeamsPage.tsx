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
import { useMutationTeams } from "../hooks";
import { useQueryTeams } from "../hooks/useQueryTeams.hook";
import { useMemo, useState } from "react";

export const TeamsPage = () => {
  const { getTeamsByApiQuery } = useApiTeams();
  const { createTeamMutation, deleteTeamMutation } = useMutationTeams();
  const { getTeamsQuery } = useQueryTeams();

  const dataSelectTeams = useMemo(() => {
    // Obtener los nombres de los equipos que ya existen
    const existingTeamNames = new Set(
      getTeamsQuery?.data?.teams?.map((team: any) => team?.name) ?? []
    );

    // Filtrar solo los equipos que NO están en existingTeamNames
    return (
      getTeamsByApiQuery.data
        ?.filter((team: any) => !existingTeamNames.has(team?.strTeam))
        .map((team: any) => ({
          key: team?.strTeam,
          label: team?.strTeam,
          iconSelect: team?.strBadge,
        })) ?? []
    );
  }, [getTeamsByApiQuery.data, getTeamsQuery?.data?.teams]);

  const [loadingSpaces, setLoadingSpaces] = useState(new Set());

  const {
    isOpen: isOpenModalCreateTeam,
    onOpen: onOpenModalCreateTeam,
    onClose: onCloseModalCreateTeam,
  } = useDisclosure();

  const {
    control: controlCreateTeam,
    watch: watchCreateTeam,
    handleSubmit: handleSubmitCreateTeam,
    clearErrors: clearErrorsCreateTeam,
    reset: resetCreateTeam,
  } = useForm();

  const teamSelected = watchCreateTeam("team");

  const loadingTeams = getTeamsByApiQuery.isLoading || getTeamsQuery.isLoading;

  if (loadingTeams) {
    return <SkeletonTeams />;
  }

  const team = getTeamsByApiQuery.data?.find(
    (team: any) => team.strTeam === teamSelected
  );

  const teamInfo = team
    ? {
        id_team_api:team.idTeam,
        name: team.strTeam,
        stadium: team.strStadium,
        city: team.strLocation,
        foundation: team.intFormedYear,
        image_url: team.strBadge,
      }
    : null;

  const closeModalCreateTeamFunction = () => {
    onCloseModalCreateTeam();
    clearErrorsCreateTeam();
    resetCreateTeam();
  };

  const createTeamFunction = () => {
    if (teamInfo) {
      createTeamMutation.mutate(teamInfo, {
        onSuccess: () => {
          closeModalCreateTeamFunction();
        },
      });
    }
  };

  const deleteTeamFunction = (teamId: string) => {
    setLoadingSpaces((prev) => new Set(prev).add(teamId));

    deleteTeamMutation.mutate(teamId, {
      onSettled: () => {
        setLoadingSpaces((prev) => {
          const updated = new Set(prev);
          updated.delete(teamId);
          return updated;
        });
      },
    });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto flex-1 sm:p-6 p-4 flex flex-col"
    >
      <div className="w-full max-w-[1123px] mx-auto flex-1 flex flex-col">
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

        {(getTeamsQuery.data?.teams ?? []).length > 0 ? (
          <>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 flex-wrap mt-4">
              {getTeamsQuery.data?.teams?.map((dataTeam: any) => {
                const isLoading = loadingSpaces.has(dataTeam?.id);
                return (
                  <CardInfoTeam
                    key={dataTeam?.id}
                    dataTeam={dataTeam}
                    actionDelete={() => deleteTeamFunction(dataTeam?.id)}
                    isLoadingButton={isLoading}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="mt-4  flex-1 grid place-items-center">
            <ComponentEmpty textComponentEmpty="No hay equipos creados" />
          </div>
        )}
      </div>

      <ModalCustom
        onSubmitModal={handleSubmitCreateTeam(createTeamFunction)}
        isOpen={isOpenModalCreateTeam}
        onClose={closeModalCreateTeamFunction}
        textButton="Crear"
        titleModal={"Crear equipo"}
        isLoadingButton={createTeamMutation.isPending}
      >
        <SelectSimple
          iconItem
          control={controlCreateTeam}
          nameRegister="team"
          label="Equipos disponibles"
          options={dataSelectTeams}
          validations={{ required: "Seleccione un equipo" }}
          labelOption={""}
          uppercase={false}
        />
      </ModalCustom>
    </motion.div>
  );
};
