import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxImageHeroModule } from 'ngx-image-hero';
import { QuicklinkModule } from 'ngx-quicklink';
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
    QuicklinkModule,
    NgxImageHeroModule,
  ],
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.scss',
})
export class ProfileBannerComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  @Output() closeSideMenu = new EventEmitter<boolean>();
  @Output() toggleHero = new EventEmitter<boolean>();

  @ViewChild('navItemsRef', { read: ViewContainerRef, static: true })
  navItemsRef!: ViewContainerRef;
  @ViewChild('languageContainerRef', { read: ViewContainerRef, static: true })
  languageContainerRef!: ViewContainerRef;
  @ViewChild('themeContainerRef', { read: ViewContainerRef, static: true })
  themeContainerRef!: ViewContainerRef;

  @ViewChild('navItem', { read: TemplateRef, static: true })
  navItem!: TemplateRef<any>;

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

  private listenScreenResize() {
    if (!this.isBrowser) return;
    fromEvent(window, 'resize')
      .pipe(this.destroyPipe(), debounceTime(50))
      .subscribe(() => {
        this.checkMobileMenuItems();
      });
  }

  private createNavItems() {
    navItems.forEach((el) => {
      this.navItemsRef!.createEmbeddedView(this.navItem, el);
    });
  }

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
}
