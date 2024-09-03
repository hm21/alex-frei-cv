import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
  viewChild
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ThemeSwitchComponent,
    LanguageSwitchComponent,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    QuicklinkDirective,
  ],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss',
})
export class SideNavbarComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
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

  /**
   * Sanitizer for bypassing security.
   */
  private sanitizer = inject(DomSanitizer);

  override ngOnInit(): void {
    this.createNavItems();

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

      this.navItemsRef()!.createEmbeddedView(this.navItem(), el);
    });
  }
}
