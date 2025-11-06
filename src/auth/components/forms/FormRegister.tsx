import { InputSimple } from "../../../shared/components/molecules/input/InputSimple";
import { useForm } from "react-hook-form";
import { InputPassword } from "../../../shared/components/molecules/input/InputPassword";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { Icons } from "../../../assets/icons/IconsProvider";
import { Link } from "react-router";
import { paths } from "../../../routes/paths";
const { IconGoogle } = Icons;

export const FormRegister = () => {
  const { control } = useForm();

  return (
    <form className=" grid sm:grid-cols-2 grid-cols-1 gap-6">
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
      <InputSimple
        control={control}
        nameRegister="name"
        label="Identificación"
        validations={{ required: "El nombre es requerido" }}
      />
      <InputSimple
        control={control}
        nameRegister="name"
        label="Dirección"
        validations={{ required: "El nombre es requerido" }}
      />
      <div className=" sm:col-span-2 col-span-1">
        <InputSimple
          control={control}
          nameRegister="name"
          label="Correo electrónico"
          validations={{ required: "El nombre es requerido" }}
        />
      </div>
      <div className=" sm:col-span-2 col-span-1">
        <InputPassword
          control={control}
          nameRegister="password"
          validations={{ required: "La contraseña es obligatoria" }}
        />
      </div>
      <div className=" sm:col-span-2 col-span-1">
        <InputPassword
          control={control}
          label="Confirmar contraseña"
          nameRegister="password"
          validations={{ required: "La contraseña es obligatoria" }}
        />
      </div>
      <div className=" sm:col-span-2 col-span-1 my-6">
        <ButtonSimple textButton="Crear cuenta" widthButton="w-full" />
      </div>
      <div className=" sm:col-span-2 col-span-1">
        <h1 className="text-center text-white">
          ¿Ya tienes una cuenta?{" "}
          <Link to={paths.AuthLayout} className="text-green-1-custom underline">
            Inicia sesión
          </Link>
        </h1>
      </div>
    </form>
  );
};
