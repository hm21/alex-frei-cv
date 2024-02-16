import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { NgxCountService } from 'ngx-count-animation';
import { NgxScrollAnimationsService } from 'ngx-scroll-animations';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfileBannerComponent } from './layout/profile-banner/profile-banner.component';
import { getTheme } from './layout/profile-banner/theme-switch/utils/theme-switch';
import { SideNavbarComponent } from './layout/side-navbar/side-navbar.component';
import { ExtendedComponent } from './utils/extended-component';

@Component({
  selector: 'af-root',
  standalone: true,
  imports: [RouterOutlet, SideNavbarComponent, ProfileBannerComponent],
  providers: [NgxScrollAnimationsService, NgxCountService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition(
        '* <=> *',
        [
          style({ opacity: 0 }),
          animate('{{duration}} ease', style({ opacity: 1 })),
        ],
        { params: { duration: '200ms' } },
      ),
    ]),
  ],
})
export class AppComponent
  extends ExtendedComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('mainRef') mainRef!: ElementRef<HTMLElement>;

  public useRouteAnimations = false;

  private contexts = inject(ChildrenOutletContexts);
  private renderer = inject(Renderer2);
  private scrollManager = inject(NgxScrollAnimationsService);
  private countManager = inject(NgxCountService);

  constructor(@Inject(DOCUMENT) private document: Document) {
    super();
  }

  override ngOnInit(): void {
    if (this.isBrowser) {
      this.renderer.setAttribute(
        this.document.querySelector('html'),
        'data-theme',
        getTheme(),
      );
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

    this.scrollManager.overrideScrollListener(this.mainRef.nativeElement);
    this.countManager.overrideScrollListener(this.mainRef.nativeElement);

    if (this.isBrowser)
      // Skip a frame so that the first time when the user opens the page will not be an animation bug.
      timer(1)
        .pipe(this.destroyPipe())
        .subscribe(() => (this.useRouteAnimations = true));
  }

  public getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data.animation;
  }
}
