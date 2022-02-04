import { createContext } from "react";

/**
 * Type of the callback to be passed to auth operations
 */
export interface AuthCallback {
  (): void;
}

/**
 * Type of the data provided by AuthContext
 */
export interface AuthContextData {
  /**
   * Email address of the currently signed-in user
   */
  readonly email: string | null;

  /**
   * Send an authentication request (sign-in) to the server
   */
  readonly authenticate: (email: string, cb: AuthCallback) => void;

  /**
   * Send a request to end the session (sign-out) to the server
   */
  readonly endSession: (cb: AuthCallback) => void;
}

/**
 * The context for auth
 */
export const AuthContext = createContext<AuthContextData | null>(null);
AuthContext.displayName = "Auth";
