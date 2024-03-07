import { SafeHtml } from '@angular/platform-browser';

/**
 * Represents the possible states of the Color Clash game.
 */
export enum ColorClashGameState {
  instruction,
  active,
  evaluation,
}

/**
 * Represents an item in the Color Clash game.
 */
export interface ColorClashGameItem {
  mode: 'color' | 'meaning';
  content: SafeHtml;
  item: string;
  color: string;
  loopId: number;
  isCorrect?: boolean;
  id: string;
}

/**
 * Represents a button in the Color Clash game.
 */
export interface ColorClashGameButton {
  content: SafeHtml;
  color: string;
  shortcut: string;
  id: string;
}

/**
 * Represents a random item in the Color Clash game.
 */
export interface ColorClashRandomItem {
  id: string;
  content: string | number;
}

/**
 * Represents the finish event of the Color Clash game.
 */
export interface ColorClashFinishEvent {
  points: number;
  mistakes: number;
}
