import { Component, signal } from '@angular/core';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { MetaDataI } from 'src/app/utils/meta-generator';
import { ColorClashGameComponent } from './components/color-clash-game/color-clash-game.component';
import { ColorClashInstructionComponent } from './components/color-clash-instruction/color-clash-instruction.component';
import { ColorClashGameState } from './utils/color-clash-interface';

@Component({
  selector: 'af-color-clash',
  standalone: true,
  imports: [
    BackBtnComponent,
    ColorClashInstructionComponent,
    ColorClashGameComponent,
  ],
  templateUrl: './color-clash.component.html',
  styleUrls: [
    '../../styles/game-styles.scss',
    '../../styles/quiz-card.scss',
    './color-clash.component.scss',
  ],
})
export class ColorClashComponent extends ExtendedComponent {
  protected override pageMeta: MetaDataI = {
    title: $localize`Color Clash Game`,
    description: $localize` Attempt to keep your mind under control without getting confused.`,
  };
  public GameState = ColorClashGameState;
  public gameState = signal<ColorClashGameState>(
    ColorClashGameState.active,
  );
}
