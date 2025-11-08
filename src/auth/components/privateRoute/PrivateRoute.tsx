import { Navigate } from "react-router";
import { paths } from "../../../routes/paths";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  allowedRoles?: string[];
  userRole?: string;
  children: React.ReactNode;
}

export const PrivateRoute = ({
  isAuthenticated,
  allowedRoles = [],
  userRole,
  children,
}: PrivateRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={paths.AuthLayout} replace />;
  }

  if (allowedRoles.length > 0 && (!userRole || !allowedRoles.includes(userRole))) {
    return <Navigate to={paths.AuthLayout} replace />;
  }

  return children;
};
