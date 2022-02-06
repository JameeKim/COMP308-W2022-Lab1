import { generateDelay } from "src/utils/serverStub";

/**
 * Stub interface for server-side auth functions
 */
export interface AuthStub {
  /**
   * Authenticate the user (sign in)
   */
  readonly authenticate: (cb: () => void) => void;

  /**
   * End the session for the user (sign out)
   */
  readonly endSession: (cb: () => void) => void;
}

/**
 * Stub instance for server-side auth functions
 */
const authStub: AuthStub = Object.freeze({
  authenticate: (cb) => {
    setTimeout(cb, generateDelay());
  },
  endSession: (cb) => {
    setTimeout(cb, generateDelay());
  },
});

export default authStub;
