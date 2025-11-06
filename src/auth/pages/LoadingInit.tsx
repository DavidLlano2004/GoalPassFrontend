import { Images } from "../../assets/images/ImagesProvider";
import { SpinnerCustom } from "../components/molecules/spinnerCustom/SpinnerCustom";
const { LogoXlInit } = Images;

export const LoadingInit = () => {
  return (
    <article className=" w-full h-screen bg-black-1-custom grid place-items-center">
      <div className=" flex flex-col justify-center">
        <img src={LogoXlInit} alt="Logo GoalPass" />
        <h1 className="text-[96px] font-extrabold bg-linear-to-r from-blue-1-custom to-green-1-custom bg-clip-text text-transparent">
          GoalPass
        </h1>
        <div className="flex justify-center mt-5">
          <SpinnerCustom />
        </div>
      </div>
    </article>
  );
};
