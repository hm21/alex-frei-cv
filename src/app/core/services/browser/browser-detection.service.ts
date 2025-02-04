import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable()
export class BrowserDetectionService {
  private platformId = inject(PLATFORM_ID);

  private _browserName!: string;
  public get browserName() {
    return this._browserName;
  }
  public set browserName(value: string) {
    this._browserName = value;
  }

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.detectBrowser();
      document.documentElement.classList.add(`browser-${this.browserName}`);
    } else {
      this.browserName = 'server';
    }
  }

  /** Function to detect the browser */
  public detectBrowser() {
    const userAgent = navigator.userAgent;
    if (/msie\s|trident\//i.test(userAgent)) {
      this.browserName = 'ie';
    } else if (
      /chrome|chromium|crios/i.test(userAgent) &&
      !/edge|edgios|opr\//i.test(userAgent)
    ) {
      this.browserName = 'chrome';
    } else if (/firefox|fxios/i.test(userAgent)) {
      this.browserName = 'firefox';
    } else if (
      /safari/i.test(userAgent) &&
      !/chrome|crios|opr\//i.test(userAgent)
    ) {
      this.browserName = 'safari';
    } else if (/opr\//i.test(userAgent)) {
      this.browserName = 'opera';
    } else if (/edg/i.test(userAgent)) {
      this.browserName = 'edge';
    }else{
      this.browserName = 'unknown';
    }

    return this.browserName;
  }
}
