import { InputPassword } from "../../../../shared/components/molecules/input/InputPassword";
import { ValidatePassword } from "../../../../shared/components/molecules/validatePassword/ValidatePassword";

export const FormChangePassword = ({ control, password }: any) => {
  return (
    <>
      <div className="col-span-2">
        <InputPassword
          control={control}
          nameRegister="actually_password"
          validations={{ required: "La contraseña actual es obligatoria" }}
          label="Contraseña actual"
        />
      </div>
      <div className="col-span-2">
        <InputPassword
          control={control}
          nameRegister="password"
          validations={{ required: "La contraseña es obligatoria" }}
          label="Nueva contraseña"
        />
      </div>
      <div className="col-span-2">
        <InputPassword
          label="Confirmar contraseña"
          control={control}
          nameRegister="confirm_password"
          validations={{ required: "La contraseña es obligatoria" }}
        />
        <ValidatePassword password={password} />
      </div>
    </>
  );
};
