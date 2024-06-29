import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cardFadeInUpScale } from 'src/app/animations/card-animations';
import { GAMES } from 'src/app/configs/games';
import { PageMetaData } from 'src/app/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { GameHeaderComponent } from '../../components/game-header/game-header.component';
import { GAME } from '../../utils/game.token';
import { QuantumQuizChooseTopicComponent } from './components/quantum-quiz-choose-topic/quantum-quiz-choose-topic.component';
import { QuantumQuizGameComponent } from './components/quantum-quiz-game/quantum-quiz-game.component';
import { QuantumQuizGenerateQuizComponent } from './components/quantum-quiz-generate-quiz/quantum-quiz-generate-quiz.component';
import { QuantumQuizInstructionComponent } from './components/quantum-quiz-instruction/quantum-quiz-instruction.component';
import { QuantumQuizLooseComponent } from './components/quantum-quiz-loose/quantum-quiz-loose.component';
import { QuantumQuizWonComponent } from './components/quantum-quiz-won/quantum-quiz-won.component';
import { QuizGameState } from './utils/quiz-enum';
import { QuizManagerService } from './utils/quiz-manager.service';

@Component({
  selector: 'af-quantum-quiz',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GameHeaderComponent,
    FormsModule,
    QuantumQuizChooseTopicComponent,
    QuantumQuizGenerateQuizComponent,
    QuantumQuizInstructionComponent,
    QuantumQuizGameComponent,
    QuantumQuizLooseComponent,
    QuantumQuizWonComponent,
  ],
  providers: [
    QuizManagerService,
    {
      provide: GAME,
      useValue: GAMES.find((el) => el.id === 'quantum-quiz')!,
    },
  ],
  templateUrl: './quantum-quiz.component.html',
  styleUrls: [
    '../../styles/game-styles.scss',
    '../../styles/quiz-card.scss',
    './quantum-quiz.component.scss',
  ],
  animations: [cardFadeInUpScale],
})
export class QuantumQuizComponent extends ExtendedComponent implements OnDestroy {
  /**
   * The metadata for the page.
   */
  protected override pageMeta: PageMetaData = {
    title: $localize`Quantum Quiz Game`,
    description: $localize`Can you emerge victorious on the millionaire show with your AI-generated topic?`,
  };

  /**
   * The possible game states for the Quantum Quiz.
   */
  public GameState = QuizGameState;

  private gameManager = inject(QuizManagerService);

  ngOnDestroy(): void {
    this.gameManager.destroy();
  }

  public get gameState() {
    return this.gameManager.gameState;
  }
}
