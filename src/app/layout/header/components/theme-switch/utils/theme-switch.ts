/**
 * Gets the current theme from local storage or returns 'light' if not found.
 * @returns {('light' | 'dark')} The current theme.
 */
export function getTheme(): 'light' | 'dark' {
  const localStorageTheme = localStorage.getItem('theme') as
    | 'light'
    | 'dark'
    | undefined
    | null;

  if (localStorageTheme) {
    return localStorageTheme;
  }

  return 'light';
  /* Optional auto detect the design
  
   const systemThemeIsDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return systemThemeIsDark ? 'dark' : 'light'; */
}
