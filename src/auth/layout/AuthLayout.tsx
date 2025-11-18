import { Outlet, useLocation, useNavigate } from "react-router";
import { LoadingInit } from "../pages/LoadingInit";
import { Images } from "../../assets/images/ImagesProvider";
import { ButtonSimple } from "../../shared/components/molecules/buttons/ButtonSimple";
import { paths } from "../../routes/paths";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const { ImageBgAuth, LogoAppSm } = Images;

export const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  });

  if (isLoading) {
    return <LoadingInit />;
  }

  console.log(pathname);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-svh overflow-hidden"
    >
      <section className="w-full h-full relative">
        <img className="w-full h-full object-cover" src={ImageBgAuth} alt="" />
        <div className="w-full h-full absolute top-0 bg-black/50 sm:p-6 p-3 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img className="w-[65px]" src={LogoAppSm} alt="" />
              <h1 className="text-white text-[24px]">GoalPass</h1>
            </div>
            <div className="flex-1 sm:flex justify-end hidden">
              <ButtonSimple
                actionButton={() =>
                  navigate(
                    pathname === paths.AuthLayout
                      ? paths.Register
                      : paths.AuthLayout
                  )
                }
                textButton={
                  pathname === paths.AuthLayout
                    ? "Registrarse"
                    : "Iniciar sesión"
                }
                widthButton="w-full max-w-40"
              />
            </div>
          </div>
          <div className=" flex-1 flex flex-col justify-center items-center">
            <Outlet />
          </div>
        </div>
      </section>
    </motion.article>
  );
};
