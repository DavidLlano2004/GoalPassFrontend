import { motion } from "framer-motion";
import { Images } from "../../../assets/images/ImagesProvider";
const { ImageNacional, ImageOnceCaldas } = Images;

interface Props {
  setCurrentSection?: (section: number) => void;
}

export const SimulationResults = ({ setCurrentSection = () => {} }: Props) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4 grid-cols-3 grid gap-4 flex-wrap"
    >
      <div className="w-full min-h-[230px] sm:py-0 py-8 rounded-[15px] bg-black-2-custom col-span-3 flex justify-center items-center">
        <div className="flex sm:flex-row flex-col items-center w-full lg:gap-18 gap-6">
          <div className="flex flex-col items-end flex-1 ">
            <div className="flex flex-col items-center gap-3">
              <span>
                <img className="h-20" src={ImageOnceCaldas} alt="" />
              </span>
              <p className="font-semibold text-[18px] text-center">Once Caldas</p>
            </div>
          </div>
          <div className="">
            <p className="font-bold text-[30px]">3 - 0</p>
          </div>
          <div className="flex flex-col items-start flex-1 ">
            <div className="flex flex-col items-center gap-3">
              <span>
                <img className="h-20" src={ImageNacional} alt="" />
              </span>
              <p className="font-semibold text-[18px] text-center">Atletico Nacional</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[220px] rounded-[15px] bg-black-2-custom lg:col-span-1 col-span-full"></div>
      <div className="w-full h-[220px] rounded-[15px] bg-black-2-custom lg:col-span-1 col-span-full"></div>
      <div className="w-full h-[220px] rounded-[15px] bg-black-2-custom lg:col-span-1 col-span-full"></div>
      
      <div className="w-full h-[300px] rounded-[15px] bg-black-2-custom col-span-3"></div>
      <div className="w-full h-[300px] rounded-[15px] bg-black-2-custom col-span-3"></div>
    </motion.div>
  );
};
