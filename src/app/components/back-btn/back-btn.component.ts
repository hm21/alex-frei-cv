import {
  ChangeDetectionStrategy,
  Component,
  HostAttributeToken,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { TooltipDirective } from 'src/app/shared/tooltip/tooltip.directive';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import svgIcon from 'src/assets/img/icon/back-button.svg';

@Component({
  selector: 'af-back-btn',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, QuicklinkDirective, TooltipDirective, SafePipe],
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.scss',
})
export class BackBtnComponent extends ExtendedComponent {
  /**
   * The back button icon.
   */
  protected readonly icon = svgIcon;

  /**
   * The path to navigate back to.
   */
  protected path = inject(new HostAttributeToken('path'), { optional: true });
}
