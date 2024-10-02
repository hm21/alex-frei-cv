import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ProfileBannerComponent } from '../profile-banner/profile-banner.component';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { NavMobileMenuToggleBtnComponent } from './components/nav-mobile-menu-toggle-btn/nav-mobile-menu-toggle-btn.component';

@Component({
  selector: 'af-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SideNavbarComponent,
    ProfileBannerComponent,
    NavMobileMenuToggleBtnComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends ExtendedComponent {
  private header = viewChild<ElementRef<HTMLElement>>('header');
  public toggleBtn = viewChild(NavMobileMenuToggleBtnComponent);

  /** Flag to control the visibility of the mobile menu. */
  public showMobileMenu = signal(false);

  public toggleMenu() {
    this.showMobileMenu.update((value) => !value);

    if (this.showMobileMenu()) {
      this.header()?.nativeElement.classList.add('show');
      this.toggleBtn()!.open.set(true);
    } else {
      this.header()?.nativeElement.classList.remove('show');
      this.toggleBtn()!.open.set(false);
    }
  }
}
