import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { getTheme } from '../layout/header/components/theme-switch/utils/theme-switch';
import { IS_BROWSER } from '../utils/global-tokens';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  /**
   * Indicates whether dark mode is enabled.
   */
  public isDarkMode = signal(false);

  /**
   * Reference to the document object.
   */
  private document = inject(DOCUMENT);

  /**
   * Indicates whether the application is running in a browser.
   */
  public isBrowser = inject(IS_BROWSER);
  /**
   * Emits a boolean value whenever the theme changes.
   * The emitted value is `true` if dark mode is enabled, `false` otherwise.
   */
  public changed$ = new Subject<boolean>();

  constructor() {
    if (this.isBrowser) {
      this.isDarkMode.set(getTheme() === 'dark');
    }
  }

  /**
   * Toggles between light and dark themes.
   */
  public toggleTheme() {
    const theme = this.isDarkMode() ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    this.document.documentElement.setAttribute('data-theme', theme);
    this.changed$.next(this.isDarkMode());
  }
}
