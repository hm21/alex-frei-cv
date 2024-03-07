import { DOCUMENT, NgClass, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { NgxCountService } from 'ngx-count-animation';
import { NgxScrollAnimationsService } from 'ngx-scroll-animations';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { routeAnimation } from './animations/route-animations';
import { NavMobileMenuToggleBtnComponent } from './layout/header/components/nav-mobile-menu-toggle-btn/nav-mobile-menu-toggle-btn.component';
import { getTheme } from './layout/header/components/theme-switch/utils/theme-switch';
import { HeaderComponent } from './layout/header/header.component';
import { ModalManagerService } from './services/modal-manager.service';
import { ExtendedComponent } from './utils/extended-component';

@Component({
  selector: 'af-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavMobileMenuToggleBtnComponent,
    NgClass,
    NgStyle,
  ],
  providers: [NgxScrollAnimationsService, NgxCountService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeAnimation],
})
export class AppComponent
  extends ExtendedComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  /** Reference to the main HTML element of the component. */
  @ViewChild('mainRef') mainRef!: ElementRef<HTMLElement>;

  /** Reference to the modal container element. */
  @ViewChild('modalRef', { read: ViewContainerRef })
  modalRef!: ViewContainerRef;

  /** Flag to control the visibility of the mobile menu button. */
  public showMobileMenuBtn = true;

  /** Flag to control the visibility of the mobile menu. */
  public showMobileMenu = false;

  /** Flag indicating whether route animations should be used. */
  public useRouteAnimations = false;

  /** Angular context for children outlets. */
  private contexts = inject(ChildrenOutletContexts);

  /** Angular renderer for DOM manipulation. */
  private renderer = inject(Renderer2);

  /** Document object for accessing DOM elements. */
  private document = inject(DOCUMENT);

  /** Service for managing modals. */
  private modalManager = inject(ModalManagerService);

  override ngOnInit(): void {
    if (this.isBrowser) {
      this.renderer.setAttribute(
        this.document.querySelector('html'),
        'data-theme',
        getTheme(),
      );
      this.listenModalManager();
    }
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      if (environment.production) {
        console.log(
          '%cHello! Thanks for checking out my source code. Feel free to reach out if you have any questions or suggestions.',
          'color: #4FD168; font-family: roboto flex; background: black; padding:10px; border-radius:4px; font-size: 28px',
        );
      }

      this.analytics.websiteVisit();

      // Skip a frame so that the first time when the user opens the page will not be an animation bug.
      timer(1)
        .pipe(this.destroyPipe())
        .subscribe(() => (this.useRouteAnimations = true));
    }
  }

  ngOnDestroy(): void {
    this.modalRef.clear();
  }

  /**
   * Initializes the component.
   * Sets the theme based on the environment and listens for modal manager events.
   */
  private listenModalManager() {
    this.modalManager.modal$.pipe(this.destroyPipe()).subscribe((res) => {
      this.modalRef.clear();
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
