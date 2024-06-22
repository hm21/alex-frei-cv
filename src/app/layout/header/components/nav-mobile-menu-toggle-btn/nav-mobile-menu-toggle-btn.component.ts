import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute
} from '@angular/core';
import { Subject, fromEvent, take, takeUntil } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-nav-mobile-menu-toggle-btn',
  templateUrl: './nav-mobile-menu-toggle-btn.component.html',
  styleUrls: ['./nav-mobile-menu-toggle-btn.component.scss'],
  imports: [NgClass],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMobileMenuToggleBtnComponent extends ExtendedComponent {
  /**
   * Indicates whether the mobile menu is open.
   */
  @Input({ transform: booleanAttribute }) open = false;
  /**
   * Event emitter for tap event.
   */
  @Output() tap = new EventEmitter();

  /**
   * Temporary backdrop reference.
   * @private
   */
  private tempBackdrop?: HTMLDivElement;

  /**
   * Subject for resetting.
   */
  private reset$ = new Subject();

  /**
   * Toggles the mobile menu.
   */
  public toggleMenu() {
    this.reset$.next(null);

    if (!this.open) {
      this.createBackdrop();
    } else {
      this.removeBackdrop();
    }

    this.tap.emit();
  }

  /**
   * Closes the mobile menu.
   */
  public closeMenu() {
    this.reset$.next(null);

    this.removeBackdrop();
    
    this.tap.emit();
  }

  /**
   * Creates the backdrop for the mobile menu.
   * @private
   */
  private createBackdrop() {
    const backdrop = this.document.createElement('div');
    backdrop.id = 'sidebar-backdrop';
    backdrop.role = 'dialog';
    backdrop.tabIndex = -1;

    backdrop.style.top = '0px';
    backdrop.style.left = '0px';
    backdrop.style.right = '0px';
    backdrop.style.bottom = '0px';
    backdrop.style.position = 'fixed';

    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.33)';
    backdrop.style.zIndex = '999';

    backdrop.classList.add('fade-in');

    fromEvent(backdrop, 'click')
      .pipe(this.destroyPipe(), take(1), takeUntil(this.reset$))
      .subscribe(() => {
        this.toggleMenu();
      });

    this.document.body.appendChild(backdrop);
    this.tempBackdrop = backdrop;
  }

  /**
   * Removes the backdrop for the mobile menu.
   * @private
   */
  private removeBackdrop() {
    if (this.tempBackdrop) {
      this.tempBackdrop!.classList.replace('fade-in', 'fade-out');
      fromEvent(this.tempBackdrop!, 'animationend')
        .pipe(this.destroyPipe())
        .subscribe(() => {
          this.tempBackdrop?.remove();
        });
    }
  }
}
