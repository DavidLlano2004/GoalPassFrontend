import React from "react";
import { InputSimple } from "../../../../shared/components/molecules/input/InputSimple";
import { I18nProvider } from "@react-aria/i18n";
import { DatePicker } from "@heroui/react";
import { parseDate } from "@internationalized/date";

interface Props {
  valuePicker?: any;
  setValuePicker?: (v: any) => void;
  control: any;
  edit: boolean;
}

export const FormEditProfile = ({
  control,
  valuePicker,
  setValuePicker,
  edit = true,
}: Props) => {
  return (
    <div className="mt-12 grid sm:grid-cols-2 grid-cols-1 gap-6">
      <InputSimple
        control={control}
        nameRegister="name"
        label="Nombre"
        validations={{ required: "El nombre es requerido" }}
        defaultValue={"Admin"}
        isDisabled={edit}
      />
      <InputSimple
        startContent={
          <div className="flex items-center">
            <select
              className="outline-solid outline-transparent border-0 bg-transparent text-default-400 text-small"
              id="currency"
              name="currency"
              defaultValue={"CC"}
            >
              <option>CC</option>
              <option>TI</option>
            </select>
          </div>
        }
        control={control}
        nameRegister="identification"
        label="Identificación"
        validations={{ required: "El nombre es requerido" }}
        isDisabled={edit}
        defaultValue={"1107974183"}
      />
      <InputSimple
        control={control}
        nameRegister="email"
        label="Correo electrónico"
        validations={{ required: "El nombre es requerido" }}
        isDisabled={edit}
        defaultValue={"julian@gmail.com"}
      />
      <InputSimple
        control={control}
        nameRegister="phone"
        label="Teléfono"
        validations={{ required: "El nombre es requerido" }}
        isDisabled={edit}
        defaultValue={"3122480775"}
      />
      <I18nProvider locale="es">
        <DatePicker
          defaultValue={parseDate("2004-01-17")}
          isDisabled={edit}
          value={valuePicker}
          onChange={setValuePicker}
          showMonthAndYearPickers
          label="Fecha de cumpleaños"
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
      </I18nProvider>
    </div>
  );
};
