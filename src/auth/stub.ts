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
 * Minimum value of simulated network response delay in milliseconds
 */
const SERVER_DELAY_MIN = 100;

/**
 * Maximum value of simulated network response delay in milliseconds
 */
const SERVER_DELAY_MAX = 500;

/**
 * Generate a random number to imitate server response
 */
const generateDelay = (): number =>
  Math.random() * (SERVER_DELAY_MAX - SERVER_DELAY_MIN) + SERVER_DELAY_MIN;

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
