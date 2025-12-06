import { DatePicker } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import { SelectSimple } from "../../../../shared/components/molecules/select/SelectSimple";
import { now } from "@internationalized/date";
import ControlledDatePicker from "../../../../shared/components/molecules/input/InputDate";
import { useMemo } from "react";

interface Props {
  control: any;
  teams: any;
  dataFormCreateMatch: any;
  dataMatch: any;
}

export const FormEditMatch = ({
  control,
  teams,
  dataFormCreateMatch,
  dataMatch,
}: Props) => {

  const firstSectionStatesMatch = [
    {
      key: "programado",
      label: "Programado",
    },
    {
      key: "en_venta",
      label: "En venta",
    },
    {
      key: "cancelado",
      label: "Cancelado",
    },
  ];

  const secondSectionStatesMatch = [
    {
      key: "programado",
      label: "Programado",
    },
    {
      key: "en_venta",
      label: "En venta",
    },
  ];

  const statesMatch = useMemo(() => {
    if (dataMatch?.state === "programado" || dataMatch?.state === "en_venta") {
      return secondSectionStatesMatch;
    }
    return firstSectionStatesMatch;
  }, [dataMatch?.state]);
    
  const dataSelectTeamVisitor = useMemo(() => {
    const validateTeamVisitor = teams?.filter(
      (team: any) => team?.id != dataFormCreateMatch?.id_team_local
    );

    return (
      validateTeamVisitor?.map((team: any) => ({
        key: team?.id,
        label: team?.name,
        iconSelect: team?.image_url,
      })) ?? []
    );
  }, [dataFormCreateMatch?.id_team_local]);

  const dataSelectTeamLocal = useMemo(() => {
    const validateTeamVisitor = teams?.filter(
      (team: any) => team?.id != dataFormCreateMatch?.id_team_visitor
    );

    return (
      validateTeamVisitor?.map((team: any) => ({
        key: team?.id,
        label: team?.name,
        iconSelect: team?.image_url,
      })) ?? []
    );
  }, [dataFormCreateMatch?.id_team_visitor]);

  return (
    <I18nProvider locale="">
      <div className=" border-white flex flex-col gap-4">
        <ControlledDatePicker
          control={control}
          name="match_datetime"
          label="Fecha y hora del partido"
          withTime
          hideTimeZone
        />
        <SelectSimple
          iconItem
          control={control}
          nameRegister="id_team_local"
          label="Equipo local"
          options={dataSelectTeamLocal}
          labelOption={""}
          uppercase={false}
        />
        <SelectSimple
          isDisabled={!dataFormCreateMatch?.id_team_local}
          iconItem
          control={control}
          nameRegister="id_team_visitor"
          label="Equipo visitante"
          options={dataSelectTeamVisitor}
          labelOption={""}
          uppercase={false}
        />
        <SelectSimple
          control={control}
          nameRegister="state"
          label="Estado del partido"
          options={statesMatch}
          labelOption={""}
          uppercase={false}
        />
      </div>
    </I18nProvider>
  );
};
