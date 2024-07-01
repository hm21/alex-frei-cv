import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { GAMES } from 'src/app/configs/games';
import { PageMetaData } from 'src/app/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { gameScreenAnimation } from '../../animations/game-card.animation';
import { GameHeaderComponent } from '../../components/game-header/game-header.component';
import { GAME } from '../../utils/game.token';
import { QuantumQuizChooseTopicComponent } from './components/quantum-quiz-choose-topic/quantum-quiz-choose-topic.component';
import { QuantumQuizGameComponent } from './components/quantum-quiz-game/quantum-quiz-game.component';
import { QuantumQuizGenerateQuizComponent } from './components/quantum-quiz-generate-quiz/quantum-quiz-generate-quiz.component';
import { QuantumQuizInstructionComponent } from './components/quantum-quiz-instruction/quantum-quiz-instruction.component';
import { QuantumQuizLooseComponent } from './components/quantum-quiz-loose/quantum-quiz-loose.component';
import { QuantumQuizWonComponent } from './components/quantum-quiz-won/quantum-quiz-won.component';
import { QuizManagerService } from './utils/quiz-manager.service';

@Component({
  selector: 'af-quantum-quiz',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,

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
    {
      provide: GAME,
      useValue: GAMES.find((el) => el.id === 'quantum-quiz')!,
    },
  ],
  templateUrl: './quantum-quiz.component.html',
  styleUrls: [
    '../../styles/game-styles.scss',
    '../../styles/game-card.scss',
    '../../styles/game-button.scss',
    './quantum-quiz.component.scss',
  ],
  animations: [gameScreenAnimation],
})
export class QuantumQuizComponent
  extends ExtendedComponent
  implements OnDestroy
{
  /**
   * The metadata for the page.
   */
  protected override pageMeta: PageMetaData = {
    title: $localize`Quantum Quiz Game`,
    description: $localize`Can you emerge victorious on the millionaire show with your AI-generated topic?`,
  };

  /** Angular context for children outlets. */
  private contexts = inject(ChildrenOutletContexts);
  private gameManager = inject(QuizManagerService);

  ngOnDestroy(): void {
    this.gameManager.destroy();
  }

  /**
   * Retrieves animation data for route transitions.
   * @returns Animation data for route transitions.
   */
  public getRouteAnimationData() {
    return this.contexts.getContext('state')?.route?.snapshot?.data.animation;
  }
}
