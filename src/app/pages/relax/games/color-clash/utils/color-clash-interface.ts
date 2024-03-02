import { SafeHtml } from '@angular/platform-browser';

export enum ColorClashGameState {
  instruction,
  active,
  evaluation,
}

export interface ColorClashGameItem {
  mode: 'color' | 'meaning';
  content: SafeHtml;
  item: string;
  color: string;
  loopId: number;
  isCorrect?: boolean;
  id: string;
}
export interface ColorClashGameButton {
  content: SafeHtml;
  color: string;
  shortcut: string;
  id: string;
}
export interface ColorClashRandomItem {
  id: string;
  content: string | number;
}
export interface ColorClashFinishEvent{
  points:number;
  mistakes:number;
}