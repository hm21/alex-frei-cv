export function getTheme() {
  const localStorageTheme = localStorage.getItem('theme');

  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  const systemThemeIsDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return systemThemeIsDark ? 'dark' : 'light';
}
