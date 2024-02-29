import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-quantum-quiz-won',
  standalone: true,
  imports: [],
  templateUrl: './quantum-quiz-won.component.html',
  styleUrls: [
    '../../../../styles/quiz-card.scss',
    '../../../../styles/game-button.scss',
    './quantum-quiz-won.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantumQuizWonComponent
  extends ExtendedComponent
  implements OnInit
{
  @Output() playAgain = new EventEmitter();

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }
}
