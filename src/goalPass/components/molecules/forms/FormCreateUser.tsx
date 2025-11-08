import { DatePicker } from "@heroui/react";
import { InputSimple } from "../../../../shared/components/molecules/input/InputSimple";
import { SelectSimple } from "../../../../shared/components/molecules/select/SelectSimple";
import { I18nProvider } from "@react-aria/i18n";
import { InputPassword } from "../../../../shared/components/molecules/input/InputPassword";
interface Props {
  valuePicker?: any;
  setValuePicker?: (v: any) => void;
  control: any;
}
export const FormCreateUser = ({
  control,
  valuePicker,
  setValuePicker,
}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InputSimple
        control={control}
        nameRegister="name"
        label="Nombres"
        validations={{ required: "El nombre es requerido" }}
      />
      <InputSimple
        control={control}
        nameRegister="name"
        label="Apellidos"
        validations={{ required: "El nombre es requerido" }}
      />
      <div className=" col-span-2">
        <InputSimple
          startContent={
            <div className="flex items-center">
              <select
                className="outline-solid outline-transparent border-0 bg-transparent text-default-400 text-small"
                id="currency"
                name="currency"
              >
                <option>CC</option>
                <option>TI</option>
              </select>
            </div>
          }
          control={control}
          nameRegister="name"
          label="Identificación"
          validations={{ required: "El nombre es requerido" }}
        />
      </div>
      <div className=" col-span-2">
        <SelectSimple
          control={control}
          nameRegister="rol"
          label="Rol del usuario"
          options={[]}
          validations={{ required: "Seleccione un rol" }}
          labelOption={""}
          uppercase={false}
        />
      </div>
      <div className=" col-span-2">
        <I18nProvider locale="es">
          <DatePicker
            // errorMessage="Seleccione la fecha y hora"
            // isInvalid

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
      <div className=" col-span-2">
        <InputSimple
          control={control}
          nameRegister="name"
          label="Correo electrónico"
          validations={{ required: "El nombre es requerido" }}
          type="email"
        />
      </div>
      <div className="col-span-2">
        <InputPassword
          control={control}
          nameRegister="password"
          validations={{ required: "La contraseña es obligatoria" }}
        />
      </div>
      <div className="col-span-2">
        <InputPassword
          label="Confirmar contraseña"
          control={control}
          nameRegister="password"
          validations={{ required: "La contraseña es obligatoria" }}
        />
      </div>
    </div>
  );
};
