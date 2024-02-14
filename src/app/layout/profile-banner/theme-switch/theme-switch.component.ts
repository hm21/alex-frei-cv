import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Renderer2,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { getTheme } from './utils/theme-switch';

@Component({
  selector: 'af-theme-switch',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitchComponent extends ExtendedComponent {
  public isDarkMode = false;

  private renderer = inject(Renderer2);

  constructor(@Inject(DOCUMENT) private document: Document) {
    super();
  }

  override ngOnInit(): void {
    if (this.isBrowser) {
      this.isDarkMode = getTheme() === 'dark';
    }
    super.ngOnInit();
  }

  public toggleTheme() {
    const theme = this.isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    this.renderer.setAttribute(
      this.document.querySelector('html'),
      'data-theme',
      theme
    );
  }
}
