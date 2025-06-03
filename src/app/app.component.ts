import { ViewportScroller } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { filter, timer } from 'rxjs';
import { BrowserDetectionService } from './core/services/browser/browser-detection.service';
import { ImageFormatSupportService } from './core/services/image-manager/image-format-support.service';
import { ImagePreloaderService } from './core/services/image-manager/image-preloader.service';
import { FooterComponent } from './layout/footer/footer.component';
import { getTheme } from './layout/header/components/theme-switch/utils/theme-switch';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderService } from './layout/header/services/header.service';
import { ProfileBannerComponent } from './layout/profile-banner/profile-banner.component';
import { routeAnimation } from './shared/animations/route-animations';
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
  animations: [routeAnimation],
})
export class AppComponent extends ExtendedComponent implements OnInit {
  /** Angular context for children outlets. */
  private contexts = inject(ChildrenOutletContexts);

  /** Preload images with ServiceWorker */
  private imagePreloader = inject(ImagePreloaderService);

  /** Detect the browser type */
  protected browserDetectionService = inject(BrowserDetectionService);
  protected imageFormat = inject(ImageFormatSupportService);
  private headerService = inject(HeaderService);
  private viewportScroller = inject(ViewportScroller);

  private mainRef = viewChild.required<ElementRef<HTMLElement>>('mainRef');

  /** Flag indicating whether route animations should be used. */
  public useRouteAnimations = signal(false);

  public showMobileMenu = computed(() => this.headerService.showMobileMenu());

  private readonly accentPath = 'assets/img/background/bg-blue-blur';

  constructor() {
    super();
    afterNextRender(() => {
      this.afterAppIsStable();
    });
  }

  override ngOnInit(): void {
    /**
     * Sets the default application theme.
     * If using Server-Side Rendering (SSR) and not just pre-rendering, we can set a cookie
     * to ensure the correct theme (light or dark) is applied directly on the server-side.
     * On the client side (browser), we dynamically fetch and apply the user’s theme preference.
     */
    this.document
      .querySelector('html')
      ?.setAttribute('data-theme', this.isBrowser ? getTheme() : 'light');

    this.checkBackgroundSupport();
    if (this.isBrowser) {
      this.viewportScroller.setOffset([0, 60]); // Set offset for fixed header
    }

    super.ngOnInit();
  }

  private checkBackgroundSupport() {
    this.imageFormat.supportCheck
      .pipe(
        filter(() => !this.imageFormat.isAvifSupported),
        this.destroyPipe(),
      )
      .subscribe(() => {
        const alternativeFormat = this.imageFormat.isWebpSupported
          ? 'webp'
          : 'jpeg';

        this.mainRef().nativeElement.style.backgroundImage = `url("${this.accentPath}.${alternativeFormat}")`;
      });
  }

  private afterAppIsStable(): void {
    if (this.isBrowser) {
      // Make sure that the page animation will not fail when the page is opened for the first time.
      timer(1).subscribe(() => this.useRouteAnimations.set(true));
      // Preload all global images
      this.imagePreloader.startPreloadGlobalImages();
      // Log website visit
      this.analytics.websiteVisit();
    }
    // Display a message in the browser console for visiting users.
    const welcomeMsg =
      'Hello! Thanks for checking out my source code. Feel free to reach out if you have any questions or suggestions.';

    this.logger.user(welcomeMsg).print();
  }

  /**
   * Retrieves animation data for route transitions.
   * @returns Animation data for route transitions.
   */
  public getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data.animation;
  }

  public closeSideMenu() {
    this.headerService.closeMenu();
  }
}
