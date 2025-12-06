import { useNavigate, useParams } from "react-router";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { CardSoccerStands } from "../../components/molecules/cards/CardSoccerStands";
import { motion } from "framer-motion";
import { Spinner } from "@heroui/spinner";
import { useMutationMatch, useQueryMatches, useQueryTeams } from "../../hooks";
import { addToast, useDisclosure } from "@heroui/react";
import { ModalCustom } from "../../../shared/components/organims/modals/ModalCustom";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { FormEditMatch } from "../../components/molecules/forms/FormEditMatch";
import { convertTo24Hour } from "../../../helpers/convertTo24Hour";
import { useQueryTickets } from "../../hooks/useQueryTickets.hook";
import { useFormatNumber } from "../../../shared/hooks/useFormatNumber";
import { useQuerySoccerStands } from "../../hooks/useQuerySoccerStands.hook";
import PieChart from "../../../shared/components/organims/charts/PieChart";

export const InfoOneMatch = () => {
  const { formatNumber } = useFormatNumber();
  const { getTeamsQuery } = useQueryTeams();
  const { deleteMatchMutation, editMatchMutation } = useMutationMatch();
  const { id } = useParams();
  const { getMatchQuery } = useQueryMatches(id);
  const { getTicketsByMatchQuery } = useQueryTickets(id!);
  const { getSoccerStandsSummary } = useQuerySoccerStands(id!);

  const navigate = useNavigate();

  const {
    isOpen: isOpenModalDeleteMatch,
    onOpen: onOpenModalDeleteMatch,
    onClose: onCloseModalDeleteMatch,
  } = useDisclosure();

  const {
    isOpen: isOpenModalCancelMatch,
    onOpen: onOpenModalCancelMatch,
    onClose: onCloseModalCancelMatch,
  } = useDisclosure();

  const {
    isOpen: isOpenModalEditMatch,
    onOpen: onOpenModalEditMatch,
    onClose: onCloseModalEditMatch,
  } = useDisclosure();

  const { control, watch, reset } = useForm();
  const dataForm = watch();

  const formattedDate = getMatchQuery?.data?.match?.match_date
    ? new Date(getMatchQuery?.data?.match?.match_date).toLocaleDateString(
        "es-ES",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : null;

  const formatTo12Hour = (time: string) => {
    if (!time) return "";

    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);

    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    if (hour === 0) hour = 12;

    const hourFormatted = String(hour).padStart(2, "0");

    return `${hourFormatted}:${minute} ${ampm}`;
  };

  const colorChip = (textChip: string) => {
    switch (textChip) {
      case "en_venta":
        return {
          containerChip:
            "bg-green-1-custom/30 border-green-1-custom shadow-green-1-custom",
          textChipColor: "text-green-1-custom",
          textChipFunction: "En venta",
        };
      case "programado":
        return {
          containerChip:
            "bg-blue-1-custom/30 border-blue-1-custom shadow-blue-1-custom",
          textChipColor: "text-[#0055FF]",
          textChipFunction: "Programado",
        };
      case "finalizado":
        return {
          containerChip: "bg-gray-500/20  border-gray-500/50 shadow-gray-500",
          textChipColor: "text-gray-100",
          textChipFunction: "Finalizado",
        };

      default:
        return {
          containerChip:
            "bg-red-1-custom/30 border-red-1-custom shadow-red-1-custom",
          textChipColor: "text-red-1-custom",
          textChipFunction:
            getMatchQuery?.data?.match?.state === "cancelado"
              ? "Cancelado"
              : "Agotado",
        };
    }
  };

  const deleteMatchFunction = () => {
    deleteMatchMutation.mutate(id!, {
      onSuccess: () => {
        navigate(-1);
        onCloseModalDeleteMatch();
      },
      onError: () => {
        addToast({
          title: "¡Ups!",
          description:
            "No puedes borrar este partido , ya se han comprado boletas",
          color: "danger",
        });
        onCloseModalDeleteMatch();
      },
    });
  };

  const cancelMatchFunction = () => {
    editMatchMutation.mutate(
      { dataForm: { state: "cancelado" }, matchId: id },
      {
        onSuccess: () => {
          onCloseModalCancelMatch();
        },
      }
    );
  };

  const teamLocal = useMemo(() => {
    return getTeamsQuery.data?.teams?.find(
      (team: any) => team?.id === dataForm?.id_team_local
    );
  }, [dataForm?.id_team_local]);

  const editMatchFunction = () => {
    const newData = {
      ...dataForm,
      stadium: teamLocal?.stadium,
    };
    editMatchMutation.mutate(
      { dataForm: newData, matchId: id },
      {
        onSuccess: () => {
          onCloseModalEditMatch();
        },
      }
    );
  };

  const dataPieChart = useMemo(() => {
    const stands = getSoccerStandsSummary.data?.response?.stands || [];
    return stands.map((stand) => ({
      name: stand.stand_name,
      value: stand.tickets_sold,
    }));
  }, [getSoccerStandsSummary.data]);

  const isLoading =
    getTeamsQuery.isLoading ||
    getMatchQuery.isLoading ||
    getTicketsByMatchQuery.isLoading ||
    getSoccerStandsSummary.isLoading;

  useEffect(() => {
    if (getMatchQuery.data != null) {
      const matchDate = getMatchQuery.data?.match.match_date; // "2025-11-28"
      const matchHour = getMatchQuery.data?.match.match_hour; // "14:00:00" o "02:00 PM"

      let combinedDateTime = null;

      if (matchDate && matchHour) {
        const hour24 =
          matchHour.includes("PM") || matchHour.includes("AM")
            ? convertTo24Hour(matchHour)
            : matchHour;

        combinedDateTime = `${matchDate}T${hour24}`; // "2025-11-28T14:00:00"
      }

      reset({
        id_team_local: getMatchQuery.data?.match.id_team_local || "",
        id_team_visitor: getMatchQuery.data?.match.id_team_visitor || "",
        state: getMatchQuery.data?.match?.state,
        match_datetime: combinedDateTime, // Pasar string, no Date object
      });
    }
  }, [getMatchQuery.data, reset]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-y-auto flex-1 sm:p-6 p-4 flex flex-col "
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center w-[170px] gap-3 cursor-pointer"
      >
        <i className="fi fi-rr-arrow-small-left text-[25px] flex"></i>
        <p className="font-extrabold">Volver a partidos</p>
      </button>

      {isLoading ? (
        <div className="flex-1 justify-center items-center flex">
          <Spinner size="lg" color="white" label="Cargando..." />
        </div>
      ) : (
        <div className="w-full max-w-[1123px] mx-auto">
          <div className=" bg-black-2-custom w-full h-auto relative rounded-[15px] mt-6 flex justify-between items-center py-6 px-10">
            <div className="w-full flex lg:flex-row flex-col justify-between">
              <div className="flex sm:flex-row flex-col items-center gap-10 flex-1">
                <div className="flex sm:hidden gap-3 justify-center mt-6 flex-wrap">
                  <span className="flex items-center gap-2">
                    <i className="fi fi-tr-calendar-day text-[14px] flex"></i>
                    <p className="text-[14px] text-white font-light">
                      {formattedDate} -{" "}
                      {formatTo12Hour(
                        getMatchQuery?.data?.match?.match_hour ?? ""
                      )}
                    </p>
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fi fi-rs-marker text-[14px] flex"></i>
                    <p className="text-[14px] text-white font-light">
                      {getMatchQuery?.data?.match?.stadium}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2  flex-1">
                  <img
                    className="h-[85px]"
                    src={getMatchQuery?.data?.match?.local?.image_url}
                    alt=""
                  />
                  <p className="font-extrabold text-white text-[16px] text-center  min-h-[50px]">
                    {getMatchQuery?.data?.match?.local?.name}
                  </p>
                </div>
                <div className=" flex flex-col items-center flex-[1.2]">
                  <p className=" font-extrabold text-[20px]">VS</p>
                  <div className="sm:flex flex-col hidden gap-1 justify-center mt-6 flex-wrap">
                    <span className="flex items-center gap-2">
                      <i className="fi fi-tr-calendar-day text-[12px] flex"></i>
                      <p className="text-[12px] text-white font-light">
                        {formattedDate} -{" "}
                        {formatTo12Hour(
                          getMatchQuery?.data?.match?.match_hour ?? ""
                        )}
                      </p>
                    </span>
                    <span className="flex items-center gap-2">
                      <i className="fi fi-rs-marker text-[12px] flex"></i>
                      <p className="text-[12px] text-white font-light">
                        {getMatchQuery?.data?.match?.stadium}
                      </p>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2  flex-1">
                  <img
                    className="h-[85px]"
                    src={getMatchQuery?.data?.match?.visitor?.image_url}
                    alt=""
                  />
                  <p className="font-extrabold text-white text-[16px] text-center  min-h-[50px]">
                    {getMatchQuery?.data?.match?.visitor?.name}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:items-end items-center flex-1 lg:mt-0 mt-6 lg:gap-0 gap-3">
                <div
                  className={`w-[120px] h-[30px] rounded-lg border grid place-items-center shadow ${
                    colorChip(getMatchQuery?.data?.match?.state ?? "")
                      .containerChip
                  }`}
                >
                  <p
                    className={`font-normal text-[14px] ${
                      colorChip(getMatchQuery?.data?.match?.state ?? "")
                        .textChipColor
                    }`}
                  >
                    {
                      colorChip(getMatchQuery?.data?.match?.state ?? "")
                        .textChipFunction
                    }
                  </p>
                </div>
                <div className=" flex flex-col">
                  <p className="text-white font-extrabold lg:text-end text-center">
                    {formatNumber(
                      getTicketsByMatchQuery?.data?.response?.tickets_sold ?? 0
                    )}{" "}
                    /{" "}
                    {formatNumber(
                      getTicketsByMatchQuery?.data?.response?.total_capacity ??
                        0
                    )}
                  </p>
                  <p className="text-white font-extralight text-end">
                    Boletas vendidas
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex xl:flex-row flex-col gap-4 mt-4 ">
            <div className=" bg-black-2-custom flex-[1.35] h-auto rounded-[15px] p-8 xl:order-1 order-2">
              <div className="flex items-center gap-3">
                <i className="fi fi-tr-court-sport text-[20px] text-white flex"></i>
                <h1 className="text-[20px] text-white font-bold">
                  Mapa del estadio
                </h1>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                {getSoccerStandsSummary.data?.response?.stands.map((stand) => (
                  <CardSoccerStands
                    stateMatch={getMatchQuery?.data?.match?.state ?? ""}
                    key={stand.stand_id}
                    soccerStand={stand}
                  />
                ))}

                <div
                  className="w-full sm:h-[100px] min-h-[100px] rounded-[15px] p-px"
                  style={{
                    background: "linear-gradient(to left, #00C853, #0038A8)",
                  }}
                >
                  <div className="w-full h-full rounded-[13px] bg-gray-2-custom flex sm:justify-between justify-center sm:gap-0 gap-4 items-center px-10 sm:py-0 py-10 flex-wrap">
                    <div className="flex flex-col items-center">
                      <p className="text-[14px] font-light text-white">
                        Total vendidas
                      </p>
                      <h1 className="text-[20px] font-bold">
                        {formatNumber(
                          getSoccerStandsSummary.data?.response?.totals
                            ?.tickets_sold ?? 0
                        )}
                      </h1>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[14px] font-light text-white">
                        Ocupación
                      </p>
                      <h1 className="text-[20px] font-bold">
                        {formatNumber(
                          getSoccerStandsSummary.data?.response?.totals
                            ?.occupancy_percentage ?? 0
                        )}
                        %
                      </h1>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[14px] font-light text-white">
                        Ingresos totales
                      </p>
                      <h1 className="text-[20px] font-bold">
                        ${" "}
                        {formatNumber(
                          getSoccerStandsSummary.data?.response?.totals
                            ?.total_revenue ?? 0
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 xl:order-2 order-1">
              <div className="bg-black-2-custom rounded-[15px] min-h-[350px] sm:order-1 order-2 flex flex-col">
                <div className="flex items-center gap-3 px-8 mb-4 mt-6">
                  <i className="fi fi-tr-court-sport text-[20px] text-white flex"></i>
                  <h1 className="text-[20px] text-white font-bold">Ventas</h1>
                </div>
                <PieChart data={dataPieChart} />
              </div>
              {getMatchQuery?.data?.match?.state != "finalizado" && (
                <div className="bg-black-2-custom rounded-[15px] h-fit p-8 sm:order-2 order-1">
                  <h1 className="text-white font-bold text-[20px]">Acciones</h1>
                  <div className="mt-6 flex flex-col gap-6">
                    <ButtonSimple
                      idButton="edit-match-button"
                      actionButton={() => onOpenModalEditMatch()}
                      startContent={
                        <i className="fi fi-rr-edit text-[20px] text-white flex"></i>
                      }
                      textButton="Editar partido"
                      widthButton="min-w-[190px] w-full"
                      heightButton="h-[45px]"
                    />
                    <ButtonSimple
                      actionButton={() => onOpenModalDeleteMatch()}
                      startContent={
                        <i className="fi fi-rr-trash text-[20px] text-white flex"></i>
                      }
                      borderGradient
                      textButton="Borrar partido"
                      widthButton="min-w-[190px] w-full"
                      heightButton="h-[45px]"
                      bgColorButton="bg-gray-2-custom"
                    />
                    {getMatchQuery?.data?.match?.state != "cancelado" && (
                      <ButtonSimple
                        actionButton={() => onOpenModalCancelMatch()}
                        startContent={
                          <i className="fi fi-rr-ban text-[20px] text-white flex"></i>
                        }
                        bgColorButton="bg-red-1-custom/30 border-red-1-custom border"
                        textButton="Cancelar partido"
                        widthButton="min-w-[190px] w-full"
                        heightButton="h-[45px]"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ModalCustom
        onSubmitModal={deleteMatchFunction}
        isOpen={isOpenModalDeleteMatch}
        onClose={
          deleteMatchMutation.isPending
            ? () => {}
            : () => onCloseModalDeleteMatch()
        }
        isLoadingButton={deleteMatchMutation.isPending}
        textButton="Borrar"
        titleModal={"Borrar partido"}
      >
        <div className="my-4">
          <h1 className="text-center text-white text-[20px] font-bold">
            ¿Quieres eliminar este partido?
          </h1>
          <p className="text-center text-white font-extralight mt-2 w-[80%] mx-auto">
            No podrás recuperar la información de este partido
          </p>
        </div>
      </ModalCustom>

      <ModalCustom
        onSubmitModal={cancelMatchFunction}
        isOpen={isOpenModalCancelMatch}
        onClose={
          editMatchMutation.isPending
            ? () => {}
            : () => onCloseModalCancelMatch()
        }
        isLoadingButton={editMatchMutation.isPending}
        textButton="Aceptar"
        titleModal={"Cancelar partido"}
      >
        <div className="my-4">
          <h1 className="text-center text-white text-[20px] font-bold">
            ¿Quieres cancelar este partido?
          </h1>
        </div>
      </ModalCustom>
      <ModalCustom
        onSubmitModal={editMatchFunction}
        isOpen={isOpenModalEditMatch}
        onClose={onCloseModalEditMatch}
        isLoadingButton={editMatchMutation.isPending}
        textButton="Editar"
        titleModal={"Editar partido"}
      >
        <FormEditMatch
          teams={getTeamsQuery.data?.teams}
          control={control}
          dataFormCreateMatch={dataForm}
          dataMatch={getMatchQuery.data?.match}
        />
      </ModalCustom>
    </motion.div>
  );
};
