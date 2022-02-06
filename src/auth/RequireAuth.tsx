import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./useAuth";

interface RequireAuthProps {
  children: ReactNode;
}

/**
 * Require the user to be signed in; redirect to sign in if not
 */
const RequireAuth = ({ children }: RequireAuthProps): JSX.Element => {
  const { email } = useAuth();
  const location = useLocation();

  return email
    ? <>{children}</>
    : <Navigate to="/signin" replace state={{ from: location }} />;
};

export default RequireAuth;
