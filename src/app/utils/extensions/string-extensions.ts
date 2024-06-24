interface String {
  /**
   * Truncate the string to the specified maximum length.
   * If the string is shorter than or equal to the maximum length, it returns the original string.
   * @param maxLength The maximum length of the truncated string.
   * @returns The truncated string.
   */
  truncate(maxLength: number): string;
}

// Implement the truncate method on the String prototype
String.prototype.truncate = function (maxLength: number) {
  return this.substring(0, maxLength);
};
