import { InputSimple } from "../../../shared/components/molecules/input/InputSimple";
import { useForm } from "react-hook-form";
import { InputPassword } from "../../../shared/components/molecules/input/InputPassword";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { Icons } from "../../../assets/icons/IconsProvider";
import { Link, useNavigate } from "react-router";
import { paths } from "../../../routes/paths";
const { IconGoogle } = Icons;

export const FormLogin = () => {
  const { control } = useForm();
  const navigate = useNavigate();

  return (
    <form className="flex flex-col gap-8">
      <InputSimple
        control={control}
        nameRegister="name"
        label="Correo electrónico"
        validations={{ required: "El nombre es requerido" }}
      />
      <div className="flex flex-col gap-4 items-start">
        <InputPassword
          control={control}
          nameRegister="password"
          validations={{ required: "La contraseña es obligatoria" }}
        />
        <button className="cursor-pointer">
          <p className="text-white underline font-normal">
            ¿Olvidaste tu contraseña?
          </p>
        </button>
      </div>
      <div className="my-3">
        <ButtonSimple
          actionButton={() => navigate(paths.LayoutGoalPass)}
          textButton="Ingresar"
          widthButton="w-full"
        />
      </div>
      <div className="relative justify-center flex-col flex my-8">
        <p className=" absolute self-center bg-black-2-custom p-4 text-white">
          o iniciar con
        </p>
        <div className="h-px bg-white"></div>
      </div>
      <div>
        <ButtonSimple
          startContent={<img className="w-6" src={IconGoogle} />}
          textButton="Ingresar con google"
          widthButton="w-full"
          bgColorButton="bg-white"
          colorTextButton="text-black-1-custom"
        />
      </div>
      <div className="mt-3">
        <h1 className="text-center text-white">
          ¿No tienes una cuenta?{" "}
          <Link to={paths.Register} className="text-green-1-custom underline">
            Regístrate
          </Link>
        </h1>
      </div>
    </form>
  );
};
