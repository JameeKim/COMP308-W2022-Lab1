import { useContext } from "react";

import { AuthContext, AuthContextData } from "./context";

/**
 * A custom hook for using the auth context value
 */
const useAuth = (): AuthContextData => {
  const data = useContext(AuthContext);

  if (!data) {
    /** This context doesn't work without {@link AuthProvider} */
    throw new Error("useAuth must be used with AuthProvider");
  }

  return data;
};

export default useAuth;
