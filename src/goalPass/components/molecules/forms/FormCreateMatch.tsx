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
}

export const FormCreateMatch = ({
  control,
  teams,
  dataFormCreateMatch,
}: Props) => {
  const dataSelectTeamLocal =
    teams?.map((team: any) => ({
      key: team?.id,
      label: team?.name,
      iconSelect: team?.image_url,
    })) ?? [];

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

  console.log("====================================");
  console.log(dataFormCreateMatch);
  console.log("====================================");

  return (
    <I18nProvider locale="">
      <div className=" border-white flex flex-col gap-4">
        <ControlledDatePicker
          control={control}
          name="match_datetime"
          label="Fecha y hora del partido"
          withTime
          hideTimeZone
          isRequired
        />
        <SelectSimple
          iconItem
          control={control}
          nameRegister="id_team_local"
          label="Equipo local"
          options={dataSelectTeamLocal}
          validations={{ required: "Seleccione un equipo" }}
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
          validations={{ required: "Seleccione un equipo" }}
          labelOption={""}
          uppercase={false}
        />
      </div>
    </I18nProvider>
  );
};
