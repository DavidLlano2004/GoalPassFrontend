import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import { paths } from "../../../../routes/paths";
import { NavLink, useMatch } from "react-router";
import { useAppSelector } from "../../../../redux/hooks/reduxHooks";

type Props = {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const MenuSm = ({ isOpen, onOpenChange }: Props) => {
  const { rol } = useAppSelector((state: any) => state.auth);

  const optionsNavbarAdmin = [
    {
      name: "Dashboard",
      path: paths.LayoutGoalPass,
      matchPaths: [paths.LayoutGoalPass],
      iconActive: "fi fi-sr-dashboard-panel",
      iconInactive: "fi fi-tr-dashboard-panel",
      exact: true,
    },
    {
      name: "Partidos",
      path: paths.Matches,
      matchPaths: [paths.Matches, paths.MatchesId],
      iconActive: "fi fi-sr-calendar-day",
      iconInactive: "fi fi-tr-calendar-day",
    },
    {
      name: "Simulación",
      path: paths.SimulationPage,
      matchPaths: [paths.SimulationPage],
      iconActive: "fi fi-sr-play",
      iconInactive: "fi fi-rr-play",
    },
    {
      name: "Reportes",
      path: paths.ReportsPage,
      matchPaths: [paths.ReportsPage],
      iconActive: "fi fi-br-chart-simple",
      iconInactive: "fi fi-tr-chart-simple",
    },
    {
      name: "Usuarios",
      path: paths.UsersPage,
      matchPaths: [paths.UsersPage],
      iconActive: "fi fi-sr-users-alt",
      iconInactive: "fi fi-tr-users-alt",
    },
    {
      name: "Equipos",
      path: paths.TeamsPage,
      matchPaths: [paths.TeamsPage],
      iconActive: "fi fi-ss-football",
      iconInactive: "fi fi-rr-football",
    },
    {
      name: "Historial",
      path: paths.HistoryPage,
      matchPaths: [paths.HistoryPage],
      iconActive: "fi fi-rr-time-past",
      iconInactive: "fi fi-rr-time-past",
    },
  ];

  const optionsNavbarUser = [
    {
      name: "Partidos",
      path: paths.LayoutGoalPass,
      matchPaths: [
        paths.LayoutGoalPass,
        paths.ChooseMatchesUser,
        paths.MatchByIdUser,
      ],
      iconActive: "fi fi-sr-calendar-day",
      iconInactive: "fi fi-tr-calendar-day",
      exact: true,
    },
    {
      name: "Perfil",
      path: paths.ProfileUser,
      matchPaths: [paths.ProfileUser],
      iconActive: "fi fi-sr-user",
      iconInactive: "fi fi-rr-user",
    },
  ];

  const dataNavbar =
    rol === "administrador" ? optionsNavbarAdmin : optionsNavbarUser;
  return (
    <Drawer isOpen={isOpen} placement={"left"} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-black-2-custom w-[70%]">
        {(onClose) => (
          <>
            <DrawerHeader className="flex gap-1 items-center w-full">
              <h1 className="text-[30px] m-auto text-center font-extrabold bg-linear-to-r from-blue-1-custom to-green-1-custom bg-clip-text text-transparent">
                GoalPass
              </h1>
            </DrawerHeader>
            <DrawerBody>
              <div className="w-full mt-8 flex-1">
                {dataNavbar.map(
                  ({
                    name,
                    path,
                    matchPaths,
                    iconActive,
                    iconInactive,
                    exact,
                  }) => {
                    const matches = matchPaths.map((p) => useMatch(p));
                    const active = matches.some(Boolean);

                    return (
                      <NavLink
                        onClick={onClose}
                        to={path}
                        key={name}
                        end={exact}
                        className={`w-full h-[45px] flex items-center gap-3 px-4 mb-4 rounded-[15px] text-white text-base font-bold transition-all duration-150 ease-in hover:bg-white/10 ${
                          active
                            ? "bg-linear-to-r from-blue-1-custom to-green-1-custom"
                            : ""
                        }`}
                      >
                        <i
                          className={`text-[20px] flex justify-center ${
                            active ? iconActive : iconInactive
                          }`}
                        ></i>
                        {name}
                      </NavLink>
                    );
                  }
                )}
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
