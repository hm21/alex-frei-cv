interface Array<T> {
  /** Method to get the first item of the array */
  getFirstItem(): T | undefined;
  /** Method to get the last item of the array */
  getLastItem(): T | undefined;
  /** Method to update the last item of the array */
  updateLastItem(value: T): void;
  /** Method to remove duplicates in the array */
  removeDuplicates(): Array<T>;
  /**
   * Converts an array of strings into a numbered list.
   * @returns {string} The formatted numbered list as a string.
   */
  toNumberedList(): string;
  /**
   * Converts an array of strings into a multiple line list.
   * @returns {string} The formatted list as a string.
   */
  toMultipleLineList(): string;
}

Array.prototype.getFirstItem = function <T>(): T | undefined {
  return this.length > 0 ? this[0] : undefined;
};

Array.prototype.getLastItem = function <T>(): T | undefined {
  return this.length > 0 ? this[this.length - 1] : undefined;
};

Array.prototype.updateLastItem = function <T>(value: T): void {
  if (this.length > 0) {
    this[this.length - 1] = value;
  } else {
    throw new Error('Cannot update last item of an empty array');
  }
};

Array.prototype.removeDuplicates = function <T>(): Array<T> {
  return Array.from(new Set(this));
};

Array.prototype.toNumberedList = function (): string {
  if (!this.every((item) => typeof item === 'string')) {
    throw new Error('All items in the array must be strings.');
  }

  return this.map((el, index) => `${index + 1}. ${el}`).join('\n') + '\n';
};

Array.prototype.toMultipleLineList = function (): string {
  if (!this.every((item) => typeof item === 'string')) {
    throw new Error('All items in the array must be strings.');
  }

  return this.join('\n') + '\n';
};
