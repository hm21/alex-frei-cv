import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { LanguageSwitchComponent } from '../profile-banner/language-switch/language-switch.component';
import { ThemeSwitchComponent } from '../profile-banner/theme-switch/theme-switch.component';

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
export class SideNavbarComponent extends ExtendedComponent {
  @ViewChild('navItemsRef', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('navItem', { read: TemplateRef, static: true })
  private navItem!: TemplateRef<any>;

  @ViewChild('aboutMeIcon', { read: TemplateRef, static: true })
  private aboutMeIcon!: TemplateRef<any>;
  @ViewChild('resumeIcon', { read: TemplateRef, static: true })
  private resumeIcon!: TemplateRef<any>;
  @ViewChild('portfolioIcon', { read: TemplateRef, static: true })
  private portfolioIcon!: TemplateRef<any>;
  @ViewChild('relaxIcon', { read: TemplateRef, static: true })
  private relaxIcon!: TemplateRef<any>;
  @ViewChild('contactIcon', { read: TemplateRef, static: true })
  private contactIcon!: TemplateRef<any>;

  public navItems: { svg: SafeHtml; name: string }[] = [];

  override ngOnInit(): void {
    this.createNavItems();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.container.clear();
  }

  private createNavItems() {
    this.container.createEmbeddedView(this.navItem, {
      path: '/about-me',
      name: $localize`About me`,
      icon: this.aboutMeIcon,
    });
    this.container.createEmbeddedView(this.navItem, {
      path: '/resume',
      name: $localize`Resume`,
      icon: this.resumeIcon,
    });
    this.container.createEmbeddedView(this.navItem, {
      path: '/portfolio',
      name: $localize`Portfolio`,
      icon: this.portfolioIcon,
    });
    this.container.createEmbeddedView(this.navItem, {
      path: '/relax',
      name: $localize`Relax`,
      icon: this.relaxIcon,
    });
    this.container.createEmbeddedView(this.navItem, {
      path: '/contact',
      name: $localize`Contact`,
      icon: this.contactIcon,
    });
  }
}
