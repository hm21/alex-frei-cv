import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-quantum-quiz-loose',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './quantum-quiz-loose.component.html',
  styleUrls: [
    '../../styles/quiz-card.scss',
    '../../styles/quiz-button.scss',
    './quantum-quiz-loose.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantumQuizLooseComponent
  extends ExtendedComponent
  implements OnInit
{
  @Output() playAgain = new EventEmitter();
  @Input({ required: true }) wonCash: string | number = 0;

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }
}
