import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { LanguageSwitchComponent } from '../header/components/language-switch/language-switch.component';
import { ThemeSwitchComponent } from '../header/components/theme-switch/theme-switch.component';
import { navItems } from '../header/utils/nav-items';
import {
  aboutMeIcon,
  contactIcon,
  portfolioIcon,
  relaxIcon,
  resumeIcon,
} from '../header/utils/raw-icons';

@Component({
  selector: 'af-side-navbar',
  standalone: true,
  imports: [
    ThemeSwitchComponent,
    LanguageSwitchComponent,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    QuicklinkModule,
  ],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavbarComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  @ViewChild('navItemsRef', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('languageContainerRef', { read: ViewContainerRef, static: true })
  languageContainerRef!: ViewContainerRef;
  @ViewChild('themeContainerRef', { read: ViewContainerRef, static: true })
  themeContainerRef!: ViewContainerRef;

  @ViewChild('navItem', { read: TemplateRef, static: true })
  private navItem!: TemplateRef<any>;

  public showNavbar = true;

  private sanitizer = inject(DomSanitizer);

  override ngOnInit(): void {
    this.createNavItems();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.container?.clear();
  }

  private createNavItems() {
    navItems.forEach((el) => {
      switch (el.id) {
        case 'aboutMe':
          el.icon = this.sanitizer.bypassSecurityTrustHtml(aboutMeIcon);
          break;
        case 'resume':
          el.icon = this.sanitizer.bypassSecurityTrustHtml(resumeIcon);
          break;
        case 'portfolio':
          el.icon = this.sanitizer.bypassSecurityTrustHtml(portfolioIcon);
          break;
        case 'contact':
          el.icon = this.sanitizer.bypassSecurityTrustHtml(contactIcon);
          break;
        case 'relax':
          el.icon = this.sanitizer.bypassSecurityTrustHtml(relaxIcon);
          break;
      }

      this.container!.createEmbeddedView(this.navItem, el);
    });
  }
}
