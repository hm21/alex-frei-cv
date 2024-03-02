import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  numberAttribute,
} from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ColorClashGameState } from '../../utils/color-clash-interface';

@Component({
  selector: 'af-color-clash-evaluation',
  standalone: true,
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
  @Output() updateGameState = new EventEmitter<ColorClashGameState>();
  public GameState = ColorClashGameState;

  @Input({ required: true, transform: numberAttribute }) points = 0;
  @Input({ required: true, transform: numberAttribute }) mistakes = 0;

  public msg = ``;
  public highScoreMsg = ``;

  override ngOnInit(): void {
    super.ngOnInit();
    this.generateRatingText();

    if (this.isBrowser) this.generateHighScore();

    this.classList.add('card');
  }

  private generateRatingText() {
    if (this.mistakes > 7) {
      this.msg = $localize`You made a lot of mistakes. Take it slow next time, I\'m sure you can get better!`;
    } else if (this.mistakes > 0) {
      this.msg = $localize`Not bad, you just made a few mistakes. But can you also do it without any mistakes?`;
    } else {
      this.msg = $localize`Great job, you didn\'t make any mistakes. But can you score more points in that time without making any mistakes?`;
      if (this.points < 120) {
        this.msg += $localize`&nbspThe goal is to score more than 120 points without any mistakes!`;
      } else {
        this.msg += $localize`&nbspBut wait a minute, you got more than 120 points?!! That's awesome, seems like you're a genius!`;
      }
    }
  }

  private generateHighScore() {
    const highScore = JSON.parse(
      localStorage.getItem('color-clash-high-score') ?? '{}',
    );
    if (highScore.points) {
      this.highScoreMsg = $localize`Your current high score is ${highScore.points} points with ${highScore.mistakes} mistakes!`;
    }
  }
}
