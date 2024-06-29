import { Injectable, signal } from '@angular/core';
import { GameManager } from '../../../utils/game-manager';
import { ColorClashGameState } from './color-clash-interface';

@Injectable()
export class ColorClashManagerService extends GameManager {
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
}
