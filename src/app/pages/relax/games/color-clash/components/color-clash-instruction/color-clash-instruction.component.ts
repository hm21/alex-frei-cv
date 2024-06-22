import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExtendedComponent } from 'src/app/utils/extended-component';

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
  @Output() next = new EventEmitter();

  override ngOnInit(): void {
    super.ngOnInit();

    this.classList.add('card');
  }
}
