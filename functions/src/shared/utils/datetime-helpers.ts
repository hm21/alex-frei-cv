/**
 * Generates a date string in the format YYYY-M-D-H (e.g. 2025-6-29-14).
 *
 * @returns Current hour path string
 */
export function getCurrentHourKey() {
  const dt = new Date();
  return `${dt.year}-${dt.month}-${dt.day}-${dt.hours}`;
}
