import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { ColorClashManagerService } from '../../services/color-clash-manager.service';

@Component({
  selector: 'af-color-clash-evaluation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, QuicklinkDirective],
  templateUrl: './color-clash-evaluation.component.html',
  styleUrl: './color-clash-evaluation.component.scss',
})
export class ColorClashEvaluationComponent
  extends ExtendedComponent
  implements OnInit
{
  /** Message indicating the evaluation of the performance. */
  public msg = '';
  /** Message indicating the current high score. */
  public highScoreMsg = '';

  private gameManager = inject(ColorClashManagerService);

  override ngOnInit(): void {
    super.ngOnInit();
    this.generateRatingText();

    if (this.isBrowser) this.generateHighScoreMsg();

    this.classList.add('card');
  }

  public get points() {
    return this.gameManager.points;
  }
  public get mistakes() {
    return this.gameManager.mistakes;
  }

  /** Generates the rating text based on points and mistakes. */
  private generateRatingText() {
    if (this.mistakes() > 5) {
      this.msg = $localize`You made a lot of mistakes. Take it slow next time, I\'m sure you can get better!`;
    } else if (this.mistakes() > 0) {
      this.msg = $localize`Not bad, you just made a few mistakes. But can you also do it without any mistakes?`;
    } else {
      this.msg = $localize`Great job, you didn\'t make any mistakes. But can you score more points in that time without making any mistakes?`;
      if (this.points() < 60) {
        this.msg += $localize`&nbspThe goal is to score more than 60 points without any mistakes!`;
      } else {
        this.msg += $localize`&nbspBut wait a minute, you got more than 60 points?!! That's awesome, seems like you're a genius!`;
      }
    }
  }

  /** Generates the high score message. */
  private generateHighScoreMsg() {
    const highScore = JSON.parse(
      localStorage.getItem('color-clash-high-score') ?? '{}',
    );
    if (highScore.points) {
      this.highScoreMsg = $localize`Your current high score is ${highScore.points} points with ${highScore.mistakes} mistakes!`;
    }
  }
}
