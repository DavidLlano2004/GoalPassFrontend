import { InputSimple } from "../../../../shared/components/molecules/input/InputSimple";
import { SelectSimple } from "../../../../shared/components/molecules/select/SelectSimple";
import ControlledDatePicker from "../../../../shared/components/molecules/input/InputDate";
import type { Control, UseFormRegister } from "react-hook-form";
import { useEffect } from "react";

export interface UpdateUserFormData {
  name: string;
  last_name: string;
  identification_type: "CC" | "TI";
  identification: string;
  rol: string;
  birthday: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface FormUpdateUserProps {
  control: Control<UpdateUserFormData>;
  register: UseFormRegister<UpdateUserFormData>;
  userInfoState: any;
  reset: any;
}
export const FormUpdateUser = ({
  control,
  register,
  userInfoState,
  reset,
}: FormUpdateUserProps) => {
  useEffect(() => {
    if (userInfoState != null) {
      reset({
        name: userInfoState.name || "",
        last_name: userInfoState.last_name || "",
        identification_type: userInfoState.identification_type || "",
        identification: userInfoState.identification || "",
        email: userInfoState.email || "",
        rol: userInfoState.rol || "",
      });
    }
  }, [userInfoState, reset]);
  return (
    <div className="grid grid-cols-2 gap-4">
      <InputSimple
        defaultValue={`${userInfoState?.name}`}
        control={control}
        nameRegister="name"
        label="Nombres"
      />
      <InputSimple
        control={control}
        nameRegister="last_name"
        label="Apellidos"
        defaultValue={`${userInfoState?.last_name}`}
      />
      <div className=" col-span-2">
        <InputSimple
          startContent={
            <div className="flex items-center">
              <select
                defaultValue={`${userInfoState?.identification_type}`}
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
          defaultValue={`${userInfoState?.identification}`}
        />
      </div>
      <div className=" col-span-2">
        <SelectSimple
          control={control}
          nameRegister="rol"
          label="Rol del usuario"
          options={[
            { label: "Administrador", key: "administrador" },
            { label: "Usuario", key: "usuario" },
          ]}
          labelOption={""}
          uppercase={false}
        />
      </div>
      <div className=" col-span-2">
        <ControlledDatePicker
          control={control}
          name="birthday"
          label="Fecha de cumpleaños"
          // defaultValue={userInfoState?.birthday}
        />
      </div>
      <div className=" col-span-2">
        <InputSimple
          control={control}
          nameRegister="email"
          label="Correo electrónico"
          type="email"
          defaultValue={userInfoState?.email}
        />
      </div>
    </div>
  );
};
