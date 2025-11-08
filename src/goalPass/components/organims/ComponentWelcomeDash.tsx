import { CardStepsInit } from "../molecules/cards/CardStepsInit";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { paths } from "../../../routes/paths";
import { useNavigate } from "react-router";

export const ComponentWelcomeDash = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-black-2-custom rounded-[15px] py-12 lg:px-20 px-8">
      <div className=" flex flex-col justify-center items-center gap-2">
        <div className="w-[100px] h-[100px] rounded-full bg-linear-to-b from-blue-1-custom to-green-1-custom grid place-items-center">
          <i className="fi fi-rr-trophy flex text-white text-[45px]"></i>
        </div>
        <h1 className="lg:text-[28px] text-[24px] font-bold text-center">
          ¡Bienvenido a GoalPass!
        </h1>
        <p className="font-light lg:text-[18px] text-[16px] text-center xl:w-[60%] w-full">
          Tu plataforma de gestión de boletas de fútbol está lista. Comienza
          configurando tu sistema para empezar a vender entradas
        </p>
      </div>
      <div className="mt-6 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 ">
        <CardStepsInit
          titleCard="1. Configura equipos"
          subtitleCard="Crea los equipos que participarán en los partidos"
          iconCard="fi fi-rr-settings"
        />
        <CardStepsInit
          titleCard="2. Programa partidos"
          subtitleCard="Define fechas, horarios y precios de las entradas"
          iconCard="fi fi-tr-calendar-day"
        />
        <CardStepsInit
          titleCard="3. Gestiona Ventas"
          subtitleCard="Monitorea en tiempo real las ventas de boletas"
          iconCard="fi fi-tr-users"
          className="xl:col-span-1 col-span-full"
        />
      </div>
      <div className="mt-16 flex justify-center">
        <ButtonSimple
          actionButton={() => navigate(paths.TeamsPage)}
          startContent={
            <i className="fi fi-rr-settings text-[20px] text-white flex"></i>
          }
          textButton="Configurar equipos"
          widthButton=" w-full max-w-[260px]"
        />
      </div>
    </div>
  );
};
