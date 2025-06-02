import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';
import { distinctUntilChanged, map, startWith } from 'rxjs';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { NavItemsComponent } from './components/nav-items/nav-items.component';

@Component({
  selector: 'af-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MobileHeaderComponent,
    NavItemsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    class: 'af-header',
    '[class.shadow]': 'isScrolled()',
  },
})
export class HeaderComponent extends ExtendedComponent {
  protected isScrolled = signal(false);

  override ngOnInit(): void {
    this.initializePageScroll();
    super.ngOnInit();
  }

  private initializePageScroll() {
    if (this.isServer) return;

    this.screen.scroll$
      .pipe(
        startWith(null),
        map(() => {
          const scrollTop =
            this.window.scrollY || this.document.documentElement.scrollTop;
          return scrollTop > 1;
        }),
        distinctUntilChanged(),
      )
      .subscribe((isScrolled) => {
        this.isScrolled.set(isScrolled);
      });
  }
}
