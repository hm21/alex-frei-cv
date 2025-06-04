import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private document = inject(DOCUMENT);

  /** Flag to control the visibility of the mobile menu. */
  public showMobileMenu = signal(false);

  constructor() {}

  public toggleMenu() {
    this.showMobileMenu.update((value) => !value);
    this.updateScrollbar();
  }

  /** Closes the mobile menu. */
  public closeMenu() {
    this.showMobileMenu.set(false);
    this.updateScrollbar();
  }

  private updateScrollbar() {
    const style = this.document.body.style;
    if (this.showMobileMenu()) {
      style.overflow = 'hidden';
    } else {
      style.removeProperty('overflow');
    }
  }
}
