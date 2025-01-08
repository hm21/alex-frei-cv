// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Date {
  /**
   * Returns the year part of the date.
   * @returns {number} The year.
   * @example
   * let date = new Date();
   * console.log(date.year); // Output: current year
   */
  year: number;

  /**
   * Returns the month part of the date (0-11).
   * @returns {number} The month (0-11).
   * @example
   * let date = new Date();
   * console.log(date.month); // Output: current month (0-11)
   */
  month: number;

  /**
   * Returns the day of the month (1-31).
   * @returns {number} The day of the month (1-31).
   * @example
   * let date = new Date();
   * console.log(date.day); // Output: current day of the month (1-31)
   */
  day: number;

  /**
   * Returns the hours part of the time (0-23).
   * @returns {number} The hours (0-23).
   * @example
   * let date = new Date();
   * console.log(date.hours); // Output: current hours (0-23)
   */
  hours: number;

  /**
   * Returns the minutes part of the time (0-59).
   * @returns {number} The minutes (0-59).
   * @example
   * let date = new Date();
   * console.log(date.minutes); // Output: current minutes (0-59)
   */
  minutes: number;

  /**
   * Returns the seconds part of the time (0-59).
   * @returns {number} The seconds (0-59).
   * @example
   * let date = new Date();
   * console.log(date.seconds); // Output: current seconds (0-59)
   */
  seconds: number;

  /**
   * Returns the milliseconds part of the time (0-999).
   * @returns {number} The milliseconds (0-999).
   * @example
   * let date = new Date();
   * console.log(date.milliseconds); // Output: current milliseconds (0-999)
   */
  milliseconds: number;
  /**
   * Returns the weekday with Monday as 0 and Sunday as 6.
   * @returns {number} The weekday with Monday as 0 and Sunday as 6.
   */
  getMondayBasedWeekday(): number;
  /**
   * Returns the month formatted as a two-digit string (1-12).
   * @returns {string} The month formatted as a two-digit string.
   */
  getMonthFormatted(): string;
  /**
   * Returns the day of the month formatted as a two-digit string.
   * @returns {string} The day of the month formatted as a two-digit string.
   */
  getDateFormatted(): string;
  /**
   * Returns the hours formatted as a two-digit string.
   * @returns {string} The hours formatted as a two-digit string.
   */
  getHoursFormatted(): string;
  /**
   * Returns the minutes formatted as a two-digit string.
   * @returns {string} The minutes formatted as a two-digit string.
   */
  getMinutesFormatted(): string;
  /**
   * Returns the seconds formatted as a two-digit string.
   * @returns {string} The seconds formatted as a two-digit string.
   */
  getSecondsFormatted(): string;
  /**
   * Returns the milliseconds formatted as a three-digit string.
   * @returns {string} The milliseconds formatted as a three-digit string.
   */
  getMillisecondsFormatted(): string;
}

Object.defineProperty(Date.prototype, 'year', {
  get: function () {
    return this.getFullYear();
  },
  enumerable: false,
  configurable: true,
});
Object.defineProperty(Date.prototype, 'month', {
  get: function () {
    return this.getMonth();
  },
  enumerable: false,
  configurable: true,
});
Object.defineProperty(Date.prototype, 'day', {
  get: function () {
    return this.getDate();
  },
  enumerable: false,
  configurable: true,
});
Object.defineProperty(Date.prototype, 'hours', {
  get: function () {
    return this.getHours();
  },
  enumerable: false,
  configurable: true,
});
Object.defineProperty(Date.prototype, 'minutes', {
  get: function () {
    return this.getMinutes();
  },
  enumerable: false,
  configurable: true,
});
Object.defineProperty(Date.prototype, 'seconds', {
  get: function () {
    return this.getSeconds();
  },
  enumerable: false,
  configurable: true,
});
Object.defineProperty(Date.prototype, 'milliseconds', {
  get: function () {
    return this.getMilliseconds();
  },
  enumerable: false,
  configurable: true,
});

Date.prototype.getMondayBasedWeekday = function (): number {
  const getMondayBasedWeekday = (day: number): number => {
    return (day + 6) % 7; // Adjust so Monday is 0 and Sunday is 6
  };

  return getMondayBasedWeekday(this.getDay());
};

Date.prototype.getMonthFormatted = function (): string {
  return (this.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to getMonth() to make it 1-12
};

Date.prototype.getDateFormatted = function (): string {
  return this.getDate().toString().padStart(2, '0');
};

Date.prototype.getHoursFormatted = function (): string {
  return this.getHours().toString().padStart(2, '0');
};

Date.prototype.getMinutesFormatted = function (): string {
  return this.getMinutes().toString().padStart(2, '0');
};

Date.prototype.getSecondsFormatted = function (): string {
  return this.getSeconds().toString().padStart(2, '0');
};

Date.prototype.getMillisecondsFormatted = function (): string {
  return this.getMilliseconds().toString().padStart(3, '0');
};
