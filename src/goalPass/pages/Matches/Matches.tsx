import React, { useEffect, useMemo, useState } from "react";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { useForm } from "react-hook-form";
import { ContainerMatchesAndFilters } from "./components/ContainerMatchesAndFilters";
import { ComponentEmpty } from "../../../shared/components/molecules/empty/ComponentEmpty";
import { ModalCustom } from "../../../shared/components/organims/modals/ModalCustom";
import { addToast, useDisclosure } from "@heroui/react";
import { FormCreateMatch } from "../../components/molecules/forms/FormCreateMatch";
import { motion } from "framer-motion";
import { useFormatDateTime } from "../../../shared/hooks/useFormatDateTime";
import { useQueryMatches } from "../../hooks/useQueryMatches.hook";
import { SkeletonMatches } from "../../../shared/components/organims/skeletons/SkeletonMatches";
import { useMutationMatch, useQueryTeams } from "../../hooks";

export const Matches = () => {
  const { getMatchesQuery } = useQueryMatches();
  const { createMatchMutation } = useMutationMatch();
  const { getTeamsQuery } = useQueryTeams();

  const [dateHourMatch, setDateHourMatch] = useState(null);

  const { date, hour } = useFormatDateTime(dateHourMatch || "");

  const { control: controlSearchTeams } = useForm();

  const {
    clearErrors: clearErrorsCreateMatch,
    reset: resetCreateMatch,
    handleSubmit: handleCreateMatch,
    control: controlCreateMatch,
    watch: watchCreateMatch,
  } = useForm();

  const dataFormCreateMatch = watchCreateMatch();

  const {
    isOpen: isOpenModalCreateMatch,
    onOpen: onOpenModalCreateMatch,
    onClose: onCloseModalCreateMatch,
  } = useDisclosure();

  const closeModalCreateMatch = () => {
    onCloseModalCreateMatch();
    resetCreateMatch();
    clearErrorsCreateMatch();
  };

  const teamLocal = useMemo(() => {
    return getTeamsQuery.data?.teams?.find(
      (team: any) => team?.id === dataFormCreateMatch?.id_team_local
    );
  }, [dataFormCreateMatch?.id_team_local]);

  const onSubmitCreateMatch = () => {
    const { match_datetime, ...newDataForm } = dataFormCreateMatch;
    const endData = {
      ...newDataForm,
      match_date: date,
      match_hour: hour,
      state: "programado",
      stadium: teamLocal?.stadium,
    };
    createMatchMutation.mutate(endData, {
      onSuccess: () => {
        closeModalCreateMatch();
        addToast({
          title: "Partido",
          description: "Partido creado con éxito",
          color: "success",
        });
      },
    });
  };

  useEffect(() => {
    if (dataFormCreateMatch?.match_datetime) {
      setDateHourMatch(dataFormCreateMatch?.match_datetime);
    }
  }, [dataFormCreateMatch?.match_datetime]);

  const isLoadingScreen = getTeamsQuery.isLoading || getMatchesQuery.isLoading;

  if (isLoadingScreen) {
    return <SkeletonMatches />;
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto flex-1 sm:p-6 p-4 flex flex-col "
    >
      <div className="w-full max-w-[1123px] mx-auto flex-1 flex flex-col">
        <div className="flex items-center justify-between sm:flex-nowrap flex-wrap">
          <div>
            <h1 className="text-[20px] text-white font-bold">
              Gestión de partidos
            </h1>
            <p className="text-white font-extralight">
              Administra todos tus partidos y boletas.
            </p>
          </div>
          <div className="sm:mt-0 mt-6 sm:w-auto w-full">
            <ButtonSimple
              startContent={
                <i className="fi fi-rr-plus-small text-[20px] text-white flex"></i>
              }
              actionButton={() => onOpenModalCreateMatch()}
              textButton="Crear partido"
              widthButton="min-w-[190px] w-full"
            />
          </div>
        </div>
        <div
          className={`flex-1 flex  flex-col ${
            getMatchesQuery.data?.matches?.length === 0 &&
            "justify-center items-center"
          }`}
        >
          {(getMatchesQuery.data?.matches ?? [])?.length > 0 ? (
            <ContainerMatchesAndFilters
              dataMatches={getMatchesQuery.data?.matches}
              control={controlSearchTeams}
            />
          ) : (
            <ComponentEmpty textComponentEmpty="Aún no hay partidos" />
          )}
        </div>
      </div>
      <ModalCustom
        onSubmitModal={handleCreateMatch(onSubmitCreateMatch)}
        isOpen={isOpenModalCreateMatch}
        onClose={closeModalCreateMatch}
        isLoadingButton={createMatchMutation.isPending}
        textButton="Crear"
        titleModal={"Crear partido"}
      >
        <FormCreateMatch
          teams={getTeamsQuery.data?.teams}
          control={controlCreateMatch}
          dataFormCreateMatch={dataFormCreateMatch}
        />
      </ModalCustom>
    </motion.div>
  );
};
