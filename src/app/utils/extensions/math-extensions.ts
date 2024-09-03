// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Math {
  /**
   * Generates a random integer between the specified min (inclusive) and max (exclusive) values.
   * @param {number} max - The maximum value (exclusive).
   * @param {number} min - The minimum value (inclusive).
   * @returns {number} A random integer between min (inclusive) and max (exclusive).
   */
  randomNextInt(max: number, min?: number): number;
}

Math.randomNextInt = function (max: number, min: number = 0): number {
  if (min >= max) {
    throw new Error('Min value must be less than max value');
  }
  return Math.floor(Math.random() * (max - min) + min);
};
