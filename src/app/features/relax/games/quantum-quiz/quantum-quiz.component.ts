import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { GAMES } from 'src/app/core/constants/games.constants';
import { PageMetaData } from 'src/app/core/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { GameHeaderComponent } from '../../components/game-header/game-header.component';
import { GAME } from '../../shared/game.token';
import { QuizManagerService } from './services/quiz-manager.service';

@Component({
  selector: 'af-quantum-quiz',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, GameHeaderComponent, FormsModule],
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

  private gameManager = inject(QuizManagerService);

  ngOnDestroy(): void {
    this.gameManager.destroy();
  }
}
