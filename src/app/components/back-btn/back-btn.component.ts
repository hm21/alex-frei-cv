import {
  ChangeDetectionStrategy,
  Component,
  HostAttributeToken,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { TooltipDirective } from 'src/app/shared/tooltip/tooltip.directive';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-back-btn',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, QuicklinkDirective, TooltipDirective],
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.scss',
})
export class BackBtnComponent extends ExtendedComponent {
  /**
   * The path to navigate back to.
   * @required
   */
  public path = inject(new HostAttributeToken('path'), { optional: true });
}
