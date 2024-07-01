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
