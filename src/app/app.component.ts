import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { NgxCountService } from 'ngx-count-animation';
import { NgxScrollAnimationsService } from 'ngx-scroll-animations';
import { tap, timer } from 'rxjs';
import { routeAnimation } from './animations/route-animations';
import { getTheme } from './layout/header/components/theme-switch/utils/theme-switch';
import { HeaderComponent } from './layout/header/header.component';
import { ImagePreloaderService } from './services/image-manager/image-preloader.service';
import { LoggerService } from './services/logger/logger.service';
import { ModalManagerService } from './services/modal-manager/modal-manager.service';
import { ExtendedComponent } from './utils/extended-component';

@Component({
  selector: 'af-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  providers: [NgxScrollAnimationsService, NgxCountService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimation],
})
export class AppComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  /** Reference to the main HTML element of the component. */
  @ViewChild('mainRef') mainRef!: ElementRef<HTMLElement>;

  /** Reference to the modal container element. */
  @ViewChild('modalRef', { read: ViewContainerRef })
  modalRef!: ViewContainerRef;

  /** Flag indicating whether route animations should be used. */
  public useRouteAnimations = signal(false);

  /** Angular context for children outlets. */
  private contexts = inject(ChildrenOutletContexts);

  /** Service for managing modals. */
  private modalManager = inject(ModalManagerService);

  /** Preload images with ServiceWorker */
  private imagePreloader = inject(ImagePreloaderService);

  /** Injected logger service for logging operations. */
  private logger = inject(LoggerService);

  constructor() {
    super();
    afterNextRender(() => {
      this.afterAppIsStable();
    });
  }

  override ngOnInit(): void {
    this.renderer.setAttribute(
      this.document.querySelector('html'),
      'data-theme',
      !this.isBrowser ? 'light' : getTheme(),
    );
    this.listenModalManager();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.modalRef.clear();
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
   * Initializes the component.
   * Sets the theme based on the environment and listens for modal manager events.
   */
  private listenModalManager() {
    this.modalManager.modal$
      .pipe(
        this.destroyPipe(),
        tap(() => this.modalRef.clear()),
      )
      .subscribe((res) => {
        if (res.type === 'add') {
          this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
          this.modalRef.createComponent(res.component);
        } else {
          this.renderer.removeStyle(this.document.body, 'overflow');
        }
      });
  }

  /**
   * Retrieves animation data for route transitions.
   * @returns Animation data for route transitions.
   */
  public getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data.animation;
  }
}
