import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-quantum-quiz-loose',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  templateUrl: './quantum-quiz-loose.component.html',
  styleUrls: [
    '../../../../styles/quiz-card.scss',
    '../../../../styles/game-button.scss',
    './quantum-quiz-loose.component.scss',
  ],
})
export class QuantumQuizLooseComponent
  extends ExtendedComponent
  implements OnInit
{
  /**
   * Event emitter for playing the game again.
   */
  @Output() playAgain = new EventEmitter();

  /**
   * Input for the amount of cash won.
   */
  @Input({ required: true }) wonCash: string | number = 0;

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }
}
