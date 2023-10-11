import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import { routes } from "./utils/routes";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { username } = useUser();

  if (!username) {
    return <Navigate to={routes.signin} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
