import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'af-mobile-header',
  imports: [],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHeaderComponent extends ExtendedComponent {
  private headerService = inject(HeaderService);

  /**
   * Toggles the mobile menu.
   */
  public toggleMenu() {
    this.headerService.toggleMenu();
  }

  /**
   * Closes the mobile menu.
   */
  public closeMenu() {
    this.headerService.closeMenu();
  }
}
