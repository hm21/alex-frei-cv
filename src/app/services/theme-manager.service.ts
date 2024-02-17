import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { getTheme } from '../layout/header/components/theme-switch/utils/theme-switch';
import { IS_BROWSER } from '../utils/global-tokens';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  public isDarkMode = false;

  private document = inject(DOCUMENT);
  public isBrowser = inject(IS_BROWSER);

  constructor() {
    if (this.isBrowser) {
      this.isDarkMode = getTheme() === 'dark';
    }
  }

  public toggleTheme() {
    const theme = this.isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    this.document.documentElement.setAttribute('data-theme', theme);
  }
}
