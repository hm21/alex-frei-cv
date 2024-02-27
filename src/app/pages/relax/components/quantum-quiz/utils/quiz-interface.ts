import { GameState } from './quiz-enum';

export interface Quiz {
  question: string;
  answers: string[];
  correctAnswer: number;
}

export interface GameStateChanged {
  state: GameState;
  currentCash: number;
}
