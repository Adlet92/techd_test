import React, { ReactNode } from "react";

import { UserAuth } from "./context/AuthContext";
import { routes } from "./utils/routes";
import { Navigate } from "react-router-dom";

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
