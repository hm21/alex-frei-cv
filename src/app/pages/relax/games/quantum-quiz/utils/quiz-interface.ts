import { QuizGameState } from './quiz-enum';

export interface Quiz {
  question: string;
  answers: string[];
  correctAnswer: number;
}

export interface GameStateChanged {
  state: QuizGameState;
  currentCash: number;
}
