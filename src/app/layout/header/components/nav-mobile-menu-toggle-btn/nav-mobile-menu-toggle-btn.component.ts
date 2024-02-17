import { DOCUMENT, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
import { Subject, fromEvent, take, takeUntil } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-nav-mobile-menu-toggle-btn',
  templateUrl: './nav-mobile-menu-toggle-btn.component.html',
  styleUrls: ['./nav-mobile-menu-toggle-btn.component.scss'],
  imports: [NgClass],
  standalone: true,
})
export class NavMobileMenuToggleBtnComponent extends ExtendedComponent {
  @Input({ transform: booleanAttribute }) open = false;
  @Output() tap = new EventEmitter();

  private tempBackdrop?: HTMLDivElement;

  private reset$ = new Subject();

  private document = inject(DOCUMENT);

  public toggleMenu() {
    this.reset$.next(null);

    if (!this.open) {
      this.createBackdrop();
    } else {
      this.removeBackdrop();
    }

    this.tap.emit();
  }
  public closeMenu() {
    this.reset$.next(null);

    this.removeBackdrop();
  }

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
