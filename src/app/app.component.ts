import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { timer } from 'rxjs';
import { routeAnimation } from './animations/route-animations';
import { getTheme } from './layout/header/components/theme-switch/utils/theme-switch';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserDetectionService } from './services/browser/browser-detection.service';
import { ImagePreloaderService } from './services/image-manager/image-preloader.service';
import { ModalService } from './shared/modal/modal.service';
import { provideModal } from './shared/modal/utils/modal.provider';
import { ToastService } from './shared/toast/toast.service';
import { provideToast } from './shared/toast/utils/toast.provider';
import { TooltipService } from './shared/tooltip/tooltip.service';
import { provideTooltip } from './shared/tooltip/utils/tooltip.provider';
import { ExtendedComponent } from './utils/extended-component';

@Component({
  selector: 'af-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
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
  /** Flag indicating whether route animations should be used. */
  public useRouteAnimations = signal(false);

  /** Angular context for children outlets. */
  private contexts = inject(ChildrenOutletContexts);

  /** Preload images with ServiceWorker */
  private imagePreloader = inject(ImagePreloaderService);

  /** Manages modals */
  protected modalManager = inject(ModalService);

  /** Displays toast notifications */
  protected toastService = inject(ToastService);

  /** Manages tooltips */
  protected tooltipService = inject(TooltipService);

  /** Detect the browser type */
  protected browserDetectionService = inject(BrowserDetectionService);


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

    super.ngOnInit();
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
}
