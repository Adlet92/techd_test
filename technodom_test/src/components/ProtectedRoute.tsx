import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { routes } from "../utils/routes";
import { UserAuth } from "./context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = UserAuth();

  if (!auth || !auth.user) {
    return <Navigate to={routes.signin} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute
