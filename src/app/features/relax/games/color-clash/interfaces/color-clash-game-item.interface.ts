import { SafeHtml } from "@angular/platform-browser";

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
