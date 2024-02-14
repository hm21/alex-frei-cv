import { Component } from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { LanguageSwitchComponent } from '../profile-banner/language-switch/language-switch.component';
import { ThemeSwitchComponent } from '../profile-banner/theme-switch/theme-switch.component';

@Component({
  selector: 'af-side-navbar',
  standalone: true,
  imports: [
    ThemeSwitchComponent,
    LanguageSwitchComponent,
  ],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent extends ExtendedComponent {

}
