import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  viewChild,
  viewChildren,
  ViewContainerRef,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { filter } from 'rxjs';
import { NAV_ITEMS } from 'src/app/core/constants/nav-items.constants';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';

@Component({
  selector: 'af-nav-items',
  imports: [
    ThemeSwitchComponent,
    LanguageSwitchComponent,
    RouterLink,
    RouterLinkActive,
    QuicklinkDirective,
  ],
  templateUrl: './nav-items.component.html',
  styleUrl: './nav-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemsComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  private router = inject(Router);

  private links = viewChildren<ElementRef<HTMLAnchorElement>>('link');
  private indicator = viewChild.required<ElementRef<HTMLElement>>('indicator');

  /**
   * Reference to the container for navigation items.
   */
  private navItemsRef = viewChild.required('navItemsRef', {
    read: ViewContainerRef,
  });
  /**
   * Reference to the navigation item template.
   */
  private navItem = viewChild.required('navItem', {
    read: TemplateRef<any>,
  });

  override ngOnInit(): void {
    this.createNavItems();
    this.listenRouteChanges();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.navItemsRef()?.clear();
  }

  /**
   * Creates navigation items and adds them to the container.
   * @private
   */
  private createNavItems() {
    for (const item of NAV_ITEMS) {
      this.navItemsRef()!.createEmbeddedView(this.navItem(), item);
    }
  }

  private listenRouteChanges() {
    if (this.isServer) return;

    this.router.events
      .pipe(
        this.destroyPipe(),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;

        for (const elRef of this.links()) {
          const el = elRef.nativeElement;

          if (currentUrl.includes(el.id)) {
            const rect = el.getBoundingClientRect();

            const indicatorStyle = this.indicator().nativeElement.style;
            indicatorStyle.left = `${el.offsetLeft}px`;
            indicatorStyle.width = `${rect.width}px`;
          }
        }
      });
  }
}
