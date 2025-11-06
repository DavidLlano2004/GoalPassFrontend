import { FormRegister } from "../components/forms/FormRegister";

export const RegisterPage = () => {
  return (
    <div className="w-full max-w-[500px] sm:mt-0 mt-8 bg-black-2-custom min-h-[694px] h-auto rounded-[40px] flex flex-col items-center px-12 py-12">
      <h1 className="text-[24px] font-extrabold text-white">Crear una cuenta</h1>
      <div className="w-full mt-8">
        <FormRegister />
      </div>
    </div>
  );
};
