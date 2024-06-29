import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { QuizGameState } from '../../utils/quiz-enum';
import { QuizManagerService } from '../../utils/quiz-manager.service';

@Component({
  selector: 'af-quantum-quiz-instruction',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './quantum-quiz-instruction.component.html',
  styleUrls: [
    '../../../../styles/quiz-card.scss',
    '../../../../styles/game-button.scss',
    './quantum-quiz-instruction.component.scss',
  ],
})
export class QuantumQuizInstructionComponent
  extends ExtendedComponent
  implements OnInit
{
  private gameManager = inject(QuizManagerService);

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }

  public next() {
    this.gameManager.gameState.set(QuizGameState.chooseTopic);
  }
}
