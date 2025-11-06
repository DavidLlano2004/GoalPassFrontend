import { motion } from "framer-motion";
import { Images } from "../../../assets/images/ImagesProvider";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
const { ImageNacional, ImageOnceCaldas } = Images;

interface Props {
  setCurrentSection?: (section: number) => void;
}

export const SimulationInfoMatchPage = ({
  setCurrentSection = () => {},
}: Props) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4"
    >
      <div className="w-full bg-black-2-custom min-h-[400px] rounded-[15px] p-8">
        <div className=" max-w-[290px] w-full h-[42px] rounded-[15px] bg-blue-1-custom/30 m-auto flex items-center justify-center px-5 gap-3">
          <div className="flex items-center gap-2 justify-center">
            <i className="fi fi-tr-calendar-day flex text-[14px]"></i>
            <p className="text-[14px]">14 de febrero del 2025 - 08:00 am</p>
          </div>
        </div>

        <div className="mt-6 flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-center">
          <div className="flex flex-col justify-center items-center flex-1 ">
            <div className=" flex flex-col items-center gap-3">
              <span>
                <img
                  className="sm:h-[100px] h-20"
                  src={ImageOnceCaldas}
                  alt=""
                />
              </span>
              <p className="text-white font-bold text-[20px]">Once Caldas</p>
            </div>
          </div>

          <div className="">
            <h1 className="text-[40px] font-bold bg-linear-to-r from-green-1-custom to-blue-1-custom bg-clip-text text-transparent">
              VS
            </h1>
          </div>

          <div className="flex flex-col justify-center items-center flex-1 ">
            <div className=" flex flex-col items-center gap-3">
              <span>
                <img className="sm:h-[100px] h-20" src={ImageNacional} alt="" />
              </span>
              <p className="text-white font-bold text-[20px]">
                Atletico Nacional
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4 flex-wrap">
            <ButtonSimple
              actionButton={() => setCurrentSection(0)}
              borderGradient
              textButton="Cambiar partido"
              widthButton="sm:w-[172px] w-full"
              heightButton="h-[50px]"
              bgColorButton="bg-gray-2-custom"
            />
            <ButtonSimple
              actionButton={() => setCurrentSection(2)}
              startContent={
                <i className="fi fi-rr-football text-[20px] text-white flex"></i>
              }
              textButton="Simular partido"
              widthButton="sm:w-[193px] w-full"
              heightButton="h-[50px]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
