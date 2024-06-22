import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { filter, fromEvent } from 'rxjs';
import { cardFadeInUpScale } from 'src/app/animations/card-animations';
import { GAMES } from 'src/app/configs/games';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { MetaDataI } from 'src/app/utils/meta-generator';
import { GameHeaderComponent } from '../../components/game-header/game-header.component';
import { Game } from '../../utils/game-model';
import { ColorClashEvaluationComponent } from './components/color-clash-evaluation/color-clash-evaluation.component';
import { ColorClashGameComponent } from './components/color-clash-game/color-clash-game.component';
import { ColorClashInstructionComponent } from './components/color-clash-instruction/color-clash-instruction.component';
import {
  ColorClashFinishEvent,
  ColorClashGameState,
} from './utils/color-clash-interface';

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
  protected override pageMeta: MetaDataI = {
    title: $localize`Color Clash Game`,
    description: $localize`Attempt to keep your mind under control without getting confused.`,
  };

  /**
   * Enum representing the different states of the Color Clash game.
   */
  public GameState = ColorClashGameState;

  /**
   * The current state of the game.
   */
  public gameState = signal<ColorClashGameState>(
    ColorClashGameState.instruction,
  );

  /**
   * The number of points earned in the game.
   */
  public points = signal(0);

  /**
   * The number of mistakes made in the game.
   */
  public mistakes = signal(0);

  /**
   * The router instance used for navigation.
   */
  private router = inject(Router);

  /** Informations about the game  */
  public game!: Game;

  override ngOnInit(): void {
    if (this.isBrowser) {
      this.initKeyListener();
    }
    this.game = GAMES.find((el) => el.id === 'color-clash')!;
  }

  /**
   * Initializes the key listener for the Escape key.
   * When the Escape key is pressed, the user is navigated to the 'relax' page.
   */
  private initKeyListener() {
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        filter((event) => event.key === 'Escape'),
        this.destroyPipe(),
      )
      .subscribe(() => {
        this.router.navigate(['relax']);
      });
  }

  /**
   * Event handler for when the game finishes.
   * @param ev The finish event containing the points and mistakes.
   */
  public onFinishGame(ev: ColorClashFinishEvent) {
    this.points.set(ev.points);
    this.mistakes.set(ev.mistakes);
    this.gameState.set(ColorClashGameState.evaluation);
  }
}
