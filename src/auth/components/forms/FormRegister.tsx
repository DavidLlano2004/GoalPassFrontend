import { InputSimple } from "../../../shared/components/molecules/input/InputSimple";
import { useForm } from "react-hook-form";
import { InputPassword } from "../../../shared/components/molecules/input/InputPassword";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { Icons } from "../../../assets/icons/IconsProvider";
import { Link } from "react-router";
import { paths } from "../../../routes/paths";
import { ValidatePassword } from "../../../shared/components/molecules/validatePassword/ValidatePassword";
import { useMutationRegister } from "../../hooks/useMutationRegister.hooks";
import { addToast } from "@heroui/toast";
const { IconGoogle } = Icons;

export const FormRegister = () => {
  const { registerMutation } = useMutationRegister();

  const defaultValues = {
    password: "",
    confirm_password: "",
    identification: "",
    identification_type: "CC",
    name: "",
    last_name: "",
    email: "",
    address: "",
  };
  const { control, register, watch, handleSubmit, reset, setError } = useForm({
    defaultValues,
  });

  const { password, confirm_password } = watch();

  const dataForm = watch();

  const registerFunction = () => {
    if (password != confirm_password) {
      setError("confirm_password", {
        type: "server",
        message: "Las contraseñas no coinciden",
      });
      return false;
    }
    registerMutation.mutate(dataForm, {
      onSuccess: () => {
        reset();
        addToast({
          title: "Registro",
          description: "Usuario creado con éxito",
          color: "success",
        });
      },
      onError: (error: any) => {
        if (error.error === "Email already registered") {
          setError("email", {
            type: "server",
            message: "Este correo ya está registrado",
          });
        }
        if (error.error === "Identification already registered") {
          setError("identification", {
            type: "server",
            message: "La identificación ya está en uso",
          });
        }
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(registerFunction)}
      className="grid sm:grid-cols-2 grid-cols-1 gap-5"
    >
      <InputSimple
        control={control}
        nameRegister="name"
        label="Nombres"
        validations={{ required: "El nombre es requerido" }}
      />
      <InputSimple
        control={control}
        nameRegister="last_name"
        label="Apellidos"
        validations={{ required: "El nombre es requerido" }}
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
        validations={{ required: "El nombre es requerido" }}
      />
      <InputSimple
        control={control}
        nameRegister="address"
        label="Dirección"
        validations={{ required: "El nombre es requerido" }}
      />
      <div className=" sm:col-span-2 col-span-1">
        <InputSimple
          control={control}
          nameRegister="email"
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
          nameRegister="confirm_password"
          validations={{ required: "La contraseña es obligatoria" }}
        />
        <ValidatePassword password={password} />
      </div>
      <div className=" sm:col-span-2 col-span-1 my-6">
        <ButtonSimple
          type="submit"
          textButton="Crear cuenta"
          widthButton="w-full"
          isLoading={registerMutation.isPending}
        />
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
