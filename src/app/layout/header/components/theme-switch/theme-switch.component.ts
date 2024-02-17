import {
  Component,
  OnInit,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeManagerService } from 'src/app/services/theme-manager.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-theme-switch',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
})
export class ThemeSwitchComponent extends ExtendedComponent implements OnInit {
  public theme = inject(ThemeManagerService);

}
