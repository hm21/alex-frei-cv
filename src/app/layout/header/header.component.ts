import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ProfileBannerComponent } from '../profile-banner/profile-banner.component';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { NavMobileMenuToggleBtnComponent } from './components/nav-mobile-menu-toggle-btn/nav-mobile-menu-toggle-btn.component';

@Component({
  selector: 'af-header',
  standalone: true,
  imports: [
    NgClass,

    SideNavbarComponent,
    ProfileBannerComponent,
    NavMobileMenuToggleBtnComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends ExtendedComponent {
  /**
   * Event emitter for closing the side menu.
   */
  @Output() closeSideMenu = new EventEmitter<boolean>();
  /**
   * Event emitter for toggling the profile avatar `hero` animation.
   */
  @Output() toggleHero = new EventEmitter<boolean>();
}
