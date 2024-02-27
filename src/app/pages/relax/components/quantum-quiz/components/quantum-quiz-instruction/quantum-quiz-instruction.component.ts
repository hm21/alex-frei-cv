import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-quantum-quiz-instruction',
  standalone: true,
  imports: [],
  templateUrl: './quantum-quiz-instruction.component.html',
  styleUrls: [
    '../../styles/quiz-card.scss',
    '../../styles/quiz-button.scss',
    './quantum-quiz-instruction.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantumQuizInstructionComponent
  extends ExtendedComponent
  implements OnInit
{
  @Output() next = new EventEmitter();

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }
}
