import './date.extensions';

describe('Date Extensions', () => {
  let date: Date;

  beforeEach(() => {
    date = new Date(Date.UTC(2025, 2, 5, 4, 5, 6, 123)); // Fixed date for testing in UTC
  });

  it('should return the correct year', () => {
    expect(date.year).toBe(date.getFullYear());
  });

  it('should return the correct month', () => {
    expect(date.month).toBe(date.getMonth());
  });

  it('should return the correct day', () => {
    expect(date.day).toBe(date.getDate());
  });

  it('should return the correct hours', () => {
    expect(date.hours).toBe(date.getHours());
  });

  it('should return the correct minutes', () => {
    expect(date.minutes).toBe(date.getMinutes());
  });

  it('should return the correct seconds', () => {
    expect(date.seconds).toBe(date.getSeconds());
  });

  it('should return the correct milliseconds', () => {
    expect(date.milliseconds).toBe(date.getMilliseconds());
  });

  it('should return the correct Monday-based weekday', () => {
    expect(date.getMondayBasedWeekday()).toBe(2); // Wednesday is 2 when Monday is 0
  });

  it('should return the correct formatted month', () => {
    expect(date.getMonthFormatted()).toBe(
      (date.getMonth() + 1).toString().padStart(2, '0'),
    );
  });

  it('should return the correct formatted day', () => {
    expect(date.getDateFormatted()).toBe(
      date.getDate().toString().padStart(2, '0'),
    );
  });

  it('should return the correct formatted hours', () => {
    expect(date.getHoursFormatted()).toBe(
      date.getHours().toString().padStart(2, '0'),
    );
  });

  it('should return the correct formatted minutes', () => {
    expect(date.getMinutesFormatted()).toBe(
      date.getMinutes().toString().padStart(2, '0'),
    );
  });

  it('should return the correct formatted seconds', () => {
    expect(date.getSecondsFormatted()).toBe(
      date.getSeconds().toString().padStart(2, '0'),
    );
  });

  it('should return the correct formatted milliseconds', () => {
    expect(date.getMillisecondsFormatted()).toBe(
      date.getMilliseconds().toString().padStart(2, '0'),
    );
  });
});
