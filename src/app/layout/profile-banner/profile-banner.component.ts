import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxImageHeroModule } from 'ngx-image-hero';
import { debounceTime, fromEvent } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { LanguageSwitchComponent } from '../header/components/language-switch/language-switch.component';
import { ThemeSwitchComponent } from '../header/components/theme-switch/theme-switch.component';
import { navItems } from '../header/utils/nav-items';

@Component({
  selector: 'af-profile-banner',
  standalone: true,
  imports: [
    ThemeSwitchComponent,
    LanguageSwitchComponent,
    RouterLink,
    RouterLinkActive,
    NgxImageHeroModule,
  ],
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.scss',
})
export class ProfileBannerComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  /**
   * Event emitter for closing the side menu.
   */
  @Output() closeSideMenu = new EventEmitter<boolean>();
  /**
   * Event emitter for toggling the hero section.
   */
  @Output() toggleHero = new EventEmitter<boolean>();

  /**
   * Reference to the container for navigation items.
   * @type {ViewContainerRef}
   */
  @ViewChild('navItemsRef', { read: ViewContainerRef, static: true })
  navItemsRef!: ViewContainerRef;
  /**
   * Reference to the container for language switch component.
   * @type {ViewContainerRef}
   */
  @ViewChild('languageContainerRef', { read: ViewContainerRef, static: true })
  languageContainerRef!: ViewContainerRef;
  /**
   * Reference to the container for theme switch component.
   * @type {ViewContainerRef}
   */
  @ViewChild('themeContainerRef', { read: ViewContainerRef, static: true })
  themeContainerRef!: ViewContainerRef;
  /**
   * Reference to the navigation item template.
   * @type {TemplateRef<any>}
   */
  @ViewChild('navItem', { read: TemplateRef, static: true })
  navItem!: TemplateRef<any>;

  private http = inject(HttpClient);

  override ngOnInit(): void {
    this.listenScreenResize();
    this.checkMobileMenuItems();
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.navItemsRef.clear();
    this.languageContainerRef.clear();
    this.themeContainerRef.clear();
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
      this.navItemsRef!.createEmbeddedView(this.navItem, el);
    });
  }

  /**
   * Checks if the mobile menu items need to be displayed based on the screen size.
   * @private
   */
  private checkMobileMenuItems() {
    if (!this.isBrowser) return;

    if (window.innerWidth <= 1024 || window.innerHeight <= 489) {
      if (this.navItemsRef.length <= 0) this.createNavItems();
      if (this.languageContainerRef.length === 0) {
        this.languageContainerRef.createComponent(LanguageSwitchComponent);
      }
      if (this.themeContainerRef.length === 0) {
        const ref =
          this.themeContainerRef.createComponent(ThemeSwitchComponent);
        ref.instance.elRef.nativeElement.style.marginLeft = 'auto';
      }
    } else {
      this.navItemsRef.clear();
      this.languageContainerRef.clear();
      this.themeContainerRef.clear();
    }
  }

  /**
   * Downloads the resume in pdf format.
   * @public
   */
  public downloadPdf() {
    const url = 'assets/docs/alex_frei_cv.pdf';
    const filename = 'alex_frei_cv.pdf';

    this.http.get(url, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
