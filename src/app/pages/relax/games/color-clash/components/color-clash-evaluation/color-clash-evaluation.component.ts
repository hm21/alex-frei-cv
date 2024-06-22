import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  numberAttribute,
  signal,
} from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ColorClashGameState } from '../../utils/color-clash-interface';

@Component({
  selector: 'af-color-clash-evaluation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './color-clash-evaluation.component.html',
  styleUrls: [
    '../../../../styles/quiz-card.scss',
    '../../../../styles/game-button.scss',
    './color-clash-evaluation.component.scss',
  ],
})
export class ColorClashEvaluationComponent
  extends ExtendedComponent
  implements OnInit
{
  /** Event emitter for updating the game state. */
  @Output() updateGameState = new EventEmitter<ColorClashGameState>();
  /** Enumeration of Color Clash game states. */
  public GameState = ColorClashGameState;

  /** Number of points achieved in the game. */
  @Input({ required: true, transform: numberAttribute }) points = 0;
  /** Number of mistakes made in the game. */
  @Input({ required: true, transform: numberAttribute }) mistakes = 0;

  /** Message indicating the evaluation of the performance. */
  public msg = signal('');
  /** Message indicating the current high score. */
  public highScoreMsg = signal('');

  override ngOnInit(): void {
    super.ngOnInit();
    this.generateRatingText();

    if (this.isBrowser) this.generateHighScore();

    this.classList.add('card');
  }

  /** Generates the rating text based on points and mistakes. */
  private generateRatingText() {
    if (this.mistakes > 5) {
      this.msg.set(
        $localize`You made a lot of mistakes. Take it slow next time, I\'m sure you can get better!`,
      );
    } else if (this.mistakes > 0) {
      this.msg.set(
        $localize`Not bad, you just made a few mistakes. But can you also do it without any mistakes?`,
      );
    } else {
      this.msg.set(
        $localize`Great job, you didn\'t make any mistakes. But can you score more points in that time without making any mistakes?`,
      );
      if (this.points < 60) {
        this.msg.update(
          (msg) =>
            msg +
            $localize`&nbspThe goal is to score more than 60 points without any mistakes!`,
        );
      } else {
        this.msg.update(
          (msg) =>
            msg +
            $localize`&nbspBut wait a minute, you got more than 60 points?!! That's awesome, seems like you're a genius!`,
        );
      }
    }
  }

  /** Generates the high score message. */
  private generateHighScore() {
    const highScore = JSON.parse(
      localStorage.getItem('color-clash-high-score') ?? '{}',
    );
    if (highScore.points) {
      this.highScoreMsg.set(
        $localize`Your current high score is ${highScore.points} points with ${highScore.mistakes} mistakes!`,
      );
    }
  }
}
