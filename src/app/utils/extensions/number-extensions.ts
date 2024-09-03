// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Number {
  /**
   * Returns the smallest integer greater than or equal to its numeric argument.
   * @returns {number} The ceiling of the number.
   * @example
   * let num = 4.5;
   * console.log(num.ceil()); // Output: 5
   */
  ceil(): number;

  /**
   * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
   * @returns {number} The absolute value of the number.
   * @example
   * let num = -5;
   * console.log(num.abs()); // Output: 5
   */
  abs(): number;

  /**
   * Returns the largest integer less than or equal to its numeric argument.
   * @returns {number} The floor of the number.
   * @example
   * let num = 4.5;
   * console.log(num.floor()); // Output: 4
   */
  floor(): number;

  /**
   * Returns the value of a number rounded to the nearest integer.
   * @returns {number} The rounded value of the number.
   * @example
   * let a = 4.7;
   * console.log(a.round()); // Output: 5
   * let b = 4.1;
   * console.log(b.round()); // Output: 4
   */
  round(): number;

  /**
   * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
   * The padding is applied from the start (left) of the current string.
   *
   * @param maxLength The length of the resulting string once the current string has been padded.
   *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
   *
   * @param fillString The string to pad the current string with.
   *        If this string is too long, it will be truncated and the left-most part will be applied.
   *        The default value for this parameter is " " (U+0020).
   */
  padStart(maxLength: number, fillString?: string): string;

  /**
   * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
   * The padding is applied from the end (right) of the current string.
   *
   * @param maxLength The length of the resulting string once the current string has been padded.
   *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
   *
   * @param fillString The string to pad the current string with.
   *        If this string is too long, it will be truncated and the left-most part will be applied.
   *        The default value for this parameter is " " (U+0020).
   */
  padEnd(maxLength: number, fillString?: string): string;
}

Number.prototype.ceil = function () {
  return Math.ceil(this.valueOf());
};

Number.prototype.abs = function () {
  return Math.abs(this.valueOf());
};

Number.prototype.floor = function () {
  return Math.floor(this.valueOf());
};

Number.prototype.round = function () {
  return Math.round(this.valueOf());
};

Number.prototype.padStart = function (maxLength: number, fillString?: string) {
  return this.valueOf().toString().padStart(maxLength, fillString);
};

Number.prototype.padEnd = function (maxLength: number, fillString?: string) {
  return this.valueOf().toString().padEnd(maxLength, fillString);
};
