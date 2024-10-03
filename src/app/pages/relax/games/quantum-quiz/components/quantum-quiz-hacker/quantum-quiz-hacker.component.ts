import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { ThemeManagerService } from 'src/app/services/theme-manager/theme-manager.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-quantum-quiz-hacker',
  standalone: true,
  imports: [RouterLink, QuicklinkDirective],
  templateUrl: './quantum-quiz-hacker.component.html',
  styleUrl: './quantum-quiz-hacker.component.scss',
})
export class QuantumQuizHackerComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  private wasDarkMode = false;

  private theme = inject(ThemeManagerService);

  override ngOnInit(): void {
    this.classList.add('card');
    if (this.isBrowser) {
      this.wasDarkMode = this.theme.isDarkMode();
      if (!this.wasDarkMode) {
        this.theme.isDarkMode.set(true);
        this.theme.toggleTheme();
      }
    } else {
      this.theme.setDarkMode();
    }
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    if (this.isBrowser && !this.wasDarkMode) {
      this.theme.isDarkMode.set(false);
      this.theme.toggleTheme();
    }
  }
}
