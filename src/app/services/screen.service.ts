import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { IS_BROWSER } from '../utils/global-tokens';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  public width = 0;
  public height = 0;

  public xs = false;
  public sm = false;
  public md = false;
  public lg = false;
  public xl = false;

  public changed = new Subject<{
    height: number;
    width: number;
  }>();

  public isBrowser = inject(IS_BROWSER);
  public document = inject(DOCUMENT);

  constructor() {
    this.calcScreenSize();
    if (this.isBrowser) {
      window.addEventListener('resize', () => {
        this.calcScreenSize();
      });
    }
  }

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
