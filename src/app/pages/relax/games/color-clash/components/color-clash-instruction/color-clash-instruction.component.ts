import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ColorClashGameState } from '../../utils/color-clash-interface';
import { ColorClashManagerService } from '../../utils/color-clash-manager.service';

@Component({
  selector: 'af-color-clash-instruction',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './color-clash-instruction.component.html',
  styleUrls: [
    '../../../../styles/quiz-card.scss',
    '../../../../styles/game-button.scss',
    './color-clash-instruction.component.scss',
  ],
})
export class ColorClashInstructionComponent
  extends ExtendedComponent
  implements OnInit
{
  private gameManager = inject(ColorClashManagerService);

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }

  public next() {
    this.gameManager.gameState.set(ColorClashGameState.active);
  }
}
