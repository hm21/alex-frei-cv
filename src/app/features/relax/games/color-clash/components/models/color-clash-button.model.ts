import { SafeHtml } from '@angular/platform-browser';
import { ColorClashItemId } from '../types/color-clash.types';

/**
 * Represents a button in the Color Clash game.
 */
export class ColorClashGameButton {
  content: SafeHtml;
  color: string;
  shortcut: string;
  id: ColorClashItemId;

  constructor({
    content,
    color,
    buttonIndex,
    id,
  }: {
    content: SafeHtml;
    color: string;
    buttonIndex: number;
    id: ColorClashItemId;
  }) {
    this.id = id;
    this.color = color;
    this.content = content;
    this.shortcut =
      buttonIndex === 0
        ? 'S'
        : buttonIndex === 1
          ? 'D'
          : buttonIndex === 2
            ? 'F'
            : buttonIndex === 3
              ? 'J'
              : buttonIndex === 4
                ? 'K'
                : 'L';
  }
}
