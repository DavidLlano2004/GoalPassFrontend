import { BrowserRouter, Routes, Route } from "react-router";
import { paths } from "./paths";
import { AuthLayout } from "../auth/layout/AuthLayout";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { Suspense } from "react";
import { GoalPassLayout } from "../goalPass/layouts/GoalPassLayout";
import { DashBoard } from "../goalPass/pages/DashBoard/DashBoard";
import { UserProfile } from "../goalPass/pages/userProfile/UserProfile";
import { SimulationLayout } from "../goalPass/pages/simulation/SimulationLayout";
import { ReportsPage } from "../goalPass/pages/ReportsPage";
import { UsersPage } from "../goalPass/pages/UsersPage";
import { TeamsPage } from "../goalPass/pages/TeamsPage";
import { MatchesLayout } from "../goalPass/pages/Matches/MatchesLayout";
import { Matches } from "../goalPass/pages/Matches/Matches";
import { InfoOneMatch } from "../goalPass/pages/Matches/Matches[id]";
import { PrivateRoute } from "../auth/components/privateRoute/PrivateRoute";
import { MatchesUserLayout } from "../goalPass/pages/matchesUser/MatchesUserLayout";
import { ChooseMatches } from "../goalPass/pages/matchesUser/ChooseMatches";
import { MatchByIdUser } from "../goalPass/pages/matchesUser/MatchByIdUser";
import { TicketMatch } from "../goalPass/pages/matchesUser/TicketMatch";
import { useAppSelector } from "../redux/hooks/reduxHooks";
import { GoogleSuccess } from "../auth/pages/GoogleSuccess";
import { HistoryMatchesLayout } from "../goalPass/pages/HistoryMatches/HistoryMatchesLayout";
import { HistorySimulationMatch } from "../goalPass/pages/HistoryMatches/HistorySimulationMatch";
import { HistoryPageMatches } from "../goalPass/pages/HistoryMatches/HistoryPageMatches";
export const AppRouter = () => {
  const { rol, isLogged } = useAppSelector((state: any) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.AuthLayout} element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path={paths.Register} element={<RegisterPage />} />
        </Route>

        <Route
          path={paths.LayoutGoalPass}
          element={
            <Suspense>
              <GoalPassLayout />
            </Suspense>
          }
        >
          <Route
            path={paths.LayoutGoalPass}
            element={
              rol === "administrador" ? (
                <PrivateRoute
                  isAuthenticated={isLogged}
                  allowedRoles={["administrador"]}
                  userRole={rol}
                >
                  <DashBoard />
                </PrivateRoute>
              ) : (
                <PrivateRoute
                  isAuthenticated={isLogged}
                  allowedRoles={["usuario"]}
                  userRole={rol}
                >
                  <MatchesUserLayout />
                </PrivateRoute>
              )
            }
          >
            <Route path={paths.ChooseMatchesUser} element={<ChooseMatches />} />
            <Route path={paths.MatchByIdUser} element={<MatchByIdUser />} />
            <Route path={paths.TicketMatch} element={<TicketMatch />} />
          </Route>

          <Route
            path={paths.ProfileUser}
            element={
              <PrivateRoute
                isAuthenticated={isLogged}
                allowedRoles={["usuario"]}
                userRole={rol}
              >
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route
            path={paths.MatchesLayout}
            element={
              <PrivateRoute
                isAuthenticated={isLogged}
                allowedRoles={["administrador"]}
                userRole={rol}
              >
                <MatchesLayout />
              </PrivateRoute>
            }
          >
            <Route path={paths.Matches} element={<Matches />} />
            <Route path={paths.MatchesId} element={<InfoOneMatch />} />
          </Route>

          <Route
            path={paths.SimulationPage}
            element={
              <PrivateRoute
                isAuthenticated={isLogged}
                allowedRoles={["administrador"]}
                userRole={rol}
              >
                <SimulationLayout />
              </PrivateRoute>
            }
          />
          <Route
            path={paths.ReportsPage}
            element={
              <PrivateRoute
                isAuthenticated={isLogged}
                allowedRoles={["administrador"]}
                userRole={rol}
              >
                <ReportsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={paths.UsersPage}
            element={
              <PrivateRoute
                isAuthenticated={isLogged}
                allowedRoles={["administrador"]}
                userRole={rol}
              >
                <UsersPage />
              </PrivateRoute>
            }
          />
          <Route
            path={paths.TeamsPage}
            element={
              <PrivateRoute
                isAuthenticated={isLogged}
                allowedRoles={["administrador"]}
                userRole={rol}
              >
                <TeamsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={paths.HistoryPageLayout}
            element={
              <PrivateRoute
                isAuthenticated={isLogged}
                allowedRoles={["administrador"]}
                userRole={rol}
              >
                <HistoryMatchesLayout />
              </PrivateRoute>
            }
          >
            <Route
              path={paths.HistoryPageMatches}
              element={<HistoryPageMatches />}
            />
            <Route
              path={paths.HistoryPageSimulation}
              element={<HistorySimulationMatch />}
            />
          </Route>
        </Route>
        <Route path={paths.GoogleSuccess} element={<GoogleSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};
