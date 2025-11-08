import { motion } from "framer-motion";
import { Images } from "../../../assets/images/ImagesProvider";
import { Icons } from "../../../assets/icons/IconsProvider";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { useNavigate } from "react-router";
import { paths } from "../../../routes/paths";

const { ImageBgAuth, LogoAppSm, ImageOnceCaldas, ImageNacional } = Images;
const { IconSuccessBuy } = Icons;
export const TicketMatch = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: `url(${ImageBgAuth})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="overflow-hidden flex-1 flex flex-col"
    >
      <div className="flex-1 overflow-y-auto py-6 px-4 bg-black/50">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-2 items-center">
            <span>
              <img className="w-[100px]" src={IconSuccessBuy} alt="" />
            </span>
            <p className="font-bold text-[28px]">¡Compra exitosa!</p>
          </div>

          <div className=" mt-8 w-full flex flex-col items-center justify-center">
            <div className=" max-w-[1000px] w-full min-h-[1123px] rounded-[15px] bg-black-2-custom mb-8">
              <div className="w-full h-[110px] rounded-tr-[15px] rounded-tl-[15px] bg-linear-to-l from-green-1-custom to-blue-1-custom grid place-items-center">
                <div className="flex items-center gap-4">
                  <img
                    className="sm:w-20 w-[72px]"
                    src={LogoAppSm}
                    alt="LogoAppSm"
                  />
                  <p className="font-bold sm:text-[28px] text-[24px]">
                    GoalPass
                  </p>
                </div>
              </div>

              <div className="py-10 sm:px-16 px-8">
                <div className=" mt-4 lg:flex-row flex-col flex items-center justify-center sm:gap-12 gap-6">
                  <div className="flex flex-col justify-center items-center gap-2  min-w-[200px]">
                    <span>
                      <img className="h-[85px]" src={ImageOnceCaldas} alt="" />
                    </span>
                    <p className="  text-[20px]">Once Caldas</p>
                  </div>
                  <div>
                    <h1 className="text-[32px] font-extrabold">VS</h1>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2  min-w-[200px]">
                    <span>
                      <img className="h-[85px]" src={ImageNacional} alt="" />
                    </span>
                    <p className="  text-[20px]">Atletico Nacional</p>
                  </div>
                </div>
                <div className=" flex sm:gap-10 gap-4 flex-wrap mt-10 justify-center">
                  <div className="flex items-center gap-2">
                    <i className="fi fi-tr-calendar-day flex text-[16px]"></i>
                    <p className="text-[16px]">15 Nov 2025</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fi fi-tr-clock-five flex text-[16px]"></i>
                    <p className="text-[16px]">08:00 am</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fi fi-tr-court-sport flex text-[16px]"></i>
                    <p className="text-[16px]">Estadio Palogrande</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fi fi-rr-marker flex text-[16px]"></i>
                    <p className="text-[16px]">Occidental</p>
                  </div>
                </div>
                <div className="w-full max-w-[260px] h-[260px] bg-white rounded-[15px] m-auto my-20"></div>
                <div>
                  <h1 className=" font-bold text-[18px]">
                    Detalles de la boleta
                  </h1>
                  <div className="w-full rounded-[15px] bg-gray-2-custom h-auto mt-4 p-12 flex flex-col gap-8">
                    <div className="flex items-center justify-between flex-wrap">
                      <p className="font-light text-[18px]">Ubicación:</p>
                      <p className="text-[18px] font-semibold">
                        Occidental , Fila 12 - Asiento 45
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-light text-[18px]">
                        Cantidad de boletas:
                      </p>
                      <p className="text-[18px] font-semibold">x 1</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-light text-[18px]">Precio unitario:</p>
                      <p className="text-[18px] font-semibold">$45,000</p>
                    </div>
                    <div className="h-0.5 bg-linear-to-l from-green-1-custom to-blue-1-custom"></div>
                    <div className="flex items-center justify-between">
                      <p className="font-light text-[18px]">Precio unitario:</p>
                      <p className="text-[18px] font-semibold">$45,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ButtonSimple
              actionButton={() => navigate(paths.LayoutGoalPass)}
              textButton="Comprar más boletas"
              widthButton="max-w-[248px] w-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
