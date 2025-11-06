import { motion } from "framer-motion";
import { Images } from "../../../../assets/images/ImagesProvider";

const { ImageOnceCaldas, ImageNacional } = Images;

interface Props {
  actionCard?: () => void;
  index?: number;
}

export const CardMatchSimulation = ({
  actionCard = () => {},
  index = 0,
}: Props) => {
  return (
    <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   transition={{
    //     duration: 0.5,
    //     delay: index * 0.1,
    //     ease: [0.25, 0.46, 0.45, 0.94],
    //   }}
      onClick={() => actionCard()}
      className="flex-1 active:scale-[0.98] bg-black-2-custom rounded-[15px] min-h-[170px] p-8 cursor-pointer border border-transparent hover:border-green-1-custom transition ease-in duration-200 hover:shadow hover:shadow-green-1-custom"
    >
      <div className="flex sm:flex-row flex-col sm:gap-0 gap-4 justify-between items-center">
        <div className="flex sm:flex-row flex-col items-center gap-4">
          <img className="h-[55px]" src={ImageOnceCaldas} alt="" />
          <p className="text-white font-bold text-start">Once Caldas</p>
        </div>
        <div>
          <p className="text-white font-semibold text-[20px]">VS</p>
        </div>
        <div className="flex sm:flex-row flex-col items-center gap-4">
          <p className="text-white font-bold text-end">Atletico Nacional</p>
          <img className="h-[55px]" src={ImageNacional} alt="" />
        </div>
      </div>
      <div className="w-ful h-px bg-linear-to-r from-blue-1-custom to-green-1-custom my-6"></div>
      <div className=" flex sm:gap-10 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <i className="fi fi-tr-calendar-day flex text-[14px]"></i>
          <p className="text-[14px]">15 Nov 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <i className="fi fi-tr-clock-five flex text-[14px]"></i>
          <p className="text-[14px]">08:00 am</p>
        </div>
        <div className="flex items-center gap-2">
          <i className="fi fi-rr-marker flex text-[14px]"></i>
          <p className="text-[14px]">Estadio Palogrande</p>
        </div>
      </div>
    </motion.div>
  );
};
