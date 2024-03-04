import { QuizGameState } from './quiz-enum';

/**
 * Represents a quiz question.
 */
export interface Quiz {
  /**
   * The question text.
   */
  question: string;
  /**
   * The possible answers for the question.
   */
  answers: string[];
  /**
   * The index of the correct answer in the `answers` array.
   */
  correctAnswer: number;
}

/**
 * Represents the state change of a quiz game.
 */
export interface GameStateChanged {
  /**
   * The new state of the quiz game.
   */
  state: QuizGameState;
  /**
   * The current cash amount in the game.
   */
  currentCash: number;
}
