import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { cardFadeInUpScale } from 'src/app/animations/card-animations';
import { GAMES } from 'src/app/configs/games';
import { PageMetaData } from 'src/app/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { GameHeaderComponent } from '../../components/game-header/game-header.component';
import { GAME } from '../../utils/game.token';
import { ColorClashEvaluationComponent } from './components/color-clash-evaluation/color-clash-evaluation.component';
import { ColorClashGameComponent } from './components/color-clash-game/color-clash-game.component';
import { ColorClashInstructionComponent } from './components/color-clash-instruction/color-clash-instruction.component';
import { ColorClashGameState } from './utils/color-clash-interface';
import { ColorClashManagerService } from './utils/color-clash-manager.service';

@Component({
  selector: 'af-color-clash',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GameHeaderComponent,
    ColorClashInstructionComponent,
    ColorClashGameComponent,
    ColorClashEvaluationComponent,
  ],
  providers: [
    ColorClashManagerService,
    {
      provide: GAME,
      useValue: GAMES.find((el) => el.id === 'color-clash')!,
    },
  ],
  animations: [cardFadeInUpScale],
  templateUrl: './color-clash.component.html',
  styleUrls: [
    '../../styles/game-styles.scss',
    '../../styles/quiz-card.scss',
    './color-clash.component.scss',
  ],
})
export class ColorClashComponent extends ExtendedComponent {
  /**
   * The metadata for the page.
   */
  protected override pageMeta: PageMetaData = {
    title: $localize`Color Clash Game`,
    description: $localize`Attempt to keep your mind under control without getting confused.`,
  };

  /**
   * Enum representing the different states of the Color Clash game.
   */
  public GameState = ColorClashGameState;

  private gameManager = inject(ColorClashManagerService);

  ngOnDestroy(): void {
    this.gameManager.destroy();
  }

  public get gameState() {
    return this.gameManager.gameState;
  }
}
