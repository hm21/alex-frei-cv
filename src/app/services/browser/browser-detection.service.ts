// browser-detection.service.ts

import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable()
export class BrowserDetectionService {
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const browserClass = this.detectBrowser();
      document.documentElement.classList.add(`browser-${browserClass}`);
    }
  }

  /** Function to detect the browser */
  public detectBrowser() {
    const userAgent = navigator.userAgent;
    if (/msie\s|trident\//i.test(userAgent)) {
      return 'ie';
    } else if (
      /chrome|chromium|crios/i.test(userAgent) &&
      !/edge|edgios|opr\//i.test(userAgent)
    ) {
      return 'chrome';
    } else if (/firefox|fxios/i.test(userAgent)) {
      return 'firefox';
    } else if (
      /safari/i.test(userAgent) &&
      !/chrome|crios|opr\//i.test(userAgent)
    ) {
      return 'safari';
    } else if (/opr\//i.test(userAgent)) {
      return 'opera';
    } else if (/edg/i.test(userAgent)) {
      return 'edge';
    }
    return 'unknown';
  }
}
