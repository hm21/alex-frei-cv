import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { Quiz } from '../../utils/quiz-interface';

@Component({
  selector: 'af-quantum-quiz-generate-quiz',
  standalone: true,
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
  @Output() generatedQuiz = new EventEmitter<Quiz[]>();

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }
}
