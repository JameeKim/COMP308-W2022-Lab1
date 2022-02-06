import { useContext } from "react";

import { AuthContext, AuthContextData } from "./context";

/**
 * A custom hook for using the auth context value
 */
export const useAuth = (): AuthContextData => {
  const data = useContext(AuthContext);

  if (!data) {
    // This context doesn't work without AuthProvider
    throw new Error("useAuth must be used with AuthProvider");
  }

  return data;
};

interface RequiredAuthData {
  email: NonNullable<AuthContextData["email"]>,
  endSession: AuthContextData["endSession"],
}

/**
 * A custom hook for retrieving auth info when the user is guaranteed to be
 * authenticated beforehand
 */
export const useRequiredAuth = (): RequiredAuthData => {
  const { email, endSession } = useAuth();

  if (!email) {
    // This hook must only be used when the user is guaranteed to be signed in
    throw new Error("useRequiredAuth must be used with RequireAuth");
  }

  return { email, endSession };
};
