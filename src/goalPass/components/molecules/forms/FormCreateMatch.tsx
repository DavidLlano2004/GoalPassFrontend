import { DatePicker } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import { SelectSimple } from "../../../../shared/components/molecules/select/SelectSimple";
import { getLocalTimeZone, now } from "@internationalized/date";

interface Props {
  valuePicker?: any;
  setValuePicker?: (v: any) => void;
  control: any;
}

export const FormCreateMatch = ({
  valuePicker,
  setValuePicker,
  control,
}: Props) => {
  return (
    <I18nProvider locale="">
      <div className=" border-white flex flex-col gap-4">
        <DatePicker
          // errorMessage="Seleccione la fecha y hora"
          // isInvalid
          value={valuePicker}
          onChange={setValuePicker}
          hideTimeZone
          showMonthAndYearPickers
          placeholderValue={now("America/Bogota")}
          label="Fecha y hora del partido"
          variant="bordered"
          classNames={{
            base: "w-full",
            inputWrapper: `border bg-gray-2-custom border-gray-1-custom data-[focus=true]:border-blue-1-custom data-[focus=true]:shadow data-[focus=true]:shadow-blue-1-custom  rounded-[15px] p-1 px-5`,
            label: "font-semibold text-[#929292]",
            input: `!text-white text-base`,
            calendarContent: "bg-gray-2-custom",
            timeInput: "bg-gray-2-custom",
            timeInputLabel: "!text-white",
          }}
        />
        <SelectSimple
          iconItem
          control={control}
          nameRegister="rol"
          label="Equipo local"
          // options={dataSelectTeams}
          validations={{ required: "Seleccione un rol" }}
          labelOption={""}
          uppercase={false}
        />
        <SelectSimple
          iconItem
          control={control}
          nameRegister="rol"
          label="Equipo visitante"
          // options={dataSelectTeams}
          validations={{ required: "Seleccione un rol" }}
          labelOption={""}
          uppercase={false}
        />
      </div>
    </I18nProvider>
  );
};
