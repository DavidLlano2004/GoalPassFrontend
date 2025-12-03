import { InputSimple } from "../../../shared/components/molecules/input/InputSimple";
import { useForm } from "react-hook-form";
import { InputPassword } from "../../../shared/components/molecules/input/InputPassword";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { Icons } from "../../../assets/icons/IconsProvider";
import { Link, useNavigate } from "react-router";
import { paths } from "../../../routes/paths";
import { useMutationLogin } from "../../hooks";
const { IconGoogle } = Icons;

export const FormLogin = () => {
  const navigate = useNavigate();
  const { loginMutation } = useMutationLogin();
  const defaultValues = {
    email: "",
    password: "",
  };
  const { control, handleSubmit, watch, setError } = useForm({ defaultValues });
  const dataForm = watch();

  const loginFunction = () => {
    loginMutation.mutate(dataForm, {
      onSuccess: (data) => {
        localStorage.setItem("token", data?.token);
        navigate(paths.LayoutGoalPass);
      },
      onError: (error: any) => {
        if (error.error === "Invalid credentials") {
          setError("password", {
            type: "server",
            message: "Credenciales inválidas",
          });
          setError("email", { type: "server", message: "" });
        }
      },
    });
  };

  const handleGoogle = () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  return (
    <form
      onSubmit={handleSubmit(loginFunction)}
      className="flex flex-col gap-8"
    >
      <InputSimple
        control={control}
        nameRegister="email"
        label="Correo electrónico"
        validations={{ required: "El correo es requerido" }}
      />
      <div className="flex flex-col gap-4 items-start">
        <InputPassword
          control={control}
          nameRegister="password"
          validations={{ required: "La contraseña es requerida" }}
        />
        <button className="cursor-pointer">
          <p className="text-white underline font-normal">
            ¿Olvidaste tu contraseña?
          </p>
        </button>
      </div>
      <div className="my-3">
        <ButtonSimple
          isLoading={loginMutation.isPending}
          textButton="Ingresar"
          widthButton="w-full"
          type="submit"
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
          actionButton={handleGoogle}
          startContent={<img className="w-6" src={IconGoogle} />}
          textButton="Ingresar con google"
          widthButton="w-full"
          bgColorButton="bg-white"
          colorTextButton="text-black-1-custom"
          type="button"
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
