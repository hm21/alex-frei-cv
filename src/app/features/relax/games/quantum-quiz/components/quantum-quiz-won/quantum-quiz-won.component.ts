import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import svgWonIcon from 'src/assets/img/game/quantum-quiz/won.svg';

@Component({
  selector: 'af-quantum-quiz-won',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, QuicklinkDirective, SafePipe],
  templateUrl: './quantum-quiz-won.component.html',
  styleUrls: [
    '../../../../styles/game-button.scss',
    './quantum-quiz-won.component.scss',
  ],
  host: {
    class: 'card',
  },
})
export class QuantumQuizWonComponent extends ExtendedComponent {
  protected readonly wonIcon = svgWonIcon;
}
