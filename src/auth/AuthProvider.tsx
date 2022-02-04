import { ReactNode, useCallback, useMemo, useState } from "react";

import { AuthContext, AuthContextData } from "./context";
import authStub from "./stub";

/**
 * Props types for {@link AuthProvider}
 */
interface AuthProps {
  /**
   * *Mandatory* children node
   */
  children: ReactNode;
}

/**
 * Provides the auth context value and tracks the user info
 */
const AuthProvider = ({ children }: AuthProps): JSX.Element => {
  const [email, setEmail] = useState<AuthContextData["email"]>(null);

  // Always use the same instance
  const authenticate = useCallback<AuthContextData["authenticate"]>(
    (newEmail, cb) => {
      authStub.authenticate(() => {
        setEmail(newEmail);
        cb();
      });
    },
    [],
  );

  // Always use the same instance
  const endSession = useCallback<AuthContextData["endSession"]>(
    (cb) => {
      authStub.endSession(() => {
        setEmail(null);
        cb();
      });
    },
    [],
  );

  // Don't trigger re-render of consumers unless needed
  const data = useMemo<AuthContextData>(
    () => ({ email, authenticate, endSession }),
    [email, authenticate, endSession],
  );

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
