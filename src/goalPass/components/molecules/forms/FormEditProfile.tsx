import React from "react";
import { InputSimple } from "../../../../shared/components/molecules/input/InputSimple";
import { I18nProvider } from "@react-aria/i18n";
import { DatePicker } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import ControlledDatePicker from "../../../../shared/components/molecules/input/InputDate";

interface Props {
  valuePicker?: any;
  setValuePicker?: (v: any) => void;
  control: any;
  edit: boolean;
  register: any;
}

export const FormEditProfile = ({ control, edit = true, register }: Props) => {
  return (
    <div className="mt-12 grid sm:grid-cols-2 grid-cols-1 gap-6">
      <InputSimple
        control={control}
        nameRegister="name"
        label="Nombres"
        isDisabled={edit}
      />
      <InputSimple
        control={control}
        nameRegister="last_name"
        label="Apellidos"
        isDisabled={edit}
      />
      <InputSimple
        startContent={
          <div className="flex items-center">
            <select
              className="outline-solid outline-transparent border-0 bg-transparent text-default-400 text-small"
              id="identification_type"
              {...register("identification_type")}
            >
              <option>CC</option>
              <option>TI</option>
            </select>
          </div>
        }
        control={control}
        nameRegister="identification"
        label="Identificación"
        isDisabled={edit}
      />
      <InputSimple
        control={control}
        nameRegister="email"
        label="Correo electrónico"
        isDisabled={edit}
      />
      <InputSimple
        control={control}
        nameRegister="address"
        label="Dirección"
        isDisabled={edit}
      />
      <ControlledDatePicker
        control={control}
        name="birthday"
        label="Fecha de cumpleaños"
        isDisabled={edit}
      />
    </div>
  );
};
