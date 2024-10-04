import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxImageHeroDirective } from 'ngx-image-hero';
import { QuicklinkDirective } from 'ngx-quicklink';
import { debounceTime, fromEvent } from 'rxjs';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { TooltipDirective } from 'src/app/shared/tooltip/tooltip.directive';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { LanguageSwitchComponent } from '../header/components/language-switch/language-switch.component';
import { ThemeSwitchComponent } from '../header/components/theme-switch/theme-switch.component';
import { HeaderComponent } from '../header/header.component';
import { navItems } from '../header/utils/nav-items';

@Component({
  selector: 'af-profile-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    QuicklinkDirective,
    
    TooltipDirective,
    ThemeSwitchComponent,
    LanguageSwitchComponent,
    
    NgxImageHeroDirective,
  ],
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.scss',
})
export class ProfileBannerComponent
  extends ExtendedComponent
  implements OnInit
{
  /** Handles HTTP requests */
  private http = inject(HttpClient);

  /** Manages header component */
  private header = inject(HeaderComponent);

  /** Displays toast notifications */
  private toast = inject(ToastService);

  /**
   * Reference to the container for navigation items.
   */
  private navItemsRef = viewChild.required('navItemsRef', {
    read: ViewContainerRef,
  });
  /**
   * Reference to the container for language switch component.
   */
  private languageContainerRef = viewChild.required('languageContainerRef', {
    read: ViewContainerRef,
  });
  /**
   * Reference to the container for theme switch component.
   */
  private themeContainerRef = viewChild.required('themeContainerRef', {
    read: ViewContainerRef,
  });
  /**
   * Reference to the navigation item template.
   */
  private navItem = viewChild.required('navItem', {
    read: TemplateRef<any>,
  });

  override ngOnInit(): void {
    this.listenScreenResize();
    this.checkMobileMenuItems();
    super.ngOnInit();
  }

  public closeSideMenu() {
    this.header.toggleBtn()?.closeMenu();
  }

  /**
   * Listens for screen resize events.
   * @private
   */
  private listenScreenResize() {
    if (!this.isBrowser) return;
    fromEvent(window, 'resize')
      .pipe(this.destroyPipe(), debounceTime(50))
      .subscribe(() => {
        this.checkMobileMenuItems();
      });
  }

  /**
   * Creates navigation items for mobile view and adds language and theme switch components.
   * @private
   */
  private createNavItems() {
    navItems.forEach((el) => {
      this.navItemsRef().createEmbeddedView(this.navItem(), el);
    });
  }

  /**
   * Checks if the mobile menu items need to be displayed based on the screen size.
   * @private
   */
  private checkMobileMenuItems() {
    if (!this.isBrowser) return;

    if (window.innerWidth <= 1024 || window.innerHeight <= 489) {
      if (this.navItemsRef().length <= 0) this.createNavItems();
      if (this.languageContainerRef().length === 0) {
        this.languageContainerRef().createComponent(LanguageSwitchComponent);
      }
      if (this.themeContainerRef().length === 0) {
        const ref =
          this.themeContainerRef().createComponent(ThemeSwitchComponent);
        ref.instance.elRef.nativeElement.style.marginLeft = 'auto';
      }
    } else {
      this.navItemsRef().clear();
      this.languageContainerRef().clear();
      this.themeContainerRef().clear();
    }
  }

  /**
   * Downloads the resume in pdf format.
   * @public
   */
  public downloadPdf() {
    const url = 'assets/docs/alex_frei_cv.pdf';
    const filename = 'alex_frei_cv.pdf';

    this.http
      .get(url, { responseType: 'blob' })
      .pipe(this.destroyPipe())
      .subscribe({
        next: (blob: Blob) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          this.toast.success($localize`Download Successful`);
        },
        error: (err) => {
          this.logger.error(err);
          this.toast.error($localize`Download Failed`);
        },
      });
  }
}
