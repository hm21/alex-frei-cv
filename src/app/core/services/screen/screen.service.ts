import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  fromEvent,
  map,
  shareReplay,
  startWith,
  throttleTime,
} from 'rxjs';
import { IS_BROWSER } from '../../providers/platform.provider';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  public scroll$!: Observable<Event>;
  public resize$!: Observable<Event>;

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
    const windowElement = this.isBrowser ? window : this.document;
    this.resize$ = fromEvent(windowElement, 'resize').pipe(
      throttleTime(50, undefined, { leading: true, trailing: true }),
      shareReplay(1),
    );
    this.resize$
      .pipe(
        startWith(null),
        map(() => windowElement),
        map((el) => {
          if (el instanceof Document) {
            return {
              width: el.documentElement.clientWidth,
              height: el.documentElement.clientHeight,
            };
          } else {
            return {
              width: el.innerWidth,
              height: el.innerHeight,
            };
          }
        }),
      )
      .subscribe((size) => {
        this.calcScreenSize(size);
      });

    this.scroll$ = fromEvent(this.document, 'scroll').pipe(
      throttleTime(50, undefined, { leading: true, trailing: true }),
      shareReplay(1),
    );
  }

  /**
   * Calculates the screen size and updates the corresponding properties.
   */
  public calcScreenSize(size: { width: number; height: number }) {
    this.width = size.width;
    this.height = size.height;

    this.xs = false;
    this.sm = false;
    this.md = false;
    this.lg = false;
    this.xl = false;

    if (size.width > 1300) {
      this.xl = true;
    } else if (size.width > 990) {
      this.lg = true;
    } else if (size.width > 768) {
      this.md = true;
    } else if (size.width > 576) {
      this.sm = true;
    } else {
      this.xs = true;
    }
  }
}
