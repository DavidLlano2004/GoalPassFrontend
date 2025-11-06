import { BrowserRouter, Routes, Route } from "react-router";
import { paths } from "./paths";
import { AuthLayout } from "../auth/layout/AuthLayout";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { Suspense } from "react";
import { GoalPassLayout } from "../goalPass/layouts/GoalPassLayout";
import { DashBoard } from "../goalPass/pages/DashBoard/DashBoard";
import { UserProfile } from "../goalPass/pages/UserProfile";
import { SimulationLayout } from "../goalPass/pages/simulation/SimulationLayout";
import { ReportsPage } from "../goalPass/pages/ReportsPage";
import { UsersPage } from "../goalPass/pages/UsersPage";
import { TeamsPage } from "../goalPass/pages/TeamsPage";
import { HistoryMacthes } from "../goalPass/pages/HistoryMacthes";
import { MatchesLayout } from "../goalPass/pages/Matches/MatchesLayout";
import { Matches } from "../goalPass/pages/Matches/Matches";
import { InfoOneMatch } from "../goalPass/pages/Matches/Matches[id]";
export const AppRouter = () => {
  const rol = "Administrativo";
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
              rol === "Administrativo" ? (
                // <PrivateRoute
                //   isAuthenticated={isLogged}
                //   allowedRoles={["Administrativo"]}
                //   userRole={rol}
                // >
                <DashBoard />
              ) : (
                // </PrivateRoute>
                // <PrivateRoute
                //   isAuthenticated={isLogged}
                //   allowedRoles={["Empleado"]}
                //   userRole={rol}
                // >
                <UserProfile />
                // </PrivateRoute>
              )
            }
          />
          <Route path={paths.MatchesLayout} element={<MatchesLayout />}>
            <Route path={paths.Matches} element={<Matches />} />
            <Route path={paths.MatchesId} element={<InfoOneMatch />} />
          </Route>
          <Route path={paths.SimulationPage} element={<SimulationLayout />} />
          <Route path={paths.ReportsPage} element={<ReportsPage />} />
          <Route path={paths.UsersPage} element={<UsersPage />} />
          <Route path={paths.TeamsPage} element={<TeamsPage />} />
          <Route path={paths.HistoryPage} element={<HistoryMacthes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
