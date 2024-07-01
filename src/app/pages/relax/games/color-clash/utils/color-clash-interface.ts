import { SafeHtml } from '@angular/platform-browser';

/**
 * Represents an item in the Color Clash game.
 */
export interface ColorClashGameItem {
  mode: 'color' | 'meaning';
  modeTranslated: string;
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
