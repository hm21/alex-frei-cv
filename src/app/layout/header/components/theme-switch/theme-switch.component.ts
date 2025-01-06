import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeManagerService } from 'src/app/core/services/theme-manager/theme-manager.service';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { TooltipDirective } from 'src/app/ui/tooltip/directives/tooltip.directive';

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
