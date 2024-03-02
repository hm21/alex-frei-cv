import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() points = 0;
  @Input() mistakes = 0;

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }

  private generateRatingText() {
    if (this.mistakes > 7) {
      /* TODO: */
    } else if (this.mistakes > 3) {
      /* TODO: */
    } else if (this.mistakes > 0) {
      /* TODO: */
    }
  }
}
