import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-quantum-quiz-generate-quiz',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './quantum-quiz-generate-quiz.component.html',
  styleUrls: [
    '../../../../styles/quiz-card.scss',
    '../../../../styles/game-button.scss',
    './quantum-quiz-generate-quiz.component.scss',
  ],
})
export class QuantumQuizGenerateQuizComponent
  extends ExtendedComponent
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }
}
