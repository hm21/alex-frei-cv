import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { filter, map, startWith, Subscription } from 'rxjs';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'af-mobile-header',
  imports: [RouterLink, QuicklinkDirective],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHeaderComponent extends ExtendedComponent {
  private headerService = inject(HeaderService);
  private router = inject(Router);

  private nameRef = viewChild.required<ElementRef<HTMLElement>>('nameRef');

  private scrollSub?: Subscription;

  override ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
        startWith({ url: this.router.url } as NavigationEnd),
        map((event) => event.url),
        this.destroyPipe(),
      )
      .subscribe((url) => {
        if (url === '/about-me') {
          this.activateScrollAnimation();
        } else {
          this.resetAnimation();
        }
      });
  }

  private activateScrollAnimation() {
    const animationStartY = 80;
    const animationEndY = 150;
    let progress = 0;
    this.scrollSub?.unsubscribe();
    this.scrollSub = this.screen.scroll$
      .pipe(
        startWith(''),
        map(() => this.window?.scrollY ?? 0),
        filter((posY) => posY < animationEndY || progress < 1),
        this.destroyPipe(),
      )
      .subscribe((posY) => {
        const elRef = this.nameRef().nativeElement;
        const style = elRef.style;

        progress = (posY - animationStartY) / (animationEndY - animationStartY);
        const clamped = Math.min(1, Math.max(0, progress));

        style.opacity = clamped.toString();
        style.transform = `scale(${0.6 + 0.4 * clamped})`;
      });
  }

  private resetAnimation() {
    this.scrollSub?.unsubscribe();
    const elRef = this.nameRef().nativeElement;
    elRef.style.removeProperty('opacity');
    elRef.style.removeProperty('transform');
  }

  /**
   * Toggles the mobile menu.
   */
  public toggleMenu() {
    this.headerService.toggleMenu();
  }

  /**
   * Closes the mobile menu.
   */
  public closeMenu() {
    this.headerService.closeMenu();
  }
}
