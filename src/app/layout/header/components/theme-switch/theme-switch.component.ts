import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeManagerService } from 'src/app/services/theme-manager/theme-manager.service';
import { TooltipDirective } from 'src/app/shared/tooltip/tooltip.directive';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-theme-switch',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TooltipDirective],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
})
export class ThemeSwitchComponent extends ExtendedComponent implements OnInit {
  public theme = inject(ThemeManagerService);
}
