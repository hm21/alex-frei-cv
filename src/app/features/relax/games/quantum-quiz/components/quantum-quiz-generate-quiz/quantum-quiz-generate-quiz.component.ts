import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { ProgressSpinnerComponent } from 'src/app/shared/components/progress-spinner/progress-spinner.component';

@Component({
  selector: 'af-quantum-quiz-generate-quiz',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressSpinnerComponent],
  templateUrl: './quantum-quiz-generate-quiz.component.html',
  styleUrls: [
    './quantum-quiz-generate-quiz.component.scss',
    '../../../../styles/game-page-animation.scss',
  ],
  host: {
    class: 'card',
  },
})
export class QuantumQuizGenerateQuizComponent extends ExtendedComponent {}
