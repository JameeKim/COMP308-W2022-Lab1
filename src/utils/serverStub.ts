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
export const generateDelay = (): number =>
  Math.random() * (SERVER_DELAY_MAX - SERVER_DELAY_MIN) + SERVER_DELAY_MIN;
