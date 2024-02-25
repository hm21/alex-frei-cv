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
import { slideInAnimation } from './animations/route-animations';
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
  animations: [slideInAnimation],
})
export class AppComponent
  extends ExtendedComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('mainRef') mainRef!: ElementRef<HTMLElement>;
  @ViewChild('modalRef', { read: ViewContainerRef })
  modalRef!: ViewContainerRef;

  public showMobileMenuBtn = true;
  public showMobileMenu = false;
  public useRouteAnimations = false;

  private contexts = inject(ChildrenOutletContexts);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
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
    if (this.isBrowser && environment.production) {
      console.log(
        '%cHello! Thanks for checking out my source code. Feel free to reach out if you have any questions or suggestions.',
        'color: #4FD168; font-family: roboto flex; background: black; padding:10px; border-radius:4px; font-size: 28px',
      );
    }

    this.analytics.websiteVisit();

    if (this.isBrowser)
      // Skip a frame so that the first time when the user opens the page will not be an animation bug.
      timer(1)
        .pipe(this.destroyPipe())
        .subscribe(() => (this.useRouteAnimations = true));
  }

  ngOnDestroy(): void {
    this.modalRef.clear();
  }

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

  public getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data.animation;
  }
}
