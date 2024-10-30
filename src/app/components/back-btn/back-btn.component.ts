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
  template: `
    <a
      [routerLink]="path"
      i18n-aria-label
      aria-label="Back button"
      afTooltip-title
      afTooltip="Back"
      [innerHTML]="icon | safe"
    ></a>
  `,
  styles: `
    a {
      width: 44px;
      height: 44px;
      display: block;
      padding: 10px;
      border-radius: 100%;

      transition: background-color 150ms ease;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
    :host ::ng-deep {
      svg {
        width: 100%;
        height: 100%;
        fill: var(--text-color-primary);
      }
    }
  `,
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
