import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { IS_BROWSER } from '../utils/global-tokens';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  /**
   * The width of the screen.
   */
  public width = 0;
  /**
   * The height of the screen.
   */
  public height = 0;
  
  /**
   * Indicates whether the screen size is extra small.
   */
  public xs = false;
  /**
   * Indicates whether the screen size is small.
   */
  public sm = false;
  /**
   * Indicates whether the screen size is medium.
   */
  public md = false;
  /**
   * Indicates whether the screen size is large.
   */
  public lg = false;
  /**
   * Indicates whether the screen size is extra large.
   */
  public xl = false;
  /**
   * Subject for emitting screen size changes.
   */
  public changed = new Subject<{
    height: number;
    width: number;
  }>();
  /**
   * Indicates whether the application is running in a browser.
   */
  public isBrowser = inject(IS_BROWSER);
  /**
   * Reference to the document object.
   */
  public document = inject(DOCUMENT);

  /**
   * Initializes the service.
   */
  constructor() {
    this.calcScreenSize();
    if (this.isBrowser) {
      window.addEventListener('resize', () => {
        this.calcScreenSize();
      });
    }
  }

  /**
   * Calculates the screen size and updates the corresponding properties.
   */
  public calcScreenSize() {
    this.height = this.isBrowser
      ? window.innerHeight
      : this.document.body.clientHeight;
    this.width = this.isBrowser
      ? window.innerWidth
      : this.document.body.clientWidth;

    this.xs = false;
    this.sm = false;
    this.md = false;
    this.lg = false;
    this.xl = false;

    if (this.width > 1300) {
      this.xl = true;
    } else if (this.width > 990) {
      this.lg = true;
    } else if (this.width > 768) {
      this.md = true;
    } else if (this.width > 576) {
      this.sm = true;
    } else {
      this.xs = true;
    }
    this.changed.next({
      height: this.height,
      width: this.width,
    });
  }
}