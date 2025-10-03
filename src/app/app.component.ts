import { ViewportScroller } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit
} from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { RoutePageAnimationDirective } from './core/directives/route-page-animation.directive';
import { BrowserDetectionService } from './core/services/browser/browser-detection.service';
import { ImageFormatSupportService } from './core/services/image-manager/image-format-support.service';
import { FooterComponent } from './layout/footer/footer.component';
import { getTheme } from './layout/header/components/theme-switch/utils/theme-switch.utils';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderService } from './layout/header/services/header.service';
import { ProfileBannerComponent } from './layout/profile-banner/profile-banner.component';
import { ExtendedComponent } from './shared/components/extended-component';
import { provideModal } from './ui/modal/utils/modal.provider';
import { provideToast } from './ui/toast/providers/toast.provider';
import { provideTooltip } from './ui/tooltip/providers/tooltip.provider';

@Component({
  selector: 'af-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ProfileBannerComponent,
    FooterComponent,
    RoutePageAnimationDirective,
  ],
  providers: [
    provideModal(),
    provideToast(),
    provideTooltip(),
    BrowserDetectionService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends ExtendedComponent implements OnInit {
  /** Angular context for children outlets. */
  private contexts = inject(ChildrenOutletContexts);

  /** Detect the browser type */
  protected browserDetectionService = inject(BrowserDetectionService);
  protected imageFormat = inject(ImageFormatSupportService);
  private headerService = inject(HeaderService);
  private viewportScroller = inject(ViewportScroller);

  public showMobileMenu = computed(() => this.headerService.showMobileMenu());

  constructor() {
    super();
    afterNextRender(() => {
      this.afterAppIsStable();
    });
  }

  override ngOnInit(): void {
    // Sets the default application theme.
    this.document
      .querySelector('html')
      ?.setAttribute('data-theme', this.isBrowser ? getTheme() : 'light');

    if (this.isBrowser) {
      // Set offset for fixed header
      this.viewportScroller.setOffset([0, 60]);
    }

    super.ngOnInit();
  }

  private afterAppIsStable(): void {
    if (this.isBrowser) {
      // Log website visit
      this.analytics.websiteVisit();
    }
    // Display a message in the browser console for visiting users.
    const welcomeMsg =
      'Hello! Thanks for checking out my source code. Feel free to reach out if you have any questions or suggestions.';

    this.logger.user(welcomeMsg).print();
  }

  public closeSideMenu() {
    this.headerService.closeMenu();
  }
}
