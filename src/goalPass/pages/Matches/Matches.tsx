import React from "react";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { useForm } from "react-hook-form";
import { ContainerMatchesAndFilters } from "./components/ContainerMatchesAndFilters";
import { ComponentEmpty } from "../../../shared/components/molecules/empty/ComponentEmpty";
import { ModalCustom } from "../../../shared/components/organims/modals/ModalCustom";
import { useDisclosure } from "@heroui/react";
import { FormCreateMatch } from "../../components/molecules/forms/FormCreateMatch";
import { useApiTeams } from "../../../apiTeams/useApiTeams";

export const Matches = () => {
  const { getTeamsByApiQuery } = useApiTeams();

  const { control: controlSearchTeams } = useForm();

  const { handleSubmit: handleCreateMatch } = useForm();
  const {
    isOpen: isOpenModalCreateMatch,
    onOpen: onOpenModalCreateMatch,
    onClose: onCloseModalCreateMatch,
  } = useDisclosure();

  const arrayExample = [1];

  const onSubmitCreateMatch = () => {};

  console.log(getTeamsByApiQuery.data);
  

  return (
    <div className="overflow-y-auto flex-1 p-6 flex flex-col">
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
        className={`flex-1 flex flex-col ${
          arrayExample?.length === 0 && "justify-center items-center"
        }`}
      >
        {arrayExample?.length > 0 ? (
          <ContainerMatchesAndFilters control={controlSearchTeams} />
        ) : (
          <ComponentEmpty textComponentEmpty="Aún no hay partidos" />
        )}
      </div>
      <ModalCustom
        onSubmitModal={handleCreateMatch(onSubmitCreateMatch)}
        isOpen={isOpenModalCreateMatch}
        onClose={onCloseModalCreateMatch}
        textButton="Crear"
        titleModal={"Crear partido"}
      >
        <FormCreateMatch />
      </ModalCustom>
    </div>
  );
};
