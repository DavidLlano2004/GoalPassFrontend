import { FormLogin } from "../components/forms/FormLogin";

export const LoginPage = () => {
  return (
    <div className="w-full max-w-[500px] sm:mt-0 mt-8 bg-black-2-custom h-[694px] rounded-[40px] flex flex-col items-center sm:px-15 px-10 py-12">
      <h1 className="sm:text-[24px] text-[22px] font-extrabold text-white">Iniciar sesión</h1>
      <div className="w-full mt-10 ">
        <FormLogin />
      </div>
    </div>
  );
};
