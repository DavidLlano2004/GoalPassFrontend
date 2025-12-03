import { SpinnerCustom } from "../components/molecules/spinnerCustom/SpinnerCustom";
import { Images } from "../../assets/images/ImagesProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { paths } from "../../routes/paths";
import { useAppDispatch } from "../../redux/hooks/reduxHooks";
import { loginCase } from "../../redux/slices/auth.slice";
const { LogoXlInit } = Images;

export const GoogleSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      const dataToken = jwtDecode<any>(token);
      dispatch(
        loginCase({
          id: dataToken?.id,
          rol: dataToken?.rol,
          email: dataToken?.email,
          name: dataToken?.name,
        })
      );
      setTimeout(() => {
        navigate(paths.LayoutGoalPass);
      }, 1000);
    } else {
      navigate(paths.AuthLayout);
    }
  }, []);

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
