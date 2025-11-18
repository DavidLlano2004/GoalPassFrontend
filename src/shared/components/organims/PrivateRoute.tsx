import { Navigate } from "react-router";
import { paths } from "../../../routes/paths";
import { type ReactNode } from "react";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  allowedRoles?: string[];
  userRole: string;
  children: ReactNode;
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

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to={paths.AuthLayout} replace />;
  }

  return children;
};
